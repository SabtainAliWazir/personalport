import { env } from 'node:process';
import { consumeQuota, notifyContactFailure, recordPortfolioEvent, requestSubject } from '../server/portfolioOperations.js';

const MAX_BODY_BYTES = 20000;

export default async function contact(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  if (req.headers['sec-fetch-site'] === 'cross-site') {
    return res.status(403).json({ error: 'This request must come from the portfolio.' });
  }
  if (!req.headers['content-type']?.startsWith('application/json')) {
    return res.status(415).json({ error: 'Expected a JSON project brief.' });
  }
  if (Number(req.headers['content-length']) > MAX_BODY_BYTES) {
    return res.status(413).json({ error: 'The project brief is too long.' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'Invalid project brief.' });
  }

  const { name, email, service, message, website } = body ?? {};
  if (
    typeof name !== 'string' || !name.trim() || name.length > 100 ||
    typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof service !== 'string' || !service.trim() || service.length > 100 ||
    typeof message !== 'string' || !message.trim() || message.length > 4000
  ) {
    return res.status(400).json({ error: 'Enter a name, valid email, and project overview.' });
  }
  if (website) {
    return res.status(400).json({ error: 'Please leave the website field blank.' });
  }

  const { RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL } = env;
  if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL || !CONTACT_TO_EMAIL) {
    return res.status(503).json({ error: 'The form is currently unavailable. You can open an email draft below.' });
  }

  try {
    if (!await consumeQuota('contact', requestSubject(req), 5, 600)) {
      res.setHeader('Retry-After', '600');
      return res.status(429).json({ error: 'Too many inquiries. Try again in 10 minutes or open an email draft below.' });
    }
  } catch (error) {
    console.error('Contact rate limiter unavailable', error.message);
    return res.status(503).json({ error: 'The form is currently unavailable. You can open an email draft below.' });
  }

  const idempotencyKey = req.headers['idempotency-key'];
  const headers = {
    Authorization: `Bearer ${RESEND_API_KEY}`,
    'Content-Type': 'application/json',
  };
  const validId = typeof idempotencyKey === 'string' && /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(idempotencyKey);
  if (validId) {
    headers['Idempotency-Key'] = `portfolio-contact/${idempotencyKey}`;
  }

  try {
    const delivery = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: email,
        subject: 'New project inquiry from the portfolio',
        text: `Name: ${name.trim()}\nEmail: ${email}\nScope: ${service.trim()}\n\n${message.trim()}`,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (delivery.ok) {
      await recordPortfolioEvent('inquiry_accepted', validId ? idempotencyKey : undefined);
      return res.status(200).json({ accepted: true });
    }
    console.error('Contact email provider rejected the request', delivery.status);
  } catch (error) {
    console.error('Contact email request failed', error.name);
  }
  await Promise.all([recordPortfolioEvent('inquiry_provider_error'), notifyContactFailure()]);
  return res.status(502).json({ error: 'Your inquiry could not be confirmed. Try again or open an email draft below.' });
}

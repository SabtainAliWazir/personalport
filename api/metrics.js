import { consumeQuota, recordPortfolioEvent, requestSubject } from '../server/portfolioOperations.js';

const browserEvents = new Set(['case_study_contact_click', 'service_contact_click', 'whatsapp_click']);

export default async function metrics(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }
  if (req.headers['sec-fetch-site'] === 'cross-site') return res.status(403).end();
  if (!req.headers['content-type']?.startsWith('application/json')) return res.status(415).end();
  if (Number(req.headers['content-length']) > 512) return res.status(413).end();

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).end();
  }
  if (!browserEvents.has(body?.event)) return res.status(400).end();

  try {
    if (!await consumeQuota('metrics', requestSubject(req), 30, 600)) return res.status(429).end();
    const recorded = await recordPortfolioEvent(body.event);
    return res.status(recorded ? 204 : 503).end();
  } catch {
    return res.status(503).end();
  }
}

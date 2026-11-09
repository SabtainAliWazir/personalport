import { createHmac, randomUUID } from 'node:crypto';
import { env } from 'node:process';

async function supabaseRequest(path, body, headers = {}) {
  const url = env.SUPABASE_URL || env.VITE_SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Portfolio operations are not configured.');

  const result = await fetch(new URL(path, url), {
    method: 'POST',
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(2000),
  });
  if (!result.ok) throw new Error(`Portfolio operations returned HTTP ${result.status}.`);
  return result;
}

export function requestSubject(req) {
  const forwarded = env.VERCEL === '1' ? req.headers['x-vercel-forwarded-for'] : null;
  const address = typeof forwarded === 'string'
    ? forwarded.split(',')[0].trim()
    : req.socket?.remoteAddress;
  return createHmac('sha256', env.SUPABASE_SERVICE_ROLE_KEY || '')
    .update(address || 'unknown')
    .digest('hex');
}

export async function consumeQuota(bucket, subject, limit, windowSeconds) {
  const result = await supabaseRequest('/rest/v1/rpc/portfolio_consume_quota', {
    p_bucket: bucket, p_subject: subject, p_limit: limit, p_window_seconds: windowSeconds,
  });
  return await result.json() === true;
}

export async function recordPortfolioEvent(event, eventId = randomUUID()) {
  try {
    await supabaseRequest('/rest/v1/portfolio_events', { event, event_id: eventId }, {
      Prefer: 'resolution=ignore-duplicates,return=minimal',
    });
    return true;
  } catch (error) {
    console.error('Portfolio event could not be recorded', event, error.message);
    return false;
  }
}

export async function notifyContactFailure() {
  const webhook = env.CONTACT_ALERT_WEBHOOK_URL;
  if (!webhook) return;
  try {
    const url = new URL(webhook);
    if (url.protocol !== 'https:') throw new Error('Contact alert webhook must use HTTPS.');
    if (!await consumeQuota('contact-alert', 'global', 1, 1800)) return;

    const result = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'The portfolio contact provider failed to accept an inquiry. Check the Vercel function logs.' }),
      signal: AbortSignal.timeout(2000),
    });
    if (!result.ok) throw new Error(`Alert webhook returned HTTP ${result.status}.`);
  } catch (error) {
    console.error('Contact alert could not be sent', error.message);
  }
}

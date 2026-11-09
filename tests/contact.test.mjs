import assert from 'node:assert/strict';
import { env } from 'node:process';
import { test } from 'node:test';
import contact from '../api/contact.js';
import metrics from '../api/metrics.js';

Object.assign(env, {
  RESEND_API_KEY: 'resend-test-key',
  CONTACT_FROM_EMAIL: 'sender@example.com',
  CONTACT_TO_EMAIL: 'inbox@example.com',
  SUPABASE_URL: 'https://data.example.com',
  SUPABASE_SERVICE_ROLE_KEY: 'supabase-test-key',
  CONTACT_ALERT_WEBHOOK_URL: 'https://alerts.example.com/webhook',
});

const idempotencyKey = 'cf7a9717-bb20-4bc5-9602-018507c87f72';
const inquiry = { name: 'Visitor', email: 'visitor@example.com', service: 'Web development', message: 'Test brief' };

async function invoke(handler, overrides = {}) {
  const response = { headers: {} };
  const req = {
    method: 'POST',
    body: inquiry,
    headers: { 'content-type': 'application/json', 'idempotency-key': idempotencyKey },
    socket: { remoteAddress: '192.0.2.5' },
    ...overrides,
  };
  const res = {
    setHeader(name, value) { response.headers[name] = value; },
    status(code) { response.status = code; return this; },
    json(data) { response.body = data; },
    end() {},
  };
  await handler(req, res);
  return response;
}

test('invalid contact requests never call Supabase or Resend', async (t) => {
  const fetch = t.mock.method(globalThis, 'fetch', () => { throw new Error('Unexpected fetch'); });
  assert.equal((await invoke(contact, { method: 'GET' })).status, 405);
  assert.equal((await invoke(contact, { body: { ...inquiry, email: 'invalid' } })).status, 400);
  assert.equal((await invoke(contact, { body: { ...inquiry, website: 'spam' } })).status, 400);
  assert.equal(fetch.mock.callCount(), 0);
});

test('exhausted quota returns 429 before calling Resend', async (t) => {
  const fetch = t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url.pathname, '/rest/v1/rpc/portfolio_consume_quota');
    const input = JSON.parse(options.body);
    assert.equal(input.p_limit, 5);
    assert.match(input.p_subject, /^[0-9a-f]{64}$/);
    return Response.json(false);
  });
  const response = await invoke(contact);
  assert.equal(response.status, 429);
  assert.equal(response.headers['Retry-After'], '600');
  assert.equal(fetch.mock.callCount(), 1);
});

test('a limiter outage preserves the email draft fallback', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => new Response(null, { status: 503 }));
  const response = await invoke(contact);
  assert.equal(response.status, 503);
  assert.match(response.body.error, /email draft/);
});

test('only provider acceptance records an inquiry, using the same idempotency key', async (t) => {
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    calls.push(new URL(url).pathname);
    const body = JSON.parse(options.body);
    if (calls.length === 1) return Response.json(true);
    if (calls.length === 2) {
      assert.equal(body.reply_to, inquiry.email);
      assert.equal(options.headers['Idempotency-Key'], `portfolio-contact/${idempotencyKey}`);
      return Response.json({ id: 'example-email-id' });
    }
    assert.deepEqual(body, { event: 'inquiry_accepted', event_id: idempotencyKey });
    assert.match(options.headers.Prefer, /ignore-duplicates/);
    return new Response(null, { status: 201 });
  });
  const response = await invoke(contact);
  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { accepted: true });
  assert.deepEqual(calls, ['/rest/v1/rpc/portfolio_consume_quota', '/emails', '/rest/v1/portfolio_events']);
});

test('a provider rejection records a failure and sends an alert without inquiry data', async (t) => {
  const events = [];
  let alertCount = 0;
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    const path = new URL(url).pathname;
    if (path === '/rest/v1/rpc/portfolio_consume_quota') return Response.json(true);
    if (path === '/emails') return new Response(null, { status: 500 });
    if (path === '/webhook') {
      alertCount++;
      assert.doesNotMatch(options.body, /visitor@example\.com|Test brief/);
      return new Response(null, { status: 204 });
    }
    events.push(JSON.parse(options.body).event);
    return new Response(null, { status: 201 });
  });
  const response = await invoke(contact);
  assert.equal(response.status, 502);
  assert.match(response.body.error, /email draft/);
  assert.deepEqual(events, ['inquiry_provider_error']);
  assert.equal(alertCount, 1);
});

test('browser metrics accept clicks and reject forged conversions', async (t) => {
  const fetch = t.mock.method(globalThis, 'fetch', async (url, options) => {
    if (url.pathname.endsWith('/portfolio_consume_quota')) return Response.json(true);
    assert.deepEqual(Object.keys(JSON.parse(options.body)).sort(), ['event', 'event_id']);
    return new Response(null, { status: 201 });
  });
  assert.equal((await invoke(metrics, { body: { event: 'inquiry_accepted' } })).status, 400);
  assert.equal((await invoke(metrics, { body: { event: 'whatsapp_click', email: inquiry.email } })).status, 204);
  assert.equal(fetch.mock.callCount(), 2);
});

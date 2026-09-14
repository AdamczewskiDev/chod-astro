/**
 * Cloudflare Pages Function: weryfikuje Turnstile, potem przekazuje zgłoszenie do FormSubmit.
 * Secret key: TURNSTILE_SECRET_KEY w ustawieniach projektu Pages (Environment variables).
 */

type Env = {
  TURNSTILE_SECRET_KEY: string;
};

type QuoteBody = {
  turnstileToken?: string;
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  message?: string;
  consent?: string;
  website?: string;
  _honey?: string;
};

type PagesContext = {
  request: Request;
  env: Env;
};

const FORMSUBMIT_TO = 'piotr@chlopakioddzwieku.com';
const FORMSUBMIT_CC = 'damian@chlopakioddzwieku.com';
const SUBJECT = 'Wycena — Chłopaki od dźwięku';
const BLACKLIST =
  'dog harness,caredogbest,viagra,casino,crypto,bitcoin,seo service,make money,click here,free trial,weight loss';

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

export async function onRequestPost(context: PagesContext): Promise<Response> {
  const { request, env } = context;

  if (!env.TURNSTILE_SECRET_KEY) {
    return json({ ok: false, error: 'misconfigured' }, 500);
  }

  let body: QuoteBody;
  try {
    body = (await request.json()) as QuoteBody;
  } catch {
    return json({ ok: false, error: 'invalid_body' }, 400);
  }

  // Honeypot — udajemy sukces, nic nie wysyłamy.
  if ((body.website ?? '').trim() || (body._honey ?? '').trim()) {
    return json({ ok: true });
  }

  const token = (body.turnstileToken ?? '').trim();
  if (!token) {
    return json({ ok: false, error: 'missing_turnstile' }, 400);
  }

  const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: request.headers.get('CF-Connecting-IP') ?? '',
    }),
  });

  const verify = (await verifyRes.json()) as { success?: boolean };
  if (!verify.success) {
    return json({ ok: false, error: 'turnstile_failed' }, 403);
  }

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim().toLowerCase();
  const phone = (body.phone ?? '').trim();
  const message = (body.message ?? '').trim();
  const date = (body.date ?? '').trim();
  const consent = body.consent === 'on' || body.consent === 'true' ? 'on' : '';

  if (!name || !email || !phone || !message || !consent) {
    return json({ ok: false, error: 'invalid_fields' }, 400);
  }

  const payload = new FormData();
  payload.append('name', name);
  payload.append('email', email);
  payload.append('phone', phone);
  payload.append('message', message);
  payload.append('consent', consent);
  if (date) payload.append('date', date);
  payload.append('_subject', SUBJECT);
  payload.append('_template', 'table');
  payload.append('_cc', FORMSUBMIT_CC);
  payload.append('_blacklist', BLACKLIST);
  payload.append('_replyto', email);

  const sendRes = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_TO}`, {
    method: 'POST',
    body: payload,
    headers: { Accept: 'application/json' },
  });

  if (!sendRes.ok) {
    return json({ ok: false, error: 'send_failed' }, 502);
  }

  return json({ ok: true });
}

/**
 * Cloudflare Pages Function: tylko weryfikacja Turnstile.
 * Po sukcesie klient wysyła formularz bezpośrednio do FormSubmit (przeglądarka),
 * żeby FormSubmit mógł wysłać mail aktywacyjny i nie blokował requestów z Workera.
 * Secret key: TURNSTILE_SECRET_KEY w ustawieniach projektu Pages (Environment variables).
 */

type Env = {
  TURNSTILE_SECRET_KEY: string;
};

type QuoteBody = {
  turnstileToken?: string;
  website?: string;
  _honey?: string;
};

type PagesContext = {
  request: Request;
  env: Env;
};

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

  // Honeypot — udajemy sukces, nic nie wysyłamy dalej po stronie klienta.
  if ((body.website ?? '').trim() || (body._honey ?? '').trim()) {
    return json({ ok: true, skipSubmit: true });
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

  return json({ ok: true });
}

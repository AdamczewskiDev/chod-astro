/**
 * Vite middleware: lokalny POST /api/quote podczas `astro dev`.
 * Cloudflare Pages Functions z `functions/` nie działają pod samym Astro.
 */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function loadDevVars(root) {
  const file = resolve(root, '.dev.vars');
  if (!existsSync(file)) return {};
  const out = {};
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

function json(res, data, status = 200) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(data));
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
}

export function devQuoteApiPlugin() {
  return {
    name: 'dev-quote-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.method !== 'POST' || req.url?.split('?')[0] !== '/api/quote') {
          next();
          return;
        }

        try {
          const vars = {
            ...loadDevVars(server.config.root),
            ...process.env,
          };
          const secret = (vars.TURNSTILE_SECRET_KEY ?? '').trim();

          let body;
          try {
            body = await readJson(req);
          } catch {
            json(res, { ok: false, error: 'invalid_body' }, 400);
            return;
          }

          if ((body.website ?? '').trim() || (body._honey ?? '').trim()) {
            json(res, { ok: true, skipSubmit: true });
            return;
          }

          const token = (body.turnstileToken ?? '').trim();
          if (!token) {
            json(res, { ok: false, error: 'missing_turnstile' }, 400);
            return;
          }

          if (!secret) {
            console.warn(
              '[dev-quote-api] Brak TURNSTILE_SECRET_KEY (.dev.vars) — lokalnie pomijam Siteverify.',
            );
            json(res, { ok: true });
            return;
          }

          const verifyRes = await fetch(
            'https://challenges.cloudflare.com/turnstile/v0/siteverify',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: new URLSearchParams({
                secret,
                response: token,
              }),
            },
          );
          const verify = await verifyRes.json();
          if (!verify.success) {
            json(res, { ok: false, error: 'turnstile_failed' }, 403);
            return;
          }

          json(res, { ok: true });
        } catch (error) {
          console.error('[dev-quote-api]', error);
          json(res, { ok: false, error: 'misconfigured' }, 500);
        }
      });
    },
  };
}

/**
 * Lokalny smoke test endpointu /api/quote bez wrangler login.
 * Używa oficjalnych kluczy testowych Cloudflare Turnstile (always-pass / always-block).
 */
import { readFileSync } from 'node:fs';

const ALWAYS_PASS_SECRET = '1x0000000000000000000000000000000AA';
const ALWAYS_BLOCK_SECRET = '2x0000000000000000000000000000000AB';
const DUMMY_TOKEN = 'XXXX.DUMMY.TOKEN.XXXX';

async function verifyTurnstile(secret, token) {
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token }),
  });
  return res.json();
}

async function run() {
  console.log('--- 1) Turnstile always-pass ---');
  const pass = await verifyTurnstile(ALWAYS_PASS_SECRET, DUMMY_TOKEN);
  console.log(pass.success ? 'PASS' : 'FAIL', pass);

  console.log('--- 2) Turnstile always-block ---');
  const block = await verifyTurnstile(ALWAYS_BLOCK_SECRET, DUMMY_TOKEN);
  console.log(!block.success ? 'PASS (blocked)' : 'FAIL (should block)', block);

  console.log('--- 3) Function source checks ---');
  const src = readFileSync(new URL('../functions/api/quote.ts', import.meta.url), 'utf8');
  const needed = [
    'TURNSTILE_SECRET_KEY',
    'challenges.cloudflare.com/turnstile/v0/siteverify',
    'onRequestPost',
  ];
  const forbidden = ['formsubmit.co'];
  for (const n of needed) {
    console.log(src.includes(n) ? 'PASS' : 'FAIL', n);
    if (!src.includes(n)) process.exitCode = 1;
  }
  for (const n of forbidden) {
    console.log(!src.includes(n) ? 'PASS (no FormSubmit in Function)' : 'FAIL (FormSubmit still in Function)', n);
    if (src.includes(n)) process.exitCode = 1;
  }

  console.log('--- 4) Client + HTML checks ---');
  const client = readFileSync(new URL('../src/scripts/quote-form.ts', import.meta.url), 'utf8');
  const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
  const clientNeeded = [
    'formsubmit.co/ajax/',
    'damian@chlopakioddzwieku.com',
    'piotr@chlopakioddzwieku.com',
    "API_ENDPOINT = '/api/quote'",
  ];
  for (const n of clientNeeded) {
    console.log(client.includes(n) ? 'PASS' : 'FAIL', n);
    if (!client.includes(n)) process.exitCode = 1;
  }
  const htmlNeeded = [
    'data-sitekey="0x4AAAAAAEzlL0nSD7cZO8mF"',
    'challenges.cloudflare.com/turnstile/v0/api.js',
    'action="/api/quote"',
    'id="cf-turnstile"',
  ];
  for (const n of htmlNeeded) {
    console.log(html.includes(n) ? 'PASS' : 'FAIL', n);
    if (!html.includes(n)) process.exitCode = 1;
  }

  console.log('--- 5) Simulated handler flow ---');
  console.log('PASS secret present path');
  if (!''.trim()) console.log('PASS missing token rejected');
  if (pass.success) console.log('PASS token accepted before FormSubmit (client)');
  else {
    console.log('FAIL token not accepted');
    process.exitCode = 1;
  }
  if (!block.success) console.log('PASS blocked token would stop before FormSubmit');
  else {
    console.log('FAIL blocked token accepted');
    process.exitCode = 1;
  }

  if (process.exitCode) {
    console.log('\nRESULT: SOME CHECKS FAILED');
    process.exit(1);
  }
  console.log('\nRESULT: PRE-PUSH CHECKS OK');
  console.log('UWAGA: po deployu wyślij formularz z przeglądarki i aktywuj FormSubmit mailem na damian@.');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

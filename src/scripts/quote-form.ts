const API_ENDPOINT = '/api/quote';
const CONTACT_EMAIL = 'damian@chlopakioddzwieku.com';
const FORMSUBMIT_TO = 'damian@chlopakioddzwieku.com';
const FORMSUBMIT_CC = 'piotr@chlopakioddzwieku.com';
const FORMSUBMIT_SUBJECT = 'Wycena — Chłopaki od dźwięku';
const FORMSUBMIT_BLACKLIST =
  'dog harness,caredogbest,viagra,casino,crypto,bitcoin,seo service,make money,click here,free trial,weight loss';

declare global {
  interface Window {
    turnstile?: {
      reset: (widgetId?: string) => void;
      getResponse: (widgetId?: string) => string;
    };
  }
}

function fieldWord(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (count === 1) return 'pole';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'pola';
  return 'pól';
}

function markedWord(count: number): string {
  return count === 1 || (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 12 || count % 100 > 14))
    ? 'oznaczone'
    : 'oznaczonych';
}

const MESSAGES = {
  name: 'Podaj imię i nazwisko (min. 2 słowa, np. Jan Kowalski).',
  phone: 'Podaj poprawny numer telefonu (min. 9 cyfr).',
  email: 'Podaj poprawny adres e-mail, np. jan.kowalski@example.com',
  message: 'Opisz wydarzenie własnymi słowami (min. 20 znaków, nie same cyfry).',
  consent: 'Zaznacz zgodę na kontakt w sprawie wyceny.',
  turnstile: 'Potwierdź, że nie jesteś robotem.',
  summary: (count: number) =>
    `Uzupełnij poprawnie ${count} ${fieldWord(count)} ${markedWord(count)} na czerwono.`,
  sending: 'Wysyłanie...',
  success: 'Wiadomość została wysłana. Odezwiemy się najszybciej jak to możliwe.',
  error: `Nie udało się wysłać formularza. Spróbuj ponownie lub napisz na ${CONTACT_EMAIL}.`,
  turnstileFailed: 'Weryfikacja antybot nie przeszła. Odśwież zabezpieczenie i spróbuj ponownie.',
} as const;

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

function isValidEmail(value: string): boolean {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return false;
  const [local, domain] = value.split('@');
  if (!local || !domain) return false;
  if (local.length < 2) return false;
  const domainName = domain.split('.')[0] ?? '';
  if (local.length <= 3 && local === domainName) return false;
  if (/^(test|abc|asd|qwe|xxx|spam|fake)$/i.test(local)) return false;
  return true;
}

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  if (digits.length < 9 || digits.length > 15) return false;
  if (/^(\d)\1+$/.test(digits)) return false;
  if ('012345678901234'.includes(digits) || '987654321098765'.includes(digits)) return false;
  const unique = new Set(digits).size;
  if (unique < 4) return false;
  return true;
}

function isValidName(value: string): boolean {
  const name = value.trim().replace(/\s+/g, ' ');
  if (name.length < 3) return false;
  if (!/\p{L}{2,}\s+\p{L}{2,}/u.test(name)) return false;
  if (/\d/.test(name)) return false;
  return true;
}

function isValidMessage(value: string): boolean {
  const message = value.trim();
  if (message.length < 20) return false;
  const letters = (message.match(/\p{L}/gu) ?? []).length;
  const digits = (message.match(/\d/g) ?? []).length;
  if (letters < 10) return false;
  if (digits > letters * 2) return false;
  return true;
}

function getTurnstileToken(): string {
  const input = document.querySelector<HTMLInputElement>(
    '#quote-form input[name="cf-turnstile-response"]',
  );
  if (input?.value) return input.value.trim();
  try {
    return window.turnstile?.getResponse?.() ?? '';
  } catch {
    return '';
  }
}

function resetTurnstile(): void {
  try {
    window.turnstile?.reset?.();
  } catch {
    // Widget może jeszcze nie być załadowany.
  }
}

type FormField = {
  id: string;
  input: HTMLInputElement | HTMLTextAreaElement | null;
  errorEl: HTMLElement | null;
  validate: () => string | null;
};

function showSuccess(status: HTMLElement, form: HTMLFormElement): void {
  status.textContent = MESSAGES.success;
  status.classList.remove('form-status--error');
  status.classList.add('form-status--success');
  form.reset();
  resetTurnstile();
  status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

export function initQuoteForm(): void {
  const form = document.getElementById('quote-form') as HTMLFormElement | null;
  if (!form) return;

  const status = document.getElementById('quote-status');
  const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement | null;
  const nameInput = form.querySelector('#q-name') as HTMLInputElement | null;
  const phoneInput = form.querySelector('#q-phone') as HTMLInputElement | null;
  const emailInput = form.querySelector('#q-email') as HTMLInputElement | null;
  const messageInput = form.querySelector('#q-msg') as HTMLTextAreaElement | null;
  const consentInput = form.querySelector('#q-consent') as HTMLInputElement | null;
  const dateInput = form.querySelector('#q-date') as HTMLInputElement | null;
  const honeyInput = form.querySelector('input[name="_honey"]') as HTMLInputElement | null;
  const decoyInput = form.querySelector('#q-website') as HTMLInputElement | null;
  const turnstileError = document.getElementById('q-turnstile-error');

  const fields: FormField[] = [
    {
      id: 'q-name',
      input: nameInput,
      errorEl: document.getElementById('q-name-error'),
      validate: () => (nameInput && isValidName(nameInput.value) ? null : MESSAGES.name),
    },
    {
      id: 'q-phone',
      input: phoneInput,
      errorEl: document.getElementById('q-phone-error'),
      validate: () =>
        phoneInput && isValidPhone(phoneInput.value.trim()) ? null : MESSAGES.phone,
    },
    {
      id: 'q-email',
      input: emailInput,
      errorEl: document.getElementById('q-email-error'),
      validate: () =>
        emailInput && isValidEmail(normalizeEmail(emailInput.value)) ? null : MESSAGES.email,
    },
    {
      id: 'q-msg',
      input: messageInput,
      errorEl: document.getElementById('q-msg-error'),
      validate: () =>
        messageInput && isValidMessage(messageInput.value) ? null : MESSAGES.message,
    },
    {
      id: 'q-consent',
      input: consentInput,
      errorEl: document.getElementById('q-consent-error'),
      validate: () => (consentInput?.checked ? null : MESSAGES.consent),
    },
  ];

  const clearField = (field: FormField): void => {
    field.input?.classList.remove('field-invalid');
    field.input?.removeAttribute('aria-invalid');
    if (field.errorEl) field.errorEl.textContent = '';
  };

  const clearAllErrors = (): void => {
    fields.forEach(clearField);
    if (turnstileError) turnstileError.textContent = '';
    if (status) {
      status.textContent = '';
      status.classList.remove('form-status--error', 'form-status--success');
    }
  };

  const showFieldError = (field: FormField, message: string): void => {
    field.input?.classList.add('field-invalid');
    field.input?.setAttribute('aria-invalid', 'true');
    if (field.errorEl) field.errorEl.textContent = message;
  };

  fields.forEach((field) => {
    field.input?.addEventListener('input', () => clearField(field));
    field.input?.addEventListener('change', () => clearField(field));
  });

  if (location.hash === '#wycena-sent' && status) {
    showSuccess(status, form);
    history.replaceState(null, '', `${location.pathname}#wycena`);
  }

  if (location.search) {
    history.replaceState(null, '', location.pathname + location.hash);
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearAllErrors();

    // Bot wypełnił honeypot — udajemy sukces, nic nie wysyłamy.
    if ((honeyInput?.value ?? '').trim() || (decoyInput?.value ?? '').trim()) {
      if (status) showSuccess(status, form);
      return;
    }

    const failures = fields
      .map((field) => ({ field, message: field.validate() }))
      .filter((result): result is { field: FormField; message: string } => result.message !== null);

    const turnstileToken = getTurnstileToken();
    if (!turnstileToken) {
      if (turnstileError) turnstileError.textContent = MESSAGES.turnstile;
      failures.push({
        field: {
          id: 'cf-turnstile',
          input: null,
          errorEl: turnstileError,
          validate: () => MESSAGES.turnstile,
        },
        message: MESSAGES.turnstile,
      });
    }

    if (failures.length > 0) {
      failures.forEach(({ field, message }) => {
        if (field.input || field.id !== 'cf-turnstile') showFieldError(field, message);
      });

      if (status && failures.length > 1) {
        status.textContent = MESSAGES.summary(failures.length);
        status.classList.add('form-status--error');
      }

      const focusTarget = failures[0].field.input;
      if (focusTarget) {
        focusTarget.focus();
        focusTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        document.getElementById('cf-turnstile')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const email = normalizeEmail(emailInput?.value || '');

    if (status) {
      status.textContent = MESSAGES.sending;
      status.classList.remove('form-status--error', 'form-status--success');
    }
    if (submitButton) submitButton.disabled = true;

    try {
      // 1) Server weryfikuje Turnstile (secret nie wychodzi do przeglądarki).
      const verifyResponse = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ turnstileToken }),
      });

      const verifyData = (await verifyResponse.json().catch(() => null)) as
        | { ok?: boolean; error?: string; skipSubmit?: boolean }
        | null;

      if (!verifyResponse.ok || !verifyData?.ok) {
        if (verifyData?.error === 'turnstile_failed' || verifyData?.error === 'missing_turnstile') {
          if (turnstileError) turnstileError.textContent = MESSAGES.turnstileFailed;
          resetTurnstile();
          throw new Error('turnstile');
        }
        const isLocal =
          location.hostname === 'localhost' || location.hostname === '127.0.0.1';
        if (isLocal && verifyResponse.status === 404) {
          throw new Error('local_api');
        }
        throw new Error(verifyData?.error || `HTTP ${verifyResponse.status}`);
      }

      if (verifyData.skipSubmit) {
        if (status) showSuccess(status, form);
        return;
      }

      // 2) Mail idzie z przeglądarki → FormSubmit (aktywacja + dostarczanie działa niezawodniej niż z Workera).
      const payload = new FormData();
      payload.append('name', nameInput?.value.trim() ?? '');
      payload.append('email', email);
      payload.append('phone', phoneInput?.value.trim() ?? '');
      payload.append('message', messageInput?.value.trim() ?? '');
      payload.append('consent', consentInput?.checked ? 'on' : '');
      const date = dateInput?.value.trim() ?? '';
      if (date) payload.append('date', date);
      payload.append('_subject', FORMSUBMIT_SUBJECT);
      payload.append('_template', 'table');
      payload.append('_cc', FORMSUBMIT_CC);
      payload.append('_blacklist', FORMSUBMIT_BLACKLIST);
      payload.append('_replyto', email);
      payload.append('_captcha', 'false');

      const sendResponse = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_TO}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: payload,
      });

      const sendData = (await sendResponse.json().catch(() => null)) as
        | { success?: string | boolean; message?: string }
        | null;

      const sendOk =
        sendResponse.ok && (sendData?.success === true || sendData?.success === 'true');

      if (!sendOk) {
        // Pierwsza wysyłka: FormSubmit wymaga kliknięcia w mail aktywacyjny.
        const needsActivation =
          typeof sendData?.message === 'string' &&
          /confirm|activat|verify|potwierd/i.test(sendData.message);

        if (needsActivation) {
          throw new Error('activation');
        }
        throw new Error('send_failed');
      }

      if (status) showSuccess(status, form);
    } catch (error) {
      if (status && !(error instanceof Error && error.message === 'turnstile')) {
        if (error instanceof Error && error.message === 'activation') {
          status.textContent = `Sprawdź skrzynkę ${CONTACT_EMAIL} (także spam) i kliknij link aktywacyjny FormSubmit, potem wyślij formularz ponownie.`;
        } else if (error instanceof Error && error.message === 'local_api') {
          status.textContent =
            'Lokalnie brak /api/quote — zrestartuj `npm run dev` (middleware Turnstile) albo użyj `npm run dev:cf`.';
        } else {
          status.textContent = MESSAGES.error;
        }
        status.classList.remove('form-status--success');
        status.classList.add('form-status--error');
        status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      resetTurnstile();
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}

const MESSAGES = {
  name: 'Podaj imię i nazwisko (min. 2 znaki).',
  phone: 'Podaj poprawny numer telefonu (min. 9 cyfr).',
  email: 'Podaj poprawny adres e-mail, np. jan.kowalski@example.com',
  message: 'Opisz wydarzenie (min. 10 znaków).',
  consent: 'Zaznacz zgodę na kontakt w sprawie wyceny.',
  summary: (count: number) => `Uzupełnij poprawnie ${count} pól oznaczonych na czerwono.`,
} as const;

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 9 && digits.length <= 15;
}

type FormField = {
  id: string;
  input: HTMLInputElement | HTMLTextAreaElement | null;
  errorEl: HTMLElement | null;
  validate: () => string | null;
};

export function initQuoteForm(): void {
  const form = document.getElementById('quote-form') as HTMLFormElement | null;
  if (!form) return;

  const status = document.getElementById('quote-status');
  const nextInput = document.getElementById('q-next') as HTMLInputElement | null;
  const replyToInput = document.getElementById('q-replyto') as HTMLInputElement | null;
  const nameInput = form.querySelector('#q-name') as HTMLInputElement | null;
  const phoneInput = form.querySelector('#q-phone') as HTMLInputElement | null;
  const emailInput = form.querySelector('#q-email') as HTMLInputElement | null;
  const messageInput = form.querySelector('#q-msg') as HTMLTextAreaElement | null;
  const consentInput = form.querySelector('#q-consent') as HTMLInputElement | null;

  const fields: FormField[] = [
    {
      id: 'q-name',
      input: nameInput,
      errorEl: document.getElementById('q-name-error'),
      validate: () => (nameInput && nameInput.value.trim().length >= 2 ? null : MESSAGES.name),
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
        messageInput && messageInput.value.trim().length >= 10 ? null : MESSAGES.message,
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

  if (nextInput) {
    nextInput.value = `${location.origin}${location.pathname}#wycena-sent`;
  }

  if (location.hash === '#wycena-sent') {
    if (status) {
      status.textContent =
        'Wiadomość została wysłana. Odezwiemy się najszybciej jak to możliwe.';
      status.classList.add('form-status--success');
    }
    history.replaceState(null, '', `${location.pathname}#wycena`);
  }

  if (location.search) {
    history.replaceState(null, '', location.pathname + location.hash);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearAllErrors();

    const failures = fields
      .map((field) => ({ field, message: field.validate() }))
      .filter((result): result is { field: FormField; message: string } => result.message !== null);

    if (failures.length > 0) {
      failures.forEach(({ field, message }) => showFieldError(field, message));

      if (status) {
        status.textContent =
          failures.length === 1 ? failures[0].message : MESSAGES.summary(failures.length);
        status.classList.add('form-status--error');
      }

      failures[0].field.input?.focus();
      failures[0].field.input?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const email = normalizeEmail(emailInput?.value || '');
    if (emailInput) emailInput.value = email;
    if (replyToInput) replyToInput.value = email;
    if (status) {
      status.textContent = 'Wysyłanie...';
      status.classList.remove('form-status--error');
    }

    form.submit();
  });
}

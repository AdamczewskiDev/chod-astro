function initMinimalHeader(): void {
  const minimalHeader = document.getElementById('header-minimal');
  const hero = document.getElementById('hero');
  if (!minimalHeader || !hero) return;

  const isMobile = () => window.innerWidth < 600;

  const setVisible = (visible: boolean) => {
    minimalHeader.classList.toggle('visible', visible);
    minimalHeader.setAttribute('aria-hidden', (!visible).toString());
  };

  const observer = new IntersectionObserver(
    (entries) => {
      if (!isMobile()) return;
      entries.forEach((entry) => setVisible(!entry.isIntersecting));
    },
    { threshold: 0.1 },
  );

  observer.observe(hero);

  const mediaQuery = window.matchMedia('(min-width: 600px)');
  mediaQuery.addEventListener('change', (e) => {
    if (e.matches) setVisible(false);
  });
  if (mediaQuery.matches) setVisible(false);
}

function initQuoteForm(): void {
  const form = document.getElementById('quote-form');
  if (!form) return;

  const status = document.getElementById('quote-status');
  const nextInput = document.getElementById('q-next') as HTMLInputElement | null;

  if (nextInput) {
    nextInput.value = `${location.origin}${location.pathname}#wycena-sent`;
  }

  if (location.hash === '#wycena-sent') {
    if (status) {
      status.textContent =
        'Wiadomość została wysłana. Odezwiemy się najszybciej jak to możliwe.';
    }
    history.replaceState(null, '', `${location.pathname}#wycena`);
  }

  if (location.search) {
    history.replaceState(null, '', location.pathname + location.hash);
  }

  form.addEventListener('submit', (event) => {
    if (status) status.textContent = '';

    const name = (form.querySelector('#q-name') as HTMLInputElement)?.value.trim() || '';
    const phone = (form.querySelector('#q-phone') as HTMLInputElement)?.value.trim() || '';
    const message = (form.querySelector('#q-msg') as HTMLTextAreaElement)?.value.trim() || '';
    const consent = (form.querySelector('#q-consent') as HTMLInputElement)?.checked;

    if (!name || !phone || !message || !consent) {
      event.preventDefault();
      form.reportValidity();
      return;
    }

    if (status) status.textContent = 'Wysyłanie...';
  });
}

initMinimalHeader();
initQuoteForm();

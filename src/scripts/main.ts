import { initQuoteForm } from './quote-form';

function initNav(): void {
  const headerInner = document.querySelector('.header-inner');
  const toggle = headerInner?.querySelector<HTMLButtonElement>('.nav-toggle');
  const nav = headerInner?.querySelector<HTMLElement>('#main-nav');
  if (!headerInner || !toggle || !nav) return;

  const setOpen = (open: boolean) => {
    headerInner.classList.toggle('is-nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu');
    nav.hidden = !open;
  };

  toggle.addEventListener('click', () => {
    setOpen(!headerInner.classList.contains('is-nav-open'));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && headerInner.classList.contains('is-nav-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
}

function initClientsMarquee(): void {
  const marquee = document.querySelector<HTMLElement>('.clients-marquee');
  if (!marquee) return;

  const pause = () => marquee.classList.add('is-paused');
  const resume = () => marquee.classList.remove('is-paused');

  marquee.addEventListener('touchstart', pause, { passive: true });
  // Nasłuch na oknie, bo palec często kończy gest poza karuzelą.
  window.addEventListener('touchend', resume, { passive: true });
  window.addEventListener('touchcancel', resume, { passive: true });
}

initNav();
initClientsMarquee();
initQuoteForm();

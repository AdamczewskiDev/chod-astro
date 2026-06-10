import { initQuoteForm } from './quote-form';

function initMinimalHeader(): void {
  const minimalHeader = document.getElementById('header-minimal');
  const hero = document.getElementById('hero');
  if (!minimalHeader || !hero) return;

  const isMobile = () => window.innerWidth < 600;

  const setVisible = (visible: boolean) => {
    minimalHeader.classList.toggle('visible', visible);
    if (visible) {
      minimalHeader.removeAttribute('aria-hidden');
      minimalHeader.removeAttribute('inert');
    } else {
      minimalHeader.setAttribute('aria-hidden', 'true');
      minimalHeader.setAttribute('inert', '');
    }
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

initMinimalHeader();
initQuoteForm();

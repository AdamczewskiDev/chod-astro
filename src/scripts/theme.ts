const STORAGE_KEY = 'chod-theme';

type Theme = 'light' | 'dark';

function getStoredTheme(): Theme | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === 'light' || stored === 'dark' ? stored : null;
}

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function getTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme();
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY, theme);

  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) meta.content = theme === 'dark' ? '#000000' : '#ffffff';
}

function updateToggleState(): void {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => {
    button.setAttribute('aria-label', isDark ? 'Włącz jasny motyw' : 'Włącz ciemny motyw');
    button.setAttribute('aria-pressed', isDark.toString());
    button.title = isDark ? 'Jasny motyw' : 'Ciemny motyw';
  });
}

export function initTheme(): void {
  applyTheme(getTheme());
  updateToggleState();

  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
      updateToggleState();
    });
  });
}

initTheme();

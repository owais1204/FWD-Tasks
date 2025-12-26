// Task 4: Theme toggle with localStorage + system preference

const root = document.documentElement;          // <html>
const btn  = document.getElementById('themeToggle');

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  btn.setAttribute('aria-pressed', String(theme === 'dark'));
  localStorage.setItem('theme', theme);
}

// initial theme
(function init() {
  const saved = localStorage.getItem('theme');
  if (saved) return applyTheme(saved);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark ? 'dark' : 'light');
})();

btn.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') || 'light';
  applyTheme(current === 'light' ? 'dark' : 'light');
});
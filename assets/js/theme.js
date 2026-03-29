// Theme management
(function () {
  const html = document.documentElement;
  const KEY = 'devlog-theme';

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(KEY, theme);
    updateIcons(theme);
  }

  function updateIcons(theme) {
    const moon = document.querySelector('.icon-moon');
    const sun = document.querySelector('.icon-sun');
    if (!moon || !sun) return;
    if (theme === 'dark') {
      moon.style.display = 'none';
      sun.style.display = 'block';
    } else {
      moon.style.display = 'block';
      sun.style.display = 'none';
    }
  }

  // Init: check saved preference or system preference
  const saved = localStorage.getItem(KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : 'light');
  setTheme(initial);

  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        const current = html.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
      });
    }
    updateIcons(html.getAttribute('data-theme'));
  });
})();

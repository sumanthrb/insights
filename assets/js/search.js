// Client-side search using search.json
document.addEventListener('DOMContentLoaded', function () {
  const searchToggle = document.getElementById('search-toggle');
  const searchWrap = document.getElementById('search-wrap');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  if (!searchToggle || !searchWrap) return;

  let posts = [];
  let loaded = false;

  searchToggle.addEventListener('click', function () {
    const hidden = searchWrap.style.display === 'none' || !searchWrap.style.display;
    searchWrap.style.display = hidden ? 'block' : 'none';
    if (hidden) {
      searchInput.focus();
      if (!loaded) {
        fetch('/search.json')
          .then(r => r.json())
          .then(data => {
            posts = data;
            loaded = true;
          });
      }
    }
  });

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const q = this.value.trim().toLowerCase();
      searchResults.innerHTML = '';
      if (!q || q.length < 2) return;

      const matches = posts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        (p.tags && p.tags.join(' ').toLowerCase().includes(q))
      ).slice(0, 8);

      if (!matches.length) {
        searchResults.innerHTML = '<p style="color:var(--text-muted);font-size:.875rem;padding:.5rem 0">No results found.</p>';
        return;
      }

      matches.forEach(p => {
        const div = document.createElement('div');
        div.className = 'search-result-item';
        div.innerHTML = `
          <h3><a href="${p.url}">${highlight(p.title, q)}</a></h3>
          <p>${highlight(p.excerpt, q)}</p>
        `;
        searchResults.appendChild(div);
      });
    });
  }

  function highlight(text, q) {
    if (!text) return '';
    const safe = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(new RegExp(safe, 'gi'), m => `<mark style="background:var(--accent-soft);color:var(--accent)">${m}</mark>`);
  }
});

# Sumanth Insights —  Tech Blog

Welcome to Sumanth Insights — a space where I write about software engineering, system design, developer tools, and whatever I'm learning or building.

## Features

- 🌙 **Dark mode** — auto-detects system preference, toggle persists in localStorage
- 🔍 **Client-side search** — instant search across all posts via `search.json`
- 🏷️ **Tags & Categories** — tag filtering, dedicated tags page grouped by tag
- 📖 **Reading progress bar** — on post pages
- ⚡ **Fast** — no JS frameworks, no build tools beyond Jekyll
- 📱 **Responsive** — works on all screen sizes
- 📡 **RSS feed** — auto-generated via `jekyll-feed`
- 🗺️ **Sitemap** — auto-generated via `jekyll-sitemap`
- 🤖 **SEO tags** — via `jekyll-seo-tag`

---

## Project Structure

```
.
├── _config.yml          # Site configuration
├── _layouts/
│   ├── default.html     # Base HTML wrapper
│   ├── post.html        # Single post layout
│   └── page.html        # Static page layout
├── _includes/
│   ├── header.html      # Sticky header with nav + toggle
│   ├── footer.html      # Footer with links
│   └── post-card.html   # Reusable post card component
├── _posts/              # my blog posts (Markdown)
├── assets/
│   ├── css/main.scss    # All styles (compiled by Jekyll)
│   └── js/
│       ├── theme.js     # Dark mode toggle
│       └── search.js    # Client-side search
├── search.json          # Search index (auto-generated)
├── index.html           # Homepage
├── tags.html            # Tags listing page
├── about.html           # About page
├── 404.html             # Custom 404
└── .github/
    └── workflows/
        └── deploy.yml   # GitHub Actions deploy
```

---


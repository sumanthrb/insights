# DevLog — Jekyll Tech Blog for GitHub Pages

A clean, fast, feature-rich tech blog built with Jekyll. Designed for GitHub Pages with zero external dependencies.

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

## Quick Start

### 1. Clone & install dependencies

```bash
gem install bundler
bundle install
```

### 2. Run locally

```bash
bundle exec jekyll serve --livereload
# Open http://localhost:4000
```

### 3. Customize `_config.yml`

```yaml
title: "YourBlog"
description: "Your blog description"
author:
  name: "Your Name"
  bio: "Your short bio"
  github: "yourusername"
  twitter: "yourhandle"
  email: "you@example.com"
url: "https://yourusername.github.io"
```

---

## Deploy to GitHub Pages

### Option A — GitHub Actions (recommended)

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set **Source** to `GitHub Actions`
4. Push to `main` — the workflow in `.github/workflows/deploy.yml` handles the rest

### Option B — Branch deploy

1. Go to **Settings → Pages**
2. Set **Source** to `Deploy from a branch`, select `main`, folder `/ (root)`
3. Push to `main`

---

## Writing Posts

Create a file in `_posts/` named `YYYY-MM-DD-your-title.md`:

```markdown
---
layout: post
title: "Your Post Title"
date: 2025-03-29
tags: [javascript, performance, web]
excerpt: "A short summary shown in post cards."
---

Your content here in Markdown.
```

### Supported Markdown features

- Fenced code blocks with syntax highlighting (Rouge)
- Blockquotes
- Tables
- Images
- Inline `code`

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
├── _posts/              # Your blog posts (Markdown)
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

## Customization

### Colors & Theme

Edit the CSS variables at the top of `assets/css/main.scss`:

```scss
:root {
  --accent: #d4541a;      /* Primary accent color */
  --bg: #f6f4ef;          /* Light mode background */
  ...
}

[data-theme="dark"] {
  --accent: #f07040;      /* Dark mode accent */
  --bg: #111113;          /* Dark mode background */
  ...
}
```

### Fonts

The blog uses [Google Fonts](https://fonts.google.com):
- **JetBrains Mono** — monospace (code, labels)
- **Fraunces** — serif (headings, titles)
- **DM Sans** — sans-serif (body text)

Change the `@import` at the top of `main.scss` to swap fonts.

### Add New Pages

Create any `.html` or `.md` file with front matter:

```yaml
---
layout: page
title: "My Page"
permalink: /my-page/
---
```

Then add it to the nav in `_includes/header.html`.

---

## License

MIT — use freely, attribute if you like.

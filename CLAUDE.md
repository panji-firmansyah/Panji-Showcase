# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static portfolio website showcasing editorial-style landing pages. Pure HTML/CSS/JavaScript — no build system, no package manager, no frameworks.

## Architecture

```
index.html              ← Main showcase homepage (dark theme, interactive)
assets/
  style.css             ← Homepage-only styles
  main.js               ← Homepage-only JS (cursor, typing, tilt, GSAP animations)
coach-prijono/
  index.html            ← Self-contained article page (all CSS/JS inline)
ddi-article/
  index.html            ← Self-contained article page (all CSS/JS inline)
```

**Critical separation:** The homepage (`index.html` + `assets/`) and subpages (`coach-prijono/`, `ddi-article/`) are fully isolated. Subpages have all their own CSS and JS embedded inline. They do NOT import from `assets/`. This is intentional — subpages are AI-generated landing pages added as showcase pieces, and they must never affect or be affected by the homepage.

## Adding New Showcase Pages

New subpages follow this pattern:
1. Create a new directory (e.g., `new-project/index.html`)
2. All CSS and JS must be **inline** within the HTML file — do not link to `assets/`
3. Add a card linking to the new page in the homepage's `.grid` section
4. The page should be fully self-contained and independently styled

## CDN Libraries (Homepage Only)

- **GSAP 3.12.2** — entrance animations, cursor tracking
- **Typed.js 2.1.0** — rotating text in header
- **VanillaTilt 1.8.0** — 3D card hover effect
- **Google Fonts** — Inter, Playfair Display

## Development

No build step. Open `index.html` directly in a browser or use any static file server:
```bash
npx serve .
# or
python3 -m http.server
```

## Deployment

Static files — deploy directly to GitHub Pages or any static host. Repository: `panji-firmansyah/Panji-Showcase` on GitHub.

## Design Conventions

- **Homepage:** Dark theme (`#0c0d10`), blue accent (`#3b82f6`), Inter font
- **Article subpages:** Warm editorial theme, red accent (`#C8102E`), serif typography
- CSS custom properties defined in `:root` for theming
- Class names use kebab-case
- JS organized in modular blocks within `main.js`, wrapped in `DOMContentLoaded`
- Responsive breakpoint at 768px

## Communication

Bahasa campur (Indonesia & English) — technical terms in English, general explanations flexible.

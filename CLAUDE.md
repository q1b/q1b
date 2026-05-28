# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev        # Start dev server at localhost:4321
npm run build      # Build to ./dist/ (uses Cloudflare adapter)
npm run preview    # Preview the production build locally
npx astro check    # Type-check .astro files
```

There are no test commands configured in this project.

## Architecture

This is a personal portfolio site for Sukhpreet Singh (q1b.dev), built with **Astro 5** and deployed to **Cloudflare Pages** via the `@astrojs/cloudflare` adapter. Styling uses **Tailwind CSS v4** (via `@tailwindcss/vite` plugin, not the legacy integration). Content is authored in **Markdoc** (`.mdoc` files).

### Content Collections

All site content lives under `src/data/` and is registered in [src/content.config.ts](src/content.config.ts) using Astro's glob loader (Astro 5 Content Layer API — not the legacy `src/content/` directory). Collections:

- **articles** — blog posts as `.mdoc` files; `visible: boolean` gates display
- **projects** — portfolio projects as `.mdoc` files; `visible` and `isMajorProject` flags
- **certificates** — JSON files with a `related` enum (`"yoga" | "engineering" | "other"`) for filtering
- **videos / photos** — JSON files with the same `related` enum
- **categories / tags** — simple JSON lookup files
- **knowledge-series** — JSON files (e.g., Ashtavakra Gita series)

### Layout Hierarchy

`Wrapper.astro` → `Layout.astro` → page components. `Layout.astro` generates the grid background SVG inline via `mini-svg-data-uri` and applies it as a CSS custom property.

### Data Files

`src/data/profile.json` drives profile card, social links, and resume PDF path. `src/data/homepage.json` supplies page `<title>` and meta description for the index route. The `resumePDF` field in `profile.json` must match a file path resolvable by `import.meta.glob("/src/assets/files/resume/*.pdf")` — the index page throws if it doesn't exist.

### Deployment

`wrangler.jsonc` targets the Cloudflare Workers runtime with `nodejs_compat` flag. The `compatibility_date` field should be kept current. Deploy output goes to `dist/` which is bound as the `ASSETS` binding.

### Animations

Scroll-triggered `rough-notation` underlines are used on section headings, driven by `motion`'s `inView` utility in inline `<script>` tags on the index page.

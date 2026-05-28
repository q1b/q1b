# Tech Icons: React, TanStack Start, PostgreSQL, Shadcn UI, Drizzle

**Date:** 2026-05-28  
**Status:** Approved

## Goal

Add five new technology icons (React, TanStack Start, PostgreSQL, Shadcn UI, Drizzle) following the existing icon pattern so they can be displayed in work experience entries and selected in the Keystatic CMS.

## Scope

Three files touched:

1. `src/icons/logos/` — 5 new Astro icon components
2. `src/components/TechIcon.astro` — 5 new imports + slug mappings
3. `keystatic.config.ts` — 5 new options in the `work-experience` technologies multiselect

No other files change. `src/content.config.ts` is not touched (technologies is already `z.array(z.string())`).

## Icons

Each icon file follows the existing pattern: accepts a `height` prop (default 32), computes `width` proportionally from the SVG viewBox, renders inline SVG.

| Icon | File | Slug | Color |
|------|------|------|-------|
| React | `src/icons/logos/React.astro` | `react` | `#61DAFB` |
| TanStack Start | `src/icons/logos/TanstackStart.astro` | `tanstack-start` | `#FF4154` |
| PostgreSQL | `src/icons/logos/Postgres.astro` | `postgres` | `#4169E1` |
| Shadcn UI | `src/icons/logos/ShadcnUI.astro` | `shadcn-ui` | monochrome (currentColor) |
| Drizzle | `src/icons/logos/Drizzle.astro` | `drizzle` | `#C5F74F` |

## TechIcon.astro

Add imports at the top and conditional render lines matching the existing pattern:

```ts
import ReactIcon from '../icons/logos/React.astro';
import TanstackStartIcon from '../icons/logos/TanstackStart.astro';
import PostgresIcon from '../icons/logos/Postgres.astro';
import ShadcnUIIcon from '../icons/logos/ShadcnUI.astro';
import DrizzleIcon from '../icons/logos/Drizzle.astro';
```

```astro
{tech === 'react' && <ReactIcon height={height} />}
{tech === 'tanstack-start' && <TanstackStartIcon height={height} />}
{tech === 'postgres' && <PostgresIcon height={height} />}
{tech === 'shadcn-ui' && <ShadcnUIIcon height={height} />}
{tech === 'drizzle' && <DrizzleIcon height={height} />}
```

## Keystatic Config

Add to the `technologies` multiselect `options` array in the `work-experience` collection:

```ts
{ label: 'React', value: 'react' },
{ label: 'TanStack Start', value: 'tanstack-start' },
{ label: 'PostgreSQL', value: 'postgres' },
{ label: 'Shadcn UI', value: 'shadcn-ui' },
{ label: 'Drizzle', value: 'drizzle' },
```

## SVG Sources

Use Simple Icons (simpleicons.org) for React, PostgreSQL, and Drizzle. TanStack Start uses the TanStack brand SVG. Shadcn UI uses a simple monochrome mark (currentColor) since it has no official color brand.

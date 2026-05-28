# Tech Icons: React, TanStack Start, PostgreSQL, Shadcn UI, Drizzle — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add five new technology icon Astro components (React, TanStack Start, PostgreSQL, Shadcn UI, Drizzle) and wire them into `TechIcon.astro` and the Keystatic work-experience technologies multiselect.

**Architecture:** Each icon is a standalone `.astro` file in `src/icons/logos/` that accepts a `height` prop and renders an inline SVG, sourced from Simple Icons (cdn.simpleicons.org) for 4 of the 5 icons. Shadcn UI has no official colored icon so it uses a custom monochrome mark with `currentColor`. `TechIcon.astro` maps slug strings to icon components. `keystatic.config.ts` lists each slug as a selectable technology option.

**Tech Stack:** Astro, Simple Icons (SVG source), `@keystatic/core`

---

### Task 1: Create the five icon `.astro` files

**Files:**
- Create: `src/icons/logos/React.astro`
- Create: `src/icons/logos/TanstackStart.astro`
- Create: `src/icons/logos/Postgres.astro`
- Create: `src/icons/logos/ShadcnUI.astro`
- Create: `src/icons/logos/Drizzle.astro`

**Pattern to follow** (from `src/icons/logos/Svelte.astro`):
```astro
---
export type Props = {
  height?: number;
};
const { height = 32 } = Astro.props;
---
<svg
  xmlns="http://www.w3.org/2000/svg"
  width={(viewbox_width / viewbox_height) * height}
  height={height}
  viewBox="0 0 W H"
>
  <path fill="#COLOR" d="..." />
</svg>
```
The `width` expression normalises the icon to the requested height while preserving the aspect ratio. For square viewBoxes (e.g. `0 0 24 24`) `width={height}` is sufficient.

---

- [ ] **Step 1: Fetch React SVG from Simple Icons**

```bash
curl -s "https://cdn.simpleicons.org/react/61DAFB" -o /tmp/react.svg && cat /tmp/react.svg
```

Copy the `viewBox` attribute and every `<path>` element from the output.

- [ ] **Step 2: Create `src/icons/logos/React.astro`**

```astro
---
export type Props = {
  height?: number;
};
const { height = 32 } = Astro.props;
---
<svg
  xmlns="http://www.w3.org/2000/svg"
  width={height}
  height={height}
  viewBox="0 0 24 24"
>
  <!-- paste the <path> elements from the fetched SVG here, with fill="#61DAFB" -->
</svg>
```

Replace the comment with the actual `<path>` elements from Step 1.

---

- [ ] **Step 3: Fetch TanStack SVG from Simple Icons**

```bash
curl -s "https://cdn.simpleicons.org/tanstack/FF4154" -o /tmp/tanstack.svg && cat /tmp/tanstack.svg
```

Copy the `viewBox` and `<path>` elements.

- [ ] **Step 4: Create `src/icons/logos/TanstackStart.astro`**

```astro
---
export type Props = {
  height?: number;
};
const { height = 32 } = Astro.props;
---
<svg
  xmlns="http://www.w3.org/2000/svg"
  width={height}
  height={height}
  viewBox="0 0 24 24"
>
  <!-- paste the <path> elements from the fetched SVG here, with fill="#FF4154" -->
</svg>
```

Replace the comment with the actual `<path>` elements from Step 3.

---

- [ ] **Step 5: Fetch PostgreSQL SVG from Simple Icons**

```bash
curl -s "https://cdn.simpleicons.org/postgresql/4169E1" -o /tmp/postgres.svg && cat /tmp/postgres.svg
```

Copy the `viewBox` and `<path>` elements.

- [ ] **Step 6: Create `src/icons/logos/Postgres.astro`**

```astro
---
export type Props = {
  height?: number;
};
const { height = 32 } = Astro.props;
---
<svg
  xmlns="http://www.w3.org/2000/svg"
  width={height}
  height={height}
  viewBox="0 0 24 24"
>
  <!-- paste the <path> elements from the fetched SVG here, with fill="#4169E1" -->
</svg>
```

Replace the comment with the actual `<path>` elements from Step 5.

---

- [ ] **Step 7: Create `src/icons/logos/ShadcnUI.astro`**

Shadcn UI has no official icon on Simple Icons. Use this custom monochrome mark (a minimal component-box icon using `currentColor` so it adapts to light/dark themes):

```astro
---
export type Props = {
  height?: number;
};
const { height = 32 } = Astro.props;
---
<svg
  xmlns="http://www.w3.org/2000/svg"
  width={height}
  height={height}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect x="3" y="3" width="18" height="18" rx="3" />
  <path d="M3 9h18" />
  <path d="M9 21V9" />
</svg>
```

---

- [ ] **Step 8: Fetch Drizzle SVG from Simple Icons**

```bash
curl -s "https://cdn.simpleicons.org/drizzle/C5F74F" -o /tmp/drizzle.svg && cat /tmp/drizzle.svg
```

Copy the `viewBox` and `<path>` elements.

- [ ] **Step 9: Create `src/icons/logos/Drizzle.astro`**

```astro
---
export type Props = {
  height?: number;
};
const { height = 32 } = Astro.props;
---
<svg
  xmlns="http://www.w3.org/2000/svg"
  width={height}
  height={height}
  viewBox="0 0 24 24"
>
  <!-- paste the <path> elements from the fetched SVG here, with fill="#C5F74F" -->
</svg>
```

Replace the comment with the actual `<path>` elements from Step 8.

---

- [ ] **Step 10: Verify all five files exist**

```bash
ls src/icons/logos/ | grep -E "React|TanstackStart|Postgres|ShadcnUI|Drizzle"
```

Expected output:
```
Drizzle.astro
Postgres.astro
React.astro
ShadcnUI.astro
TanstackStart.astro
```

- [ ] **Step 11: Commit**

```bash
git add src/icons/logos/React.astro src/icons/logos/TanstackStart.astro src/icons/logos/Postgres.astro src/icons/logos/ShadcnUI.astro src/icons/logos/Drizzle.astro
git commit -m "feat: add React, TanStack Start, PostgreSQL, Shadcn UI, Drizzle icon components"
```

---

### Task 2: Wire icons into `TechIcon.astro`

**Files:**
- Modify: `src/components/TechIcon.astro`

The current file (`src/components/TechIcon.astro`) imports nine existing icons at the top and renders them with `{tech === 'slug' && <Icon />}` conditionals. Add five more following the same pattern.

- [ ] **Step 1: Add imports**

Open `src/components/TechIcon.astro`. After the last existing import (line 10, `VitejsIcon`), add:

```astro
import ReactIcon from '../icons/logos/React.astro';
import TanstackStartIcon from '../icons/logos/TanstackStart.astro';
import PostgresIcon from '../icons/logos/Postgres.astro';
import ShadcnUIIcon from '../icons/logos/ShadcnUI.astro';
import DrizzleIcon from '../icons/logos/Drizzle.astro';
```

- [ ] **Step 2: Add conditional render lines**

After the last existing render line (`{tech === 'vitejs' && <VitejsIcon height={height} />}`), add:

```astro
{tech === 'react' && <ReactIcon height={height} />}
{tech === 'tanstack-start' && <TanstackStartIcon height={height} />}
{tech === 'postgres' && <PostgresIcon height={height} />}
{tech === 'shadcn-ui' && <ShadcnUIIcon height={height} />}
{tech === 'drizzle' && <DrizzleIcon height={height} />}
```

- [ ] **Step 3: Verify the full file looks correct**

The complete `src/components/TechIcon.astro` should now have 14 imports and 14 conditional render lines (9 existing + 5 new). Run:

```bash
npx astro check
```

Expected: 0 errors, 0 warnings.

- [ ] **Step 4: Commit**

```bash
git add src/components/TechIcon.astro
git commit -m "feat: wire React, TanStack Start, PostgreSQL, Shadcn UI, Drizzle into TechIcon"
```

---

### Task 3: Add options to Keystatic work-experience technologies multiselect

**Files:**
- Modify: `keystatic.config.ts`

The `work-experience` collection (around line 258 in `keystatic.config.ts`) has a `technologies` field using `fields.multiselect` with a hardcoded `options` array. Add five new entries.

- [ ] **Step 1: Locate the technologies options array**

Open `keystatic.config.ts` and find the `technologies` field in the `work-experience` collection. It currently ends with:

```ts
{ label: 'Vite', value: 'vitejs' },
```

- [ ] **Step 2: Add the five new options**

After `{ label: 'Vite', value: 'vitejs' },` add:

```ts
{ label: 'React', value: 'react' },
{ label: 'TanStack Start', value: 'tanstack-start' },
{ label: 'PostgreSQL', value: 'postgres' },
{ label: 'Shadcn UI', value: 'shadcn-ui' },
{ label: 'Drizzle', value: 'drizzle' },
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx astro check
```

Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add keystatic.config.ts
git commit -m "feat: add React, TanStack Start, PostgreSQL, Shadcn UI, Drizzle to keystatic technologies options"
```

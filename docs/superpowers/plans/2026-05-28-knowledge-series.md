# Knowledge Series Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the knowledge series section on `yoga-meditation.astro` data-driven with a status pill (Ongoing / Upcoming / Completed), matching the projects and work-experience card style.

**Architecture:** Register `knowledge-series` as an Astro content collection, add `end_date` to both the Keystatic schema and Astro schema, then replace the hardcoded card in `yoga-meditation.astro` with a dynamic `getCollection` loop that computes status from dates and sorts Active → Upcoming → Completed.

**Tech Stack:** Astro 5 Content Layer API, Keystatic Core, Zod, Tailwind CSS v4

---

## File Map

| File | Action |
|------|--------|
| `keystatic.config.ts` | Add `end_date` optional date field to `knowledge-series` collection |
| `src/content.config.ts` | Register `knowledgeSeries` collection with Zod schema |
| `src/data/knowledge-series/2026-ashtavakra-gita.json` | Add `"end_date": null` |
| `src/pages/yoga-meditation.astro` | Replace hardcoded card with dynamic collection loop + status logic |

---

### Task 1: Add `end_date` to Keystatic schema

**Files:**
- Modify: `keystatic.config.ts` (the `knowledge-series` collection schema, around line 279)

- [ ] **Step 1: Add `end_date` field**

In `keystatic.config.ts`, find the `knowledge-series` collection schema and add `end_date` after `start_date`:

```ts
'knowledge-series': collection({
  label: 'Knowledge Series',
  slugField: 'title',
  path: 'src/data/knowledge-series/*',
  format: { data: 'json' },
  schema: {
    title: fields.slug({ name: { label: 'Title' } }),
    start_date: fields.date({ label: 'Start Date' }),
    end_date: fields.date({ label: 'End Date' }),   // ← add this line
    description: fields.text({ label: 'Description', multiline: true }),
    topics: fields.array(
      fields.text({ label: 'Topic' }),
      { label: 'Topics', itemLabel: (props) => props.value }
    ),
    join_url: fields.url({ label: 'Join URL' }),
  },
}),
```

- [ ] **Step 2: Type-check**

```bash
npx astro check
```

Expected: no errors related to `keystatic.config.ts`.

---

### Task 2: Register `knowledgeSeries` in Astro content config

**Files:**
- Modify: `src/content.config.ts`

- [ ] **Step 1: Add collection definition**

After the existing `workExperience` collection definition (before the `export const collections` line), add:

```ts
const knowledgeSeries = defineCollection({
  loader: glob({ pattern: "**/[^_]*.json", base: "./src/data/knowledge-series" }),
  schema: z.object({
    title: z.string(),
    start_date: z.coerce.date(),
    end_date: z.coerce.date().optional().nullable(),
    description: z.string(),
    topics: z.array(z.string()),
    join_url: z.string().optional().nullable(),
  }),
});
```

- [ ] **Step 2: Export the collection**

Update the `export const collections` object to include `knowledgeSeries`:

```ts
export const collections = {
  tags,
  photos,
  videos,
  articles,
  projects,
  categories,
  certificates,
  workExperience,
  knowledgeSeries,
};
```

- [ ] **Step 3: Type-check**

```bash
npx astro check
```

Expected: no type errors.

---

### Task 3: Update the JSON data file

**Files:**
- Modify: `src/data/knowledge-series/2026-ashtavakra-gita.json`

- [ ] **Step 1: Add `end_date` field**

Replace the file contents with:

```json
{
  "title": "Ashtavakra Gita",
  "start_date": "2026-01-15",
  "end_date": null,
  "description": "A deep dive into the Ashtavakra Gita, exploring its teachings on non-duality and self-realization.",
  "topics": ["Non-duality", "Self-realization", "Philosophy", "Meditation"],
  "join_url": "https://example.com/join-ashtavakra-gita"
}
```

- [ ] **Step 2: Type-check**

```bash
npx astro check
```

Expected: no errors.

---

### Task 4: Rewrite Knowledge Series section in `yoga-meditation.astro`

**Files:**
- Modify: `src/pages/yoga-meditation.astro`

- [ ] **Step 1: Update frontmatter — import collection and add status logic**

Replace the entire frontmatter block (between the `---` fences) with:

```ts
---
import MaskBackground from "../components/Backgrounds/MaskBackground.astro";
import Layout from "../layouts/Layout.astro";
import homepage from "../data/homepage.json";
import { getCollection } from "astro:content";
import ProfileCard from "../components/ProfileCard.astro";
import Navbar from "../components/Navbar.astro";

const yogaCertificates = (await getCollection("certificates")).filter((data) => data.data.related === "yoga");

const today = new Date();

type Status = "Ongoing" | "Upcoming" | "Completed";

function getStatus(startDate: Date, endDate: Date | null | undefined): Status {
  if (startDate > today) return "Upcoming";
  if (!endDate || endDate >= today) return "Ongoing";
  return "Completed";
}

const statusOrder: Record<Status, number> = { Ongoing: 0, Upcoming: 1, Completed: 2 };

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).format(date);

const knowledgeSeriesRaw = await getCollection("knowledgeSeries");
const knowledgeSeries = knowledgeSeriesRaw
  .map((item) => ({
    ...item,
    status: getStatus(item.data.start_date, item.data.end_date ?? null),
  }))
  .sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
---
```

- [ ] **Step 2: Replace the hardcoded Knowledge Series card section**

Find the existing `<div id="yoga-certificates" ...>` block that contains the hardcoded Ashtavakra Gita card (the one with the `<img>` tag and `poster.png`) and replace it entirely with:

```astro
<div
  id="knowledge-series-container"
  class="mt-12 flex z-10 flex-col items-center w-full p-2"
>
  <h2
    id="knowledge-series-heading"
    class="text-4xl font-bold dark:text-slate-100 text-blue-700 font-cursive [text-shadow:0px_2px_4px_#008FFF44,0px_2px_8px_#fffa] dark:[text-shadow:0px_2px_4px_#fff1,0px_0px_8px_#fff2]"
  >
    Knowledge Series
  </h2>
  <ul class="flex flex-col items-center gap-y-6 mt-8 max-w-xl w-full">
    {knowledgeSeries.map(({ data: session, status }) => (
      <li class="w-full">
        <div>
          <h2 class="text-slate-700 dark:text-white text-2xl font-medium w-full flex justify-between items-center gap-x-2">
            <span>{session.title}</span>
            <span class:list={[
              "inline-flex items-center gap-x-1 text-sm font-medium shrink-0",
              status === "Ongoing" && "text-green-600 dark:text-green-400",
              status === "Upcoming" && "text-amber-600 dark:text-amber-400",
              status === "Completed" && "text-slate-400 dark:text-slate-500",
            ]}>
              {status !== "Completed" && <span class="text-[10px] leading-none">●</span>}
              {status}
            </span>
          </h2>
          <div class="flex flex-col gap-y-1 mt-1 pl-0.5">
            <span class="text-slate-600 text-sm dark:text-blue-300 inline-flex items-center font-medium gap-x-2">
              <span>
                {formatDate(session.start_date)}
                {session.end_date ? ` — ${formatDate(session.end_date)}` : ""}
              </span>
            </span>
          </div>
        </div>
        <p class="text-slate-600 mt-2 dark:text-slate-300 font-medium">{session.description}</p>
        {session.topics.length > 0 && (
          <div class="flex flex-wrap gap-2 mt-3">
            {session.topics.map((topic) => (
              <span class="text-xs px-2 py-0.5 rounded-full border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400">
                {topic}
              </span>
            ))}
          </div>
        )}
        {session.join_url && status !== "Completed" && (
          <div class="flex flex-wrap w-full dark:text-white text-slate-700 gap-3 items-center mt-4">
            <a
              href={session.join_url}
              target="_blank"
              class="inline-flex gap-x-1 items-center hover:underline decoration-wavy underline-offset-4
              tab-highlight-none box-border whitespace-nowrap
              rounded-full px-1
              ring-offset-2 focus:outline-hidden
              focus:ring-2 focus:ring-slate-200
              dark:ring-offset-slate-900
              dark:focus:ring-slate-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                <path fill-rule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clip-rule="evenodd" />
              </svg>
              <span>Join</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                <path fill-rule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        )}
      </li>
    ))}
  </ul>
</div>
<script>
  import { inView } from "motion";
  import { annotate } from "rough-notation";
  const e = document.querySelector("#knowledge-series-heading") as HTMLElement;
  inView("#knowledge-series-container", () => {
    setTimeout(() => {
      const annotation = annotate(e, {
        type: "underline",
        color: "#008FFF",
      });
      annotation.show();
    }, 200);
  }, {
    margin: "0px 0px -100px 0px"
  });
</script>
```

- [ ] **Step 3: Remove unused `poster.png` import**

Remove these two lines from the frontmatter (they are no longer needed):

```ts
const images = import.meta.glob<{ default: ImageMetadata }>("/src/assets/images/poster.png");
const image = await images["/src/assets/images/poster.png"]();
```

- [ ] **Step 4: Type-check**

```bash
npx astro check
```

Expected: no errors.

- [ ] **Step 5: Run dev server and verify visually**

```bash
npm run dev
```

Open `http://localhost:4321/yoga-meditation` and verify:
- Knowledge Series section renders with the Ashtavakra Gita entry
- Status pill shows "● Ongoing" in green (start_date 2026-01-15 is in the past, no end_date)
- Topics chips render: Non-duality, Self-realization, Philosophy, Meditation
- Join link renders (join_url is set and status is Ongoing)
- Section heading has the rough-notation underline animation on scroll
- Certificates section below still renders correctly

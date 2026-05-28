# Yoga Sessions Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a data-driven Yoga Sessions section to `yoga-meditation.astro` with style, level, location, schedule, duration, practices, optional instructors, and a platform-aware join link — consistent with the Knowledge Series card design.

**Architecture:** Four parallel changes — Keystatic schema, Astro content config, seed JSON, and page section. The page section reuses `getStatus`, `getJoinPlatform`, `formatDate`, and `statusOrder` already defined in `yoga-meditation.astro`. The new section is inserted between the Knowledge Series script block and the existing Certificates section.

**Tech Stack:** Astro 5 Content Layer API, Keystatic Core (`fields`), Zod, Tailwind CSS v4, `motion` inView, `rough-notation`

---

## File Map

| File | Action |
|------|--------|
| `keystatic.config.ts` | Add `yoga-sessions` collection with full schema |
| `src/content.config.ts` | Register `yogaSessions` collection |
| `src/data/yoga-sessions/morning-hatha.json` | Create seed entry |
| `src/pages/yoga-meditation.astro` | Add `yogaSessions` query to frontmatter + insert Yoga Sessions section in template |

---

### Task 1: Add `yoga-sessions` collection to Keystatic

**Files:**
- Modify: `keystatic.config.ts`

- [ ] **Step 1: Read the file and locate the insertion point**

Read `/Users/sukhpreetsingh/github.com/personal-work/sukhpreet_singh/v5/keystatic.config.ts` and find the `'knowledge-series'` collection entry. The new `'yoga-sessions'` collection goes immediately after it, before the closing `},` of `collections:`.

- [ ] **Step 2: Add the collection**

Insert the following after the `'knowledge-series'` collection block:

```ts
'yoga-sessions': collection({
  label: 'Yoga Sessions',
  slugField: 'title',
  path: 'src/data/yoga-sessions/*',
  format: { data: 'json' },
  schema: {
    title: fields.slug({ name: { label: 'Title' } }),
    style: fields.select({
      label: 'Style',
      options: [
        { label: 'Hatha', value: 'Hatha' },
        { label: 'Pranayama', value: 'Pranayama' },
        { label: 'Vinyasa', value: 'Vinyasa' },
        { label: 'Ashtanga', value: 'Ashtanga' },
        { label: 'Yin', value: 'Yin' },
        { label: 'Kundalini', value: 'Kundalini' },
        { label: 'Restorative', value: 'Restorative' },
        { label: 'Mixed', value: 'Mixed' },
        { label: 'Other', value: 'Other' },
      ],
      defaultValue: 'Hatha',
    }),
    level: fields.select({
      label: 'Level',
      options: [
        { label: 'Beginner', value: 'Beginner' },
        { label: 'Intermediate', value: 'Intermediate' },
        { label: 'Advanced', value: 'Advanced' },
        { label: 'All Levels', value: 'All Levels' },
      ],
      defaultValue: 'All Levels',
    }),
    location_type: fields.select({
      label: 'Location Type',
      options: [
        { label: 'Online', value: 'Online' },
        { label: 'In-person', value: 'In-person' },
        { label: 'Hybrid', value: 'Hybrid' },
      ],
      defaultValue: 'Online',
    }),
    venue: fields.text({ label: 'Venue (for In-person / Hybrid)' }),
    schedule: fields.text({ label: 'Schedule (e.g. Daily · 6:00 AM IST)' }),
    duration: fields.text({ label: 'Duration (e.g. 60 min)' }),
    start_date: fields.date({ label: 'Start Date' }),
    end_date: fields.date({ label: 'End Date' }),
    description: fields.text({ label: 'Description', multiline: true }),
    practices: fields.array(
      fields.text({ label: 'Practice' }),
      { label: 'Practices', itemLabel: (props) => props.value }
    ),
    instructors: fields.array(
      fields.text({ label: 'Instructor name' }),
      { label: 'Co-instructors', itemLabel: (props) => props.value }
    ),
    join_url: fields.url({ label: 'Join URL' }),
  },
}),
```

- [ ] **Step 3: Type-check**

```bash
cd /Users/sukhpreetsingh/github.com/personal-work/sukhpreet_singh/v5 && npx astro check
```

Expected: 0 errors, 0 warnings.

---

### Task 2: Register `yogaSessions` in Astro content config

**Files:**
- Modify: `src/content.config.ts`

- [ ] **Step 1: Add collection definition**

Read `/Users/sukhpreetsingh/github.com/personal-work/sukhpreet_singh/v5/src/content.config.ts`. Add the following after the `knowledgeSeries` definition, before `export const collections`:

```ts
const yogaSessions = defineCollection({
  loader: glob({ pattern: "**/[^_]*.json", base: "./src/data/yoga-sessions" }),
  schema: z.object({
    title: z.string(),
    style: z.enum(["Hatha", "Pranayama", "Vinyasa", "Ashtanga", "Yin", "Kundalini", "Restorative", "Mixed", "Other"]),
    level: z.enum(["Beginner", "Intermediate", "Advanced", "All Levels"]),
    location_type: z.enum(["Online", "In-person", "Hybrid"]),
    venue: z.string().optional().nullable(),
    schedule: z.string(),
    duration: z.string(),
    start_date: z.coerce.date(),
    end_date: z.coerce.date().optional().nullable(),
    description: z.string(),
    practices: z.array(z.string()),
    instructors: z.array(z.string()).optional().nullable(),
    join_url: z.string().optional().nullable(),
  }),
});
```

- [ ] **Step 2: Export the collection**

Update `export const collections` to include `yogaSessions`:

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
  yogaSessions,
};
```

- [ ] **Step 3: Type-check**

```bash
cd /Users/sukhpreetsingh/github.com/personal-work/sukhpreet_singh/v5 && npx astro check
```

Expected: 0 errors, 0 warnings.

---

### Task 3: Create seed data file

**Files:**
- Create: `src/data/yoga-sessions/morning-hatha.json`

- [ ] **Step 1: Create the directory and seed file**

Create `/Users/sukhpreetsingh/github.com/personal-work/sukhpreet_singh/v5/src/data/yoga-sessions/morning-hatha.json` with:

```json
{
  "title": "Morning Hatha Flow",
  "style": "Hatha",
  "level": "All Levels",
  "location_type": "Online",
  "venue": null,
  "schedule": "Daily · 6:00 AM IST",
  "duration": "60 min",
  "start_date": "2026-06-01",
  "end_date": null,
  "description": "A grounding morning practice focusing on foundational asanas, breath awareness, and gentle flows to energize the body and calm the mind.",
  "practices": ["Asanas", "Pranayama", "Meditation"],
  "instructors": null,
  "join_url": null
}
```

- [ ] **Step 2: Type-check**

```bash
cd /Users/sukhpreetsingh/github.com/personal-work/sukhpreet_singh/v5 && npx astro check
```

Expected: 0 errors, 0 warnings.

---

### Task 4: Add Yoga Sessions section to `yoga-meditation.astro`

**Files:**
- Modify: `src/pages/yoga-meditation.astro`

- [ ] **Step 1: Read the file**

Read `/Users/sukhpreetsingh/github.com/personal-work/sukhpreet_singh/v5/src/pages/yoga-meditation.astro` to confirm current state.

- [ ] **Step 2: Add `yogaSessions` query to frontmatter and wire up ordering**

The frontmatter already has a `yogaPriority` placeholder and a `getSectionPriority` helper. Replace both placeholder lines:

```ts
// REMOVE this placeholder line:
const yogaPriority = { order: 99, date: new Date(0) };
```

With the real query + priority:

```ts
const yogaSessionsRaw = await getCollection("yogaSessions");
const yogaSessions = yogaSessionsRaw
  .map((item) => ({
    ...item,
    status: getStatus(item.data.start_date, item.data.end_date ?? null),
  }))
  .sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);

const yogaPriority = getSectionPriority(yogaSessions);
```

`knowledgeFirst` is already computed from `knowledgePriority` and `yogaPriority` — it will automatically reflect real data once `yogaPriority` is real. The container's `flex-col` / `flex-col-reverse` class switches automatically.

- [ ] **Step 3: Insert Yoga Sessions section inside the flex ordering container**

The template already has a flex container with a placeholder comment marking where yoga sessions go:

```html
<!-- yoga-sessions section goes here (order: yogaCSSOrder) — added by yoga-sessions plan Task 4 -->
```

Replace that comment with the following block (no wrapper needed — section order is controlled by `flex-col` / `flex-col-reverse` on the parent container):

```astro
<div
  id="yoga-sessions-container"
  class="mt-12 flex z-10 flex-col items-center w-full p-2"
>
  <h2
    id="yoga-sessions-heading"
    class="text-4xl font-bold dark:text-slate-100 text-blue-700 font-cursive [text-shadow:0px_2px_4px_#008FFF44,0px_2px_8px_#fffa] dark:[text-shadow:0px_2px_4px_#fff1,0px_0px_8px_#fff2]"
  >
    Yoga Sessions
  </h2>
  <ul class="flex flex-col items-center gap-y-6 mt-8 max-w-xl w-full">
    {yogaSessions.map(({ data: session, status }) => (
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
              <span>{session.style}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor"><circle cx="12" cy="12" r="10" /></svg>
              <span>{session.level}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor"><circle cx="12" cy="12" r="10" /></svg>
              <span>{session.location_type}{session.venue ? ` · ${session.venue}` : ""}</span>
            </span>
            <span class="text-slate-600 text-sm dark:text-blue-300 inline-flex items-center font-medium gap-x-2">
              <span>{session.schedule}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor"><circle cx="12" cy="12" r="10" /></svg>
              <span>{session.duration}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor"><circle cx="12" cy="12" r="10" /></svg>
              <span>
                {formatDate(session.start_date)}
                {session.end_date ? ` — ${formatDate(session.end_date)}` : ""}
              </span>
            </span>
            {session.instructors && session.instructors.length > 0 && (
              <span class="text-slate-500 text-sm dark:text-slate-400 font-medium">
                with {session.instructors.join(", ")}
              </span>
            )}
          </div>
        </div>
        <p class="text-slate-600 mt-2 dark:text-slate-300 font-medium">{session.description}</p>
        {session.practices.length > 0 && (
          <div class="flex flex-wrap gap-2 mt-3">
            {session.practices.map((practice) => (
              <span class="text-xs px-2 py-0.5 rounded-full border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400">
                {practice}
              </span>
            ))}
          </div>
        )}
        {session.join_url && status !== "Completed" && (() => {
          const platform = getJoinPlatform(session.join_url);
          return (
            <div class="flex flex-wrap w-full dark:text-white text-slate-700 gap-3 items-center mt-4">
              <a
                href={session.join_url}
                target="_blank"
                class="inline-flex gap-x-1.5 items-center hover:underline decoration-wavy underline-offset-4
                tab-highlight-none box-border whitespace-nowrap
                rounded-full px-1
                ring-offset-2 focus:outline-hidden
                focus:ring-2 focus:ring-slate-200
                dark:ring-offset-slate-900
                dark:focus:ring-slate-200"
              >
                {platform === "whatsapp" && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4 text-green-500">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                )}
                {platform === "meet" && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4 text-green-600">
                    <path d="M15 8v8H5V8h10m1-2H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4V7a1 1 0 0 0-1-1z"/>
                  </svg>
                )}
                {platform === "zoom" && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4 text-blue-500">
                    <path d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM9.57 7.849H5.53c-.798 0-1.33.546-1.33 1.33v5.116l.006.07c.063.735.613 1.26 1.324 1.26h4.04c.798 0 1.33-.546 1.33-1.33V9.178c0-.784-.532-1.33-1.33-1.33zm6.348.176L13.5 9.93v4.14l2.418 1.905c.64.48 1.582.025 1.582-.784v-6.36c0-.81-.942-1.264-1.582-.806z"/>
                  </svg>
                )}
                {platform === "link" && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                    <path fill-rule="evenodd" d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z" /><path fill-rule="evenodd" d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z" clip-rule="evenodd" />
                  </svg>
                )}
                <span>Join</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                  <path fill-rule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clip-rule="evenodd" />
                </svg>
              </a>
            </div>
          );
        })()}
      </li>
    ))}
  </ul>
</div>
<script>
  import { inView } from "motion";
  import { annotate } from "rough-notation";
  const e = document.querySelector("#yoga-sessions-heading") as HTMLElement;
  inView("#yoga-sessions-container", () => {
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

- [ ] **Step 4: Type-check**

```bash
cd /Users/sukhpreetsingh/github.com/personal-work/sukhpreet_singh/v5 && npx astro check
```

Expected: 0 errors, 0 warnings.

- [ ] **Step 5: Verify visually in dev server**

```bash
npm run dev
```

Open `http://localhost:4321/yoga-meditation` and verify:
- Yoga Sessions renders with `● Upcoming` pill in amber (start_date 2026-06-01 is in the future, Ashtavakra Gita is Ongoing)
- **Section order:** Yoga Sessions appears BELOW Knowledge Series (Knowledge Series is Ongoing = order 1, Yoga Sessions is Upcoming = order 2)
- Meta row 1 shows: `Hatha · All Levels · Online`
- Meta row 2 shows: `Daily · 6:00 AM IST · 60 min · June 2026`
- Practice chips render: Asanas, Pranayama, Meditation
- No Join link (join_url is null in seed)
- No instructors line (instructors is null in seed)
- Rough-notation underline animates on scroll on both section headings
- Certificates section still renders correctly below both sections
- To test ordering inversion: temporarily set `start_date` in `2026-ashtavakra-gita.json` to a past date and set `end_date` to yesterday — Knowledge Series should move below Yoga Sessions

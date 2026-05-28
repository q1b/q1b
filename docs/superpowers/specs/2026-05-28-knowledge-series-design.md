# Knowledge Series Section — Design Spec

**Date:** 2026-05-28  
**Status:** Approved

## Goal

Make the knowledge series section on `yoga-meditation.astro` data-driven, consistent with the projects and work-experience sections in style, and display a status indicator (Ongoing / Upcoming / Completed) per session.

## Out of scope

- Image / photo upload (deferred — keep minimal)
- Dedicated knowledge series detail page

## Data layer

### 1. `keystatic.config.ts` — add `end_date` field

Add an optional `end_date` (`fields.date`) to the existing `knowledge-series` collection schema. No other changes to the Keystatic config.

### 2. `src/content.config.ts` — register collection

Add a `knowledgeSeries` collection using the glob loader pointing to `src/data/knowledge-series/*.json`:

```ts
schema: z.object({
  title: z.string(),
  start_date: z.coerce.date(),
  end_date: z.coerce.date().optional().nullable(),
  description: z.string(),
  topics: z.array(z.string()),
  join_url: z.string().optional().nullable(),
})
```

Export it from `collections`.

### 3. `src/data/knowledge-series/2026-ashtavakra-gita.json`

Add `"end_date": null` to make the entry schema-valid.

## Status logic

Computed at build time from `start_date`, `end_date`, and `today` (the build date):

| Condition | Status |
|-----------|--------|
| `start_date > today` | `Upcoming` |
| `start_date <= today` and `end_date` is null/absent | `Ongoing` |
| `end_date < today` | `Completed` |

**Sort order:** Ongoing first, then Upcoming, then Completed.

## Card layout (no image)

Matches work-experience card style exactly:

```
Title                              [● Ongoing]
Start date — end date · duration?
Description text (full, no truncation)
[topic chip] [topic chip]
↗ Join  (hidden when Completed)
```

- Status pill: inline-flex with a colored dot (`●`) — green for Ongoing, amber for Upcoming, slate/muted for Completed (no dot)
- Topics: `text-xs` chips with `rounded-full border` — same family as the existing tech/employment badges
- Join link: only rendered when `join_url` is set and status is not `Completed`
- rough-notation underline on the section heading, same as Projects and Work Experience (inView triggered)

## Files changed

| File | Change |
|------|--------|
| `keystatic.config.ts` | Add `end_date` optional date field to `knowledge-series` collection |
| `src/content.config.ts` | Register `knowledgeSeries` collection |
| `src/data/knowledge-series/2026-ashtavakra-gita.json` | Add `end_date: null` |
| `src/pages/yoga-meditation.astro` | Replace hardcoded card with dynamic `getCollection` loop; add status logic and card markup |

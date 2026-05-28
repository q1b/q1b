# Yoga Sessions Section — Design Spec

**Date:** 2026-05-28  
**Status:** Approved

## Goal

Add a dedicated Yoga Sessions section to `yoga-meditation.astro` — a data-driven list of yoga classes with rich metadata (style, level, location, schedule, duration, practices) and the same status pill + sort logic used by the Knowledge Series section.

## Out of scope

- Image/photo per session
- Registration or RSVP flow
- Separate page for yoga sessions

## Schema

Collection name: `yogaSessions`  
Data directory: `src/data/yoga-sessions/`  
Format: JSON, one file per session

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | ✓ | e.g. "Morning Hatha Flow" |
| `style` | enum | ✓ | `Hatha \| Pranayama \| Vinyasa \| Ashtanga \| Yin \| Kundalini \| Restorative \| Mixed \| Other` |
| `level` | enum | ✓ | `Beginner \| Intermediate \| Advanced \| All Levels` |
| `location_type` | enum | ✓ | `Online \| In-person \| Hybrid` |
| `venue` | string | ✗ | Physical location — shown when location_type is In-person or Hybrid |
| `schedule` | string | ✓ | Free text e.g. "Daily · 6:00 AM IST" |
| `duration` | string | ✓ | e.g. "60 min" |
| `start_date` | date | ✓ | ISO date string |
| `end_date` | date | ✗ | null = still running |
| `description` | string | ✓ | |
| `practices` | string[] | ✓ | e.g. Asanas, Pranayama, Meditation, Chanting, Yoga Nidra |
| `instructors` | string[] | ✗ | Optional co-teachers; omit when solo |
| `join_url` | string | ✗ | WhatsApp / Meet / Zoom link |

## Status logic

Reuses `getStatus` already defined in `yoga-meditation.astro`:

| Condition | Status |
|-----------|--------|
| `start_date > today` | `Upcoming` |
| `start_date <= today` and `end_date` is null/absent | `Ongoing` |
| `end_date < today` | `Completed` |

Sort order: Ongoing(0) → Upcoming(1) → Completed(2)

## Card layout

```
Title                                    [● Ongoing]
Hatha · All Levels · Online · Venue?     Jan 2026 —
Daily · 6:00 AM IST · 60 min
with Instructor A, B  (only if instructors[] is set)
Description text
[Asanas] [Pranayama] [Meditation]
↗ Join  (platform icon — hidden when Completed or no join_url)
```

- Meta row 1: `style · level · location_type` (+ venue if set) — `text-sm dark:text-blue-300`
- Meta row 2: `schedule · duration` — same style
- Instructors line: muted `text-sm` only when `instructors.length > 0`
- `practices[]` chips: `text-xs px-2 py-0.5 rounded-full border` — same as knowledge series topics
- Join link: reuses `getJoinPlatform` helper already in the file
- Status pill: green Ongoing, amber Upcoming, slate Completed — same as knowledge series

## Page placement

On `yoga-meditation.astro`:
1. Knowledge Series (existing)
2. **Yoga Sessions** ← new section inserted here
3. Certificates (existing)

Section heading "Yoga Sessions" with rough-notation underline animation on scroll — identical pattern to existing sections.

## Seed data

Create `src/data/yoga-sessions/morning-hatha.json` as the first entry.

## Files changed

| File | Change |
|------|--------|
| `keystatic.config.ts` | Add `yoga-sessions` collection with full schema |
| `src/content.config.ts` | Register `yogaSessions` collection |
| `src/data/yoga-sessions/morning-hatha.json` | Seed entry |
| `src/pages/yoga-meditation.astro` | Add Yoga Sessions section; reuse existing `getStatus`, `getJoinPlatform`, `formatDate` helpers |

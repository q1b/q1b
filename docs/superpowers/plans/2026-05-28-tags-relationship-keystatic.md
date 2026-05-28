# Tags Relationship in Keystatic Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the free-text tags array with a `fields.relationship` picker in the `videos`, `photos`, and `articles` Keystatic collections so the CMS links to the actual `tags` collection.

**Architecture:** Single file change in `keystatic.config.ts`. The `tags` field in each of the three collections is swapped from `fields.text` inside the array to `fields.relationship({ collection: 'tags' })`. Stored JSON format stays identical (array of tag slugs), so no data migration is needed.

**Tech Stack:** Keystatic Core (`@keystatic/core`) — `fields.relationship`, `fields.array`

---

### Task 1: Update `videos` tags field

**Files:**
- Modify: `keystatic.config.ts` (the `videos` collection schema, around line 149)

- [ ] **Step 1: Open the file and locate the videos tags field**

In `keystatic.config.ts`, find the `videos` collection (around line 140). The current tags field looks like:

```ts
tags: fields.array(
  fields.text({ label: 'Tag' }),
  { label: 'Tags', itemLabel: (props) => props.value }
),
```

- [ ] **Step 2: Replace with relationship field**

Change it to:

```ts
tags: fields.array(
  fields.relationship({ label: 'Tag', collection: 'tags' }),
  { label: 'Tags', itemLabel: (props) => props.value ?? 'Tag' }
),
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx astro check
```

Expected: no errors related to `keystatic.config.ts`. (Astro check covers `.astro` files; if it surfaces TS errors in config, fix them.)

- [ ] **Step 4: Commit**

```bash
git add keystatic.config.ts
git commit -m "feat: connect videos tags to tags collection in keystatic"
```

---

### Task 2: Update `photos` tags field

**Files:**
- Modify: `keystatic.config.ts` (the `photos` collection schema, around line 174)

- [ ] **Step 1: Locate the photos tags field**

Find the `photos` collection (around line 165). Current tags field:

```ts
tags: fields.array(
  fields.text({ label: 'Tag' }),
  { label: 'Tags', itemLabel: (props) => props.value }
),
```

- [ ] **Step 2: Replace with relationship field**

```ts
tags: fields.array(
  fields.relationship({ label: 'Tag', collection: 'tags' }),
  { label: 'Tags', itemLabel: (props) => props.value ?? 'Tag' }
),
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx astro check
```

Expected: no new errors.

- [ ] **Step 4: Commit**

```bash
git add keystatic.config.ts
git commit -m "feat: connect photos tags to tags collection in keystatic"
```

---

### Task 3: Update `articles` tags field

**Files:**
- Modify: `keystatic.config.ts` (the `articles` collection schema, around line 85)

- [ ] **Step 1: Locate the articles tags field**

Find the `articles` collection (around line 69). Current tags field:

```ts
tags: fields.array(
  fields.text({ label: 'Tag' }),
  { label: 'Tags', itemLabel: (props) => props.value }
),
```

- [ ] **Step 2: Replace with relationship field**

```ts
tags: fields.array(
  fields.relationship({ label: 'Tag', collection: 'tags' }),
  { label: 'Tags', itemLabel: (props) => props.value ?? 'Tag' }
),
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx astro check
```

Expected: no new errors.

- [ ] **Step 4: Commit**

```bash
git add keystatic.config.ts
git commit -m "feat: connect articles tags to tags collection in keystatic"
```

---

### Task 4: Manual verification in Keystatic UI

**Files:** none

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

- [ ] **Step 2: Open Keystatic admin**

Navigate to `http://localhost:4321/keystatic` in your browser.

- [ ] **Step 3: Edit a video entry**

Open any entry under Videos (e.g. `todo-program-written-in-svelte-5`). Confirm the Tags field now shows a relationship picker — clicking "Add Tag" should open a search/browse UI showing entries from the tags collection (`astro`, `svelte`).

- [ ] **Step 4: Edit a photo entry and an article entry**

Repeat the same check for one Photos entry and one Articles entry to confirm all three collections updated correctly.

- [ ] **Step 5: Confirm existing tag data still loads**

Open an entry that already has tags saved (e.g. the video with `"tags": ["svelte"]`). Confirm the existing `svelte` tag appears pre-populated in the relationship list without errors.

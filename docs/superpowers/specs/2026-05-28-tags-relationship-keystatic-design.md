# Tags Relationship in Keystatic

**Date:** 2026-05-28  
**Status:** Approved

## Goal

Connect the `tags` collection to the `videos`, `photos`, and `articles` collections in Keystatic, so that when editing those entries in the CMS the tags field shows a relationship picker browsing the actual tags collection — instead of a free-text array.

## Scope

- `keystatic.config.ts` only — three collections: `videos`, `photos`, `articles`
- `src/content.config.ts` is **not changed** — tags remain `z.array(z.string())`
- No data migration needed — stored format stays as an array of tag slugs (e.g. `["svelte", "astro"]`)

## Change

In each of the three collections, replace:

```ts
tags: fields.array(
  fields.text({ label: 'Tag' }),
  { label: 'Tags', itemLabel: (props) => props.value }
)
```

with:

```ts
tags: fields.array(
  fields.relationship({ label: 'Tag', collection: 'tags' }),
  { label: 'Tags', itemLabel: (props) => props.value ?? 'Tag' }
)
```

## Trade-offs Accepted

- Keystatic's relationship picker does not prevent selecting the same tag twice in the array — accepted.
- No build-time enforcement that tag slugs are valid — accepted (z.string() kept).

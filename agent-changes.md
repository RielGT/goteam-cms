# Agent Changes Log

## 2026-05-23 — Update app/storyblok to Preline

**Mode detected:** Storyblok (`.storyblok/` directory exists)  
**Pipeline:** frontend-implementer → change-summarizer  
**Agent:** frontend-implementer

### Files modified

| File | Change |
|------|--------|
| `app/storyblok/Feature.vue` | Upgraded card to Preline card pattern: structured header with `h3` + optional `description` field, consistent `p-4 md:p-5` padding inner wrapper. |
| `app/storyblok/Grid.vue` | Wrapped grid in Preline container (`max-w-[85rem]` with standard vertical padding), increased gap to `gap-6`. |
| `app/storyblok/Page.vue` | Removed fixed container/padding from `<main>` — spacing now delegated to child blocks (Grid, Teaser) per Preline pattern. |
| `app/storyblok/Teaser.vue` | Upgraded to Preline section heading pattern: responsive font sizes, `mb-10 lg:mb-14` spacing, added optional `blok.subheadline` field render. |

### Assumptions

- `Feature.vue` `blok.description` field assumed to exist optionally in the Storyblok schema; rendered with `v-if` so it degrades gracefully if absent.
- `Teaser.vue` `blok.subheadline` field assumed optional; rendered with `v-if`.
- No Storyblok schema changes needed — only added optional field renders, no new required fields.
- `Page.vue` spacing removed from `<main>` wrapper intentionally; each section block owns its own vertical rhythm per Preline conventions.
- Dark mode classes preserved throughout.
- No icons added to `Feature.vue` — no icon field exists in schema; placeholder not added per no-hardcode rule.

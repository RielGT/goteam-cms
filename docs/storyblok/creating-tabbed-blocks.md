# Creating Tabbed Nestable Blocks (e.g. WebsiteHeader)

This guide documents how to author Storyblok components that organize their
fields into sidebar tabs — the pattern used by `WebsiteHeader` and any future
"composite" block (e.g. `WebsiteFooter`, `HeroSection`, `ProductCard`).

It exists because we hit a subtle bug while building `WebsiteHeader`: the
Visual Editor showed **"This block has no fields, you can define the fields
in Block Library"** even though the schema was fully defined. The fix is
simple but undocumented in most Storyblok tutorials — read on.

---

## TL;DR — The one rule you must not forget

> **Every `tab` field MUST include a `keys` array listing the field names
> that belong to it.** Without `keys`, the Visual Editor cannot bind any
> field to any tab and renders the entire block as empty.

```json
"tab_branding": {
  "type": "tab",
  "pos": 10,
  "display_name": "Branding",
  "keys": ["brand_image", "brand_text", "show_brand_image"],
  "id": "2r-7p9Jw"
}
```

If you only remember one thing from this doc, remember that.

---

## How Storyblok tabs actually work

Internally, a Storyblok component's `schema` is a **flat object** of fields.
Tabs are not containers — they are *grouping metadata* that tell the editor
UI how to partition the flat list visually.

- A `tab` field has no data of its own (it is not returned in story payloads).
- The `keys` array on a tab references **sibling field names** in the same
  schema object.
- Fields not listed in any tab's `keys` appear under a default "General"
  tab above the first declared tab.
- `pos` controls ordering *within* the sidebar (both tabs and fields share
  the same positional space).

A common convention we follow:

| Range      | Purpose                                         |
| ---------- | ----------------------------------------------- |
| `0–9`      | "General" fields (variant selectors, etc.)      |
| `10, 20…`  | Tab field positions (one per tab, multiples of 10) |
| `11–19`    | Fields belonging to the tab at `pos: 10`        |
| `21–29`    | Fields belonging to the tab at `pos: 20`        |
| …          | …                                               |

This makes the schema readable and keeps fields visually grouped with their
tab in `components.json`.

---

## Recipe: creating a new tabbed nestable block

We'll use a hypothetical `WebsiteFooter` as the example.

### 1. Plan the schema on paper first

Sketch the tabs and which fields go in each one **before** writing JSON.
Example:

- **General** — `variant` (option)
- **Branding** — `logo`, `tagline`
- **Navigation** — `link_columns` (bloks → `FooterColumn`)
- **Legal** — `copyright_text`, `legal_links`
- **Theme** — `background_color`, `text_color`

### 2. Create the component

Either via the Storyblok UI (Block Library → New block) or via the
Management API (`createComponent`). When using the API, follow the schema
shape below.

### 3. Author the schema with tabs + `keys`

```json
{
  "name": "WebsiteFooter",
  "display_name": "Website Footer",
  "is_nestable": true,
  "is_root": false,
  "schema": {
    "variant": {
      "type": "option",
      "pos": 0,
      "display_name": "Variant",
      "default_value": "classic",
      "options": [
        { "value": "classic", "name": "Classic" },
        { "value": "minimal", "name": "Minimal" }
      ]
    },

    "tab_branding": {
      "type": "tab",
      "pos": 10,
      "display_name": "Branding",
      "keys": ["logo", "tagline"]
    },
    "logo":    { "type": "asset", "pos": 11, "display_name": "Logo", "filetypes": ["images"] },
    "tagline": { "type": "text",  "pos": 12, "display_name": "Tagline" },

    "tab_navigation": {
      "type": "tab",
      "pos": 20,
      "display_name": "Navigation",
      "keys": ["link_columns"]
    },
    "link_columns": {
      "type": "bloks",
      "pos": 21,
      "display_name": "Link Columns",
      "restrict_components": true,
      "component_whitelist": ["FooterColumn"]
    },

    "tab_legal": {
      "type": "tab",
      "pos": 30,
      "display_name": "Legal",
      "keys": ["copyright_text", "legal_links"]
    },
    "copyright_text": { "type": "text",  "pos": 31, "display_name": "Copyright Text" },
    "legal_links":    { "type": "bloks", "pos": 32, "display_name": "Legal Links",
                        "restrict_components": true,
                        "component_whitelist": ["HeaderNavItem"] }
  }
}
```

### 4. Mirror the schema locally

Copy the exact same JSON object into
`.storyblok/components/<space_id>/components.json` so the local source of
truth stays aligned with the server. Keep the `id`, `created_at`, and
`updated_at` returned by the API.

### 5. Create the Vue renderer

```vue
<!-- app/storyblok/WebsiteFooter.vue -->
<script setup lang="ts">
import type { Footer } from '~/types/website/footer'
defineProps<{ blok: Footer }>()
</script>

<template>
  <footer v-editable="blok">
    <!-- render blok.logo, blok.link_columns, etc. -->
  </footer>
</template>
```

Storyblok's Nuxt module auto-registers components from `app/storyblok/` by
**PascalCase filename matching the component `name`** — so `WebsiteFooter`
component → `WebsiteFooter.vue`.

### 6. Add a TypeScript type (optional but recommended)

Create `types/website/footer.ts` mirroring the schema fields so editors and
contributors get autocompletion in `.vue` files.

### 7. Verify in the Visual Editor

1. Open any story that contains the new block.
2. **Hard-refresh** the editor (`Cmd/Ctrl + Shift + R`) — Storyblok caches
   component schemas aggressively.
3. Click the block. The right sidebar must show:
   - A "General" tab with `variant`.
   - One tab per `tab_*` field, each with the configured fields inside.

If the sidebar shows "This block has no fields" → jump to Troubleshooting.

---

## Field-type cheat sheet (most common)

| `type`       | Use for                                                  |
| ------------ | -------------------------------------------------------- |
| `text`       | Single-line text                                         |
| `textarea`   | Multi-line plain text                                    |
| `richtext`   | Formatted content (JSON, TipTap)                         |
| `boolean`    | Toggle (use `default_value: true/false`)                 |
| `option`     | Single-select dropdown (define `options[]`)              |
| `options`    | Multi-select                                             |
| `asset`      | Single image/video/file (set `filetypes: ["images"]`)    |
| `multiasset` | Multiple assets                                          |
| `multilink`  | Internal/external link picker                            |
| `bloks`      | Nested blocks (use `restrict_components: true` + `component_whitelist`) |
| `tab`        | Sidebar tab — **always pair with `keys`**                |
| `section`    | Collapsible group (alternative to `tab`; also needs `keys`) |

> Note: `section` (the "Group" field) also requires `keys` for the same
> reason as `tab`. Same rule applies.

---

## Troubleshooting

### "This block has no fields, you can define the fields in Block Library"

In order of likelihood:

1. **Missing `keys` on one or more `tab` fields.** This was the original
   `WebsiteHeader` bug. Open the component schema and confirm every
   `tab_*` field has a `keys: [...]` array enumerating its members.
2. **Stale editor cache.** Hard-refresh (`Cmd/Ctrl + Shift + R`). The
   sidebar caches schemas per session.
3. **Schema not yet propagated.** Verify on the server via the Management
   API:
   ```
   GET /v1/spaces/{space_id}/components/{component_id}
   ```
   The returned `schema.tab_*.keys` must include the field names you expect.
4. **Field name typos in `keys`.** Names in `keys` must match the actual
   field keys in the same schema object exactly (case-sensitive).

### A field shows under the wrong tab (or under "General")

- It is not listed in any tab's `keys`. Add it to the correct one.
- It is listed in two tabs at once. Remove the duplicate; behavior is
  undefined.

### Tab order looks wrong

- Tabs render in `pos` ascending order. Adjust `pos` values (we use
  multiples of 10 so there's room to insert later).

### Block doesn't appear in the "Add block" picker of a parent `bloks` field

- The parent's `bloks` field has `restrict_components: true` and the new
  component is not in its `component_whitelist`. Add it.

---

## Why we hit this in the first place

The Storyblok Management API documentation lists `tab` as a valid field
type but does not prominently document the `keys` requirement. When a tab
is created through the **UI**, Storyblok auto-populates `keys` as you drag
fields into it — so most tutorials never mention it. When you author the
schema programmatically (via API, MCP, Terraform, or
`.storyblok/components/*.json`), you have to set `keys` yourself.

Treat this doc as the canonical recipe for any future tabbed block in this
project.

---

## Reference: the working WebsiteHeader fix

For a real-world example of all 7 tabs (`Branding`, `Navigation`, `CTAs`,
`Utility`, `Features`, `Behavior`, `Theme`) with their `keys`, see:

- `.storyblok/components/292587481558987/components.json` → `WebsiteHeader`
- `app/storyblok/WebsiteHeader.vue` (renderer)
- `app/storyblok/website/headers/variants/*` (variant components)

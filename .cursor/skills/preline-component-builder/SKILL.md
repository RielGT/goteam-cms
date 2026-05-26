---
name: preline-component-builder
description: Build a new Vue 3 component for the goteam-cms portfolio using Tailwind CSS v4 and Preline UI, placed in the correct app/components/web/<domain>/ folder with brand-token styling. Use when the user asks to add, create, or scaffold a new web component, section, hero, card, form, modal, dropdown, accordion, carousel, or other UI block.
---

# Preline Component Builder

Scaffold a production-ready Vue component for `app/components/web/**` that uses Tailwind v4 brand tokens and (when interactive) Preline UI primitives.

## Workflow

Copy this checklist and track progress:

```
- [ ] Step 1: Confirm or request a designer spec
- [ ] Step 2: Pick the correct domain folder
- [ ] Step 3: Reuse existing primitives where possible
- [ ] Step 4: Decide if Preline is needed
- [ ] Step 5: Define props and shared types
- [ ] Step 6: Implement the component
- [ ] Step 7: Verify against the Definition of Done
```

### Step 1: Confirm spec

The component should originate from a brief that includes: intent, layout, color/typography tokens, copy draft, accessibility constraints, and acceptance criteria. If missing, ask the user or route to the **UI/UX and Branding Designer** agent first.

### Step 2: Pick the domain folder

Existing domains (`app/components/web/`):

`hero/ · layout/ · linkedin/ · misc/ · process/ · social/ · tech/ · ui/ · work/`

- Atomic primitive reused 3+ times → `ui/`
- Composite for one product area → matching domain folder
- Need a new domain? Create the folder (PascalCase components, kebab-case folder).

### Step 3: Reuse primitives

Before writing new markup, check `app/components/web/ui/` for `Avatar`, `Badge`, `Cta`, `SectionHeader`, `Stat`. They are auto-imported as `<WebUiBadge />`, `<WebUiCta />`, etc.

### Step 4: Preline decision

| Behavior | Use |
|---|---|
| Static content, no JS state | Plain Vue + Tailwind |
| Show/hide with focus trap | Preline `hs-overlay` (modal) |
| Toggleable menu | Preline `hs-dropdown` |
| Swipeable / sliding panels | Preline `hs-carousel` |
| Tabs | Preline `hs-tab` |
| Tooltip on hover/focus | Preline `hs-tooltip` |
| FAQ-style expand | Native `<details>` (per brand guide §11) |

If Preline is needed and the plugin isn't yet wired, add `app/plugins/preline.client.ts`:

```ts
import "preline/preline";

export default defineNuxtPlugin(() => {});
```

### Step 5: Props and types

- Define props with `defineProps<{...}>()` + `withDefaults`.
- If a prop shape is shared across components, add it to `app/components/web/types.ts`.
- Never hardcode copy or links — accept everything via props (Storyblok will bind later).

### Step 6: Implement

Use this skeleton as a starting point:

```vue
<script setup lang="ts">
import type { Cta, BadgeContent } from "../types";

withDefaults(
  defineProps<{
    eyebrow: string;
    title: string;
    description?: string;
    badge?: BadgeContent;
    ctas?: Cta[];
  }>(),
  {},
);
</script>

<template>
  <section class="relative max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
    <WebUiBadge v-if="badge" v-bind="badge" />
    <p class="font-mono text-xs text-brand-purple mb-3 mt-6">/ {{ eyebrow }}</p>
    <h2 class="font-display text-4xl sm:text-5xl font-bold leading-tight">
      {{ title }}
    </h2>
    <p
      v-if="description"
      class="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed"
    >
      {{ description }}
    </p>
    <div v-if="ctas?.length" class="mt-9 flex flex-wrap items-center gap-4">
      <WebUiCta v-for="c in ctas" :key="c.href" v-bind="c" />
    </div>
  </section>
</template>
```

Brand-token reminders while writing markup:

- Colors: `brand-purple`, `brand-green`, `brand-orange`, `paper`, `ink`, `zinc-*` — no arbitrary hex
- Fonts: `font-display` (headings), `font-mono` (eyebrows/labels), default Inter elsewhere
- Buttons: `rounded-full` only; pair primary + ghost
- Inputs: `rounded-xl`; focus `border-brand-purple ring-2 ring-brand-purple/20`
- Always specify `dark:` variants and `sm:`/`lg:` breakpoints

### Step 7: Definition of Done

- [ ] File saved at `app/components/web/<domain>/<ComponentName>.vue`
- [ ] `<script setup lang="ts">` with typed props
- [ ] Shared types added to `types.ts` if reused
- [ ] Light + dark mode styled
- [ ] Mobile + desktop styled
- [ ] No arbitrary hex / spacing / font values
- [ ] Preline initialized via plugin (if used)
- [ ] Accessibility: semantic HTML, focus rings, contrast verified
- [ ] Zero ESLint errors (`npm run lint` clean for the file)
- [ ] Acceptance criteria from the spec all check out

## Common Pitfalls

- ❌ Putting an interactive component in `misc/` — pick a real domain.
- ❌ Using Preline's default theme classes alongside brand tokens — restyle fully.
- ❌ Forgetting the `dark:` variant on background, border, or text.
- ❌ Hardcoding copy strings — accept via props.
- ❌ Mixing UI frameworks (Headless UI, Radix, Nuxt UI) with Preline.

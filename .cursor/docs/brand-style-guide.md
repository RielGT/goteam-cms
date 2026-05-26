# Brand Style Guide

> **Project:** `goteam-cms` — Freelance developer portfolio (`alex.dev`)
> **Stack:** Nuxt 4 · Tailwind CSS v4 · Preline UI · Storyblok CMS
> **Source of truth:** `app/pages/index.html` (HTML mockup), `app/assets/css/landing.css`, `app/assets/css/main.css`, `nuxt.config.ts`
> **Status:** Living document — reverse‑engineered from the landing mockup and intended to scale into a full design system.

Values labelled **Explicitly Found** are present in the source. Values labelled **Recommended** are inferred/extrapolated to fill gaps and ensure long‑term consistency.

---

## 1. Brand Overview

`alex.dev` is the personal portfolio of a freelance full‑stack developer. The brand sells one thing very confidently: **shipping**. Everything in the visual language — the squiggle underline, the pulsing "available" dot, the mono‑font code stickers, the hand‑drawn arrow — reinforces a single message: *a senior independent developer who is creative, low‑process, and ships on time.*

**Brand archetype:** *The Maker* (with a dash of *The Sage*).
**Brand promise:** Honest, opinionated, ships fast.
**Audience:** Early‑stage founders, bootstrappers, small product teams.

---

## 2. Brand Personality & Visual Tone

| Trait | Expression in UI |
|---|---|
| Honest & direct | Plain copy, no marketing fluff, mono captions like `/ recent work` |
| Creative / hand‑made | Squiggle underline, hand‑drawn SVG arrow, rotated stickers, "coffee #3" badges |
| Technical / craft‑y | `JetBrains Mono` accents, code window mockup, `→` ASCII arrows |
| Calm & confident | Warm off‑white "paper" background, generous whitespace, soft shadows |
| Alive | Pulsing green dot, marquee tech stack, scroll reveals, hover lifts |

**Tone of voice:** Conversational, lowercase, slightly self‑deprecating. UI copy uses contractions and em‑dashes.

**Visual tone words:** *editorial*, *crafted*, *warm*, *technical*, *quietly playful*.

---

## 3. Color Palette

### 3.1 Brand colors — **Explicitly Found**

| Token | Hex | Tailwind class | Role |
|---|---|---|---|
| `brand.purple` | `#8B5CF6` | `bg-brand-purple` / `text-brand-purple` | **Primary**. CTAs, links, active states, accent text, focus ring. |
| `brand.green` | `#10B981` | `bg-brand-green` / `text-brand-green` | **Success / availability**. Status pills, pulse dot, "shipped" badges. |
| `brand.orange` | `#FB923C` | `bg-brand-orange` / `text-brand-orange` | **Accent / warmth**. Floating sticker, "problem" labels, third‑rotation metric color. |

### 3.2 Surface & ink — **Explicitly Found**

| Token | Hex | Role |
|---|---|---|
| `paper` | `#FEFCFB` | Page background (light mode). Warm off‑white, not pure `#fff`. |
| `ink` | `#0D0B1E` | Body text + page background (dark mode). Deep near‑black with violet undertone. |
| `white` | `#FFFFFF` | Card / panel surface in light mode. |
| `zinc-900` | `#18181B` | Card / panel surface in dark mode. |
| `zinc-950` | `#09090B` | Code‑window header surface in dark mode. |

### 3.3 Neutral palette — **Explicitly Found** (Tailwind `zinc`)

| Use | Light mode | Dark mode |
|---|---|---|
| Heading / strongest text | `text-ink` | `text-zinc-100` (via body default) / `text-white` |
| Body / secondary text | `text-zinc-600` | `text-zinc-400` |
| Tertiary / muted text | `text-zinc-500` | `text-zinc-500` |
| Disabled / ghost text | `text-zinc-400` | `text-zinc-600` |
| Hard border | `border-zinc-200` | `border-white/10` |
| Soft border / divider | `border-zinc-200/60–/70` | `border-white/5` |
| Subtle surface tint | `bg-white/40` | `bg-white/[0.02]` |
| Chip / tag surface | `bg-zinc-100` | `bg-white/5` |

### 3.4 Semantic colors — **Recommended** (gaps in source)

The mockup only ships success (`brand.green`). For a complete system, adopt:

| Token | Hex | Notes |
|---|---|---|
| `--color-success` | `#10B981` | = `brand.green` (Explicit) |
| `--color-warning` | `#F59E0B` | Tailwind `amber-500`. Reserve for non‑destructive caution. |
| `--color-danger`  | `#EF4444` | Tailwind `red-500`. Form errors, destructive confirmations. |
| `--color-info`    | `#3B82F6` | Tailwind `blue-500`. Neutral informational messaging. |

The traffic‑light dots in the code‑window mockup (`bg-red-400`, `bg-yellow-400`, `bg-green-400`) are **decorative only** — do not use them as semantic tokens.

### 3.5 State colors

| State | Treatment | Source |
|---|---|---|
| Hover (primary button) | `bg-ink` (light) / `bg-white text-ink` (dark) + `-translate-y-0.5` | Explicit |
| Hover (ghost link) | `text-brand-purple` | Explicit |
| Hover (icon button / card) | `border-brand-purple` + `text-brand-purple` | Explicit |
| Focus (input) | `border-brand-purple` + `ring-2 ring-brand-purple/20` | Explicit |
| Active (carousel dot / nav link) | `bg-brand-purple`, width expands `8 → 28px` | Explicit |
| Disabled | `opacity-40` + `cursor-not-allowed` | Explicit |
| Selection | `::selection { background:#8B5CF6; color:#fff }` | Explicit |

### 3.6 Opacity & tint patterns — **Explicitly Found**

Recurring alpha tokens used throughout the mockup:

- Brand soft tint: `brand-purple/5`, `brand-purple/10`, `brand-purple/20`, `brand-green/10`, `brand-green/15`, `brand-green/20`, `brand-green/30`
- Glass surfaces: `bg-paper/70`, `bg-ink/70`, `bg-paper/95`, `bg-ink/95` (always with `backdrop-blur`)
- Dark mode whites: `bg-white/[0.02]`, `bg-white/5`, `border-white/5`, `border-white/10`

> **Convention:** When applying a brand color as a *background tint*, prefer the `/5` → `/10` → `/20` scale. When applying it as a *border tint*, prefer `/20` → `/30`.

### 3.7 Gradients — **Explicitly Found**

| Use | Definition |
|---|---|
| Hero photo wash | `bg-gradient-to-br from-brand-purple/20 via-brand-green/10 to-brand-orange/20` |
| Progress bar | `bg-gradient-to-r from-brand-purple to-brand-green` |
| Case‑study step rail | `linear-gradient(to bottom, #8B5CF6 0%, rgba(139,92,246,0.1) 100%)` |
| Marquee fade mask | `linear-gradient(to right, transparent, black 8%, black 92%, transparent)` |

Gradients are **decorative and supportive** — never used on body text or as primary CTA fills.

### 3.8 Accessibility notes

| Pair | Approx contrast | Verdict |
|---|---|---|
| `brand-purple #8B5CF6` on `white` | ~3.5:1 | ⚠️ Passes UI only (3:1), **fails WCAG AA body text**. Use only for large text (≥18.66px bold / 24px regular), icons, and decorative elements. For body links on light backgrounds prefer `text-ink` with `border-current` underline, or darken to `#7C3AED` (`violet-600`) if purple text is required. |
| `brand-green #10B981` on `white` | ~2.5:1 | ⚠️ Decorative use only. **Do not use for body text.** OK for filled badges with white text. |
| `brand-orange #FB923C` on `white` | ~2.4:1 | ⚠️ Decorative only — same rule. |
| `ink #0D0B1E` on `paper #FEFCFB` | ~18:1 | ✅ AAA |
| `zinc-600` on `paper` | ~7:1 | ✅ AAA |
| `zinc-400` on `ink` | ~6:1 | ✅ AA |
| White on `brand-purple` | ~4.7:1 | ✅ AA |

> **Flagged inconsistency:** `text-brand-purple` and `text-brand-green` are currently used for small mono captions (`/ recent work`, `01 — SaaS Dashboard`). These are below AA. **Recommendation:** keep the color, but always render at ≥12px **bold mono** *and* on a high‑contrast neutral background, or shift to `violet-700` / `emerald-700` for small body text.

---

## 4. Typography System

### 4.1 Font families — **Explicitly Found**

| Token | Stack | Purpose |
|---|---|---|
| `--font-display` | `"Space Grotesk", system-ui, sans-serif` (weights 400/500/600/700, `letter-spacing: -0.02em`) | All headings, hero numbers, project titles |
| `--font-sans` (body) | `"Inter", system-ui, sans-serif` (weights 400/500/600) | Body, paragraphs, buttons, nav |
| `--font-mono` | `"JetBrains Mono", monospace` (weights 400/500) | Captions (`/ section`), step numbers, tech tags, code snippets, badges |

Fonts are loaded via Google Fonts with `preconnect` and `display=swap` from `nuxt.config.ts`.

### 4.2 Type scale — **Explicitly Found** (Tailwind defaults in use)

| Token | Tailwind | Computed | Use |
|---|---|---|---|
| `--text-xs` | `text-xs` | 12 / 16 | Mono captions, micro labels, tech tags |
| `--text-sm` | `text-sm` | 14 / 20 | Body small, links, list items, button labels |
| `--text-md` (`base`) | `text-base` | 16 / 24 | Default body |
| `--text-lg` | `text-lg` | 18 / 28 | Lead paragraph, FAQ question |
| `--text-xl` | `text-xl` | 20 / 28 | Larger lead, FAQ question (sm:) |
| `--text-2xl` | `text-2xl` | 24 / 32 | "Hook" prose start, small section headings |
| `--text-3xl` | `text-3xl` | 30 / 36 | Project titles, metric numbers |
| `--text-4xl` | `text-4xl` | 36 / 40 | Section h2 (mobile) |
| `--text-5xl` | `text-5xl` | 48 / 1 | Hero h1 (mobile), section h2 (sm:) |
| `--text-6xl` | `text-6xl` | 60 / 1 | Hero h1 (sm:) |
| `--text-7xl` | `text-7xl` | 72 / 1 | Hero h1 (lg:) |
| micro | `text-[10px]` / `text-[11px]` | — | Badge / step‑dot labels (used sparingly) |

### 4.3 Heading hierarchy — **Explicitly Found**

| Level | Class recipe | Example |
|---|---|---|
| **H1 hero** | `font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02]` | "I build web apps that actually ship…" |
| **H2 section** | `font-display text-4xl sm:text-5xl font-bold` (`leading-tight` when long) | "Stuff I've shipped lately." |
| **H3 card** | `font-display text-3xl font-bold` (project) / `text-2xl font-bold` (case study) | "Finch Analytics" |
| **H4 step** | `font-semibold text-sm` | "Scope the smallest thing that works" |
| **Eyebrow / caption** | `font-mono text-xs text-brand-purple mb-3` (color rotates: purple → green → orange) | `/ recent work` |
| **Lead paragraph** | `text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed` | Hero subhead |
| **Body** | `text-zinc-600 dark:text-zinc-400 leading-relaxed` | Card descriptions |
| **Body small** | `text-sm ... leading-relaxed` | Step descriptions, FAQ answers |
| **Mono label** | `block text-xs font-mono text-zinc-500 mb-2` | Form labels |

### 4.4 Weights, line‑height, tracking

| Property | Values in use |
|---|---|
| Font weights | `400` (body), `500` (button / nav link), `600` (semibold for step titles), `700` (display bold) |
| Line heights | `leading-[1.02]` hero, `leading-tight` long H2, `leading-snug` quote, `leading-relaxed` (~1.625) body, default `1.5` |
| Letter spacing | `-0.02em` global on `.font-display`; default elsewhere; mono uppercase eyebrows keep default tracking |
| Text transform | Never `uppercase`. Captions stay lowercase and use a leading `/`. |

### 4.5 Typography rules

- **Display font** → headings & key numbers **only**. Never body.
- **Mono** → never paragraphs. Reserve for: section eyebrows (`/ word`), tech tags, code, micro‑status pills, step numerals, form labels.
- **Body** uses Inter at 400/500. Bold body weight is `font-semibold` (600), not `font-bold`.
- **Brand-color text** is always either: an eyebrow, an inline emphasis span, or a metric number. Never a paragraph.

> **Flagged:** The mockup uses ~4 type families when counting decorative SVGs. Keep to exactly 3 (Display / Sans / Mono).

---

## 5. Spacing & Layout System

### 5.1 Container — **Explicitly Found**

The site uses three container widths:

| Context | Class |
|---|---|
| Default page container | `max-w-6xl mx-auto px-5 sm:px-8` (1152px) |
| Long‑form sections (FAQ, hook) | `max-w-4xl mx-auto px-5 sm:px-8` (896px) |
| CTA section | `max-w-5xl mx-auto px-5 sm:px-8` (1024px) |

Horizontal padding always steps `px-5` → `sm:px-8` (20px → 32px). Standardize on these three widths going forward.

### 5.2 Vertical rhythm — **Explicitly Found**

| Context | Padding |
|---|---|
| Major section | `py-24 sm:py-32` (96/128px) |
| Banner / hook | `py-20 sm:py-28` |
| Hero | `pt-16 sm:pt-24 pb-20` |
| Tech marquee strip | `py-10` |
| Footer | `py-14` |
| Card interior | `p-6 sm:p-10` (case study), `p-7 sm:p-9` (form), `p-4`–`p-5` (metric tile, callout) |
| Nav height | `h-16` (64px) |

### 5.3 Spacing scale — **Explicitly Found** (Tailwind default rem scale)

Recurring tokens, mapped to CSS variables:

| Token | rem / px | Tailwind | Use |
|---|---|---|---|
| `--space-3xs` | 0.25 / 4  | `1`    | Pulse dot |
| `--space-2xs` | 0.375 / 6 | `1.5`  | Tag inner |
| `--space-xs`  | 0.5 / 8   | `2`    | Inline gaps |
| `--space-sm`  | 0.75 / 12 | `3`    | Icon ↔ label gap |
| `--space-md`  | 1 / 16    | `4`    | Tight stack |
| `--space-lg`  | 1.5 / 24  | `6`    | Default stack between elements |
| `--space-xl`  | 2 / 32    | `8`    | Card padding / column gap |
| `--space-2xl` | 3 / 48    | `12`   | Section heading ↔ body |
| `--space-3xl` | 5 / 80    | `20`   | Section vertical padding (mobile) |
| `--space-4xl` | 6 / 96    | `24`   | Section vertical padding |
| `--space-5xl` | 8 / 128   | `32`   | Section vertical padding (sm:) |

### 5.4 Grid system — **Explicitly Found**

A **12‑column grid** is used at `lg:` only. Common splits:

- 7 / 5 — hero, case study (image + content)
- 8 / 4 — section header + supporting copy
- 3 / 2 (5‑col) — CTA section (content + form)

Below `lg`, all grids collapse to a single column with `gap-8 lg:gap-14`.

### 5.5 Gap conventions

| Context | Gap |
|---|---|
| Inline icon + label | `gap-2` |
| Form fields vertical | `space-y-5` |
| List items (step / bullet) | `space-y-2` to `space-y-6` |
| Column grid | `gap-8 lg:gap-14` (or `gap-12`) |
| Card grid | `gap-3` (metric tiles) → `gap-8` (project rows) |

### 5.6 Alignment patterns

- Content blocks are **left‑aligned by default**. Center alignment is reserved for short hero‑style statements only.
- Cards use `items-start` so multi‑line content stays top‑anchored.
- Hero photo + copy use `items-center` for visual balance.

---

## 6. Design Tokens (CSS Variables)

Add this to `app/assets/css/landing.css` (or a new `tokens.css`) alongside the existing `@theme` block. These are framework‑agnostic and can be consumed by any component, including non‑Tailwind ones.

```css
:root {
  /* ============ COLORS ============ */
  --color-primary:        #8B5CF6; /* brand.purple */
  --color-primary-hover:  #0D0B1E; /* ink (button hover) */
  --color-secondary:      #10B981; /* brand.green */
  --color-accent:         #FB923C; /* brand.orange */

  --color-background:     #FEFCFB; /* paper */
  --color-surface:        #FFFFFF;
  --color-surface-subtle: rgba(255, 255, 255, 0.4);

  --color-text-primary:   #0D0B1E; /* ink */
  --color-text-secondary: #52525B; /* zinc-600 */
  --color-text-muted:     #71717A; /* zinc-500 */
  --color-text-inverse:   #FEFCFB;

  --color-border:         #E4E4E7; /* zinc-200 */
  --color-border-subtle:  rgba(228, 228, 231, 0.6);

  --color-success:        #10B981;
  --color-warning:        #F59E0B; /* Recommended */
  --color-danger:         #EF4444; /* Recommended */
  --color-info:           #3B82F6; /* Recommended */

  --color-focus-ring:     rgba(139, 92, 246, 0.20);
  --color-selection:      #8B5CF6;

  /* ============ TYPOGRAPHY ============ */
  --font-heading: "Space Grotesk", system-ui, sans-serif;
  --font-body:    "Inter", system-ui, sans-serif;
  --font-mono:    "JetBrains Mono", monospace;

  --text-xs:   0.75rem;   /* 12 */
  --text-sm:   0.875rem;  /* 14 */
  --text-md:   1rem;      /* 16 */
  --text-lg:   1.125rem;  /* 18 */
  --text-xl:   1.25rem;   /* 20 */
  --text-2xl:  1.5rem;    /* 24 */
  --text-3xl:  1.875rem;  /* 30 */
  --text-4xl:  2.25rem;   /* 36 */
  --text-5xl:  3rem;      /* 48 */
  --text-6xl:  3.75rem;   /* 60 */
  --text-7xl:  4.5rem;    /* 72 */

  --leading-tight:    1.1;
  --leading-snug:     1.3;
  --leading-relaxed:  1.625;
  --tracking-display: -0.02em;

  --weight-regular:  400;
  --weight-medium:   500;
  --weight-semibold: 600;
  --weight-bold:     700;

  /* ============ SPACING ============ */
  --space-3xs: 0.25rem;   /* 4  */
  --space-2xs: 0.375rem;  /* 6  */
  --space-xs:  0.5rem;    /* 8  */
  --space-sm:  0.75rem;   /* 12 */
  --space-md:  1rem;      /* 16 */
  --space-lg:  1.5rem;    /* 24 */
  --space-xl:  2rem;      /* 32 */
  --space-2xl: 3rem;      /* 48 */
  --space-3xl: 5rem;      /* 80 */
  --space-4xl: 6rem;      /* 96 */
  --space-5xl: 8rem;      /* 128 */

  --container-narrow: 56rem; /* 896  — long-form text */
  --container-cta:    64rem; /* 1024 — CTA sections   */
  --container-page:   72rem; /* 1152 — default        */
  --gutter-mobile:    1.25rem;
  --gutter-desktop:   2rem;

  /* ============ RADIUS ============ */
  --radius-xs:    0.375rem; /* 6  — chip / tag       */
  --radius-sm:    0.5rem;   /* 8  — small controls   */
  --radius-md:    0.75rem;  /* 12 — inputs           */
  --radius-lg:    1rem;     /* 16 — card inner       */
  --radius-xl:    1.5rem;   /* 24 — card / panel     */
  --radius-2xl:   2rem;     /* 32 — hero photo       */
  --radius-pill:  9999px;   /* buttons, pills, dots  */

  /* ============ SHADOWS ============ */
  --shadow-soft: 0 1px 0 rgba(0,0,0,0.04), 0 8px 24px -12px rgba(0,0,0,0.08);
  --shadow-sm:   0 1px 2px rgba(0,0,0,0.05);                                /* Recommended */
  --shadow-md:   0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.06); /* Recommended */
  --shadow-lg:   0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.05); /* Recommended */
  --shadow-focus: 0 0 0 2px rgba(139, 92, 246, 0.20);

  /* ============ TRANSITIONS ============ */
  --transition-fast:    150ms ease;
  --transition-normal:  250ms ease;
  --transition-slow:    550ms cubic-bezier(.22,.61,.36,1);
  --transition-marquee: 40s linear infinite;

  /* ============ Z-INDEX ============ */
  --z-base:    0;
  --z-raised:  10;
  --z-sticky:  50;
  --z-overlay: 90;
  --z-modal:   100;
}

.dark {
  --color-background:    #0D0B1E;
  --color-surface:       #18181B; /* zinc-900 */
  --color-surface-subtle: rgba(255,255,255,0.02);

  --color-text-primary:   #F4F4F5; /* zinc-100 */
  --color-text-secondary: #A1A1AA; /* zinc-400 */
  --color-text-muted:     #71717A; /* zinc-500 */
  --color-text-inverse:   #0D0B1E;

  --color-border:        rgba(255,255,255,0.10);
  --color-border-subtle: rgba(255,255,255,0.05);

  --shadow-soft: 0 1px 0 rgba(0,0,0,0.5), 0 8px 24px -12px rgba(0,0,0,0.6);
}
```

---

## 7. UI Components — Catalogue

Quick map of components currently composed in the mockup. Numbered detail follows in §§ 8–11.

| Component | Location | Pattern |
|---|---|---|
| Sticky nav | header | translucent backdrop blur |
| Hero w/ photo + floating sticker + code window | hero | 12‑col grid 7/5 |
| Status pill (mono) | hero, footer | `bg-brand-green/10` + pulse dot |
| Marquee strip | tech stack | infinite linear translate |
| Project row (alt) | recent work | 7/5 grid, alternating order |
| Case‑study slide (carousel) | case studies | track of `shrink-0 w-full` slides |
| Metric tile | case study | rounded square + display number |
| Step (vertical timeline) | case study, process | numbered dot + connector line |
| Testimonial card | "kind words" | scrollable horizontal track |
| FAQ accordion | faq | native `<details>` + rotating `+` |
| Contact form | CTA | rounded panel with mono labels |
| Footer | bottom | 3‑col grid with status pill |

---

## 8. Buttons & CTAs

### 8.1 Primary — solid purple
```html
<a class="inline-flex items-center gap-2 bg-brand-purple text-white
          px-6 py-3.5 rounded-full font-medium shadow-soft
          hover:bg-ink dark:hover:bg-white dark:hover:text-ink
          hover:-translate-y-0.5 transition-all">
  Tell me about your project
  <svg class="w-4 h-4 group-hover:translate-x-1 transition" …/>
</a>
```
- **Padding:** `px-6 py-3.5` (large) · `px-4 py-2` (small inverse, in nav)
- **Radius:** always `rounded-full`
- **Hover:** swap fill to `ink`/`white` *and* lift `-translate-y-0.5`
- **Icon:** trailing arrow that nudges right on hover

### 8.2 Secondary — solid ink (nav inverse)
`bg-ink text-paper dark:bg-white dark:text-ink` → hover swaps to `bg-brand-purple`.

### 8.3 Ghost / text link
`text-sm font-medium hover:text-brand-purple transition`
For inline arrows use the hand‑drawn SVG (`.hand-arrow`) once per page only.

### 8.4 Underlined link
`border-b border-current hover:text-brand-purple hover:border-brand-purple transition` — preferred for in‑content "Visit live site" links.

### 8.5 Icon button (circle)
`w-9 h-9 grid place-items-center rounded-full border border-zinc-200 dark:border-white/10 hover:border-brand-purple hover:text-brand-purple transition`
Larger carousel variant: `w-11 h-11` with `disabled:opacity-40 disabled:cursor-not-allowed`.

### 8.6 Do's & Don'ts
✅ **Do** keep all buttons fully pill‑rounded.
✅ **Do** pair with a trailing arrow on primary CTAs.
✅ **Do** preserve the `-translate-y-0.5` micro‑lift.
❌ **Don't** add a third button variant (avoid outline‑purple).
❌ **Don't** use `rounded-md` or `rounded-lg` on action buttons — pill‑only.
❌ **Don't** stack two primary buttons side‑by‑side. Pair primary + ghost.

---

## 9. Forms & Inputs

### 9.1 Input / Textarea
```html
<label class="block text-xs font-mono text-zinc-500 mb-2" for="name">Your name</label>
<input class="w-full px-4 py-3 rounded-xl
              border border-zinc-200 dark:border-white/10
              bg-white dark:bg-zinc-900
              focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20
              transition" />
```
- **Radius:** `rounded-xl` (12px) — distinct from buttons (pill).
- **Label:** always mono, `text-xs`, `zinc-500`, `mb-2`.
- **Focus:** purple border + 2px purple/20 ring. No browser default outline.
- **Textarea:** add `resize-none`, default `rows="3"`.
- **Placeholder:** lowercase, exemplar tone (`e.g. Sam`, `sam@yourstartup.com`).

### 9.2 Field group
- Use `space-y-5` between field groups.
- The form container itself is a card: `p-7 sm:p-9 rounded-2xl border ... shadow-soft`.

### 9.3 States — **Recommended** (mockup ships only base + focus)
| State | Treatment |
|---|---|
| Error  | `border-danger ring-2 ring-danger/20` + helper text `text-xs text-danger mt-1` |
| Success | Append a `text-brand-green` check icon inside the input on the right |
| Disabled | `bg-zinc-100 dark:bg-white/[0.02] text-zinc-400 cursor-not-allowed` |
| Loading (submit) | Replace button label with spinner + "Sending…" |

### 9.4 Do's & Don'ts
✅ Always pair labels with `for=`/`id=` (a11y).
✅ Use mono micro‑labels — they're a brand signature.
❌ Don't switch to floating labels — breaks brand voice.
❌ Don't round inputs to `rounded-full`.

---

## 10. Navigation Patterns

### 10.1 Sticky header
`sticky top-0 z-50 backdrop-blur bg-paper/70 dark:bg-ink/70 border-b border-zinc-200/60 dark:border-white/5`

- Height: `h-16`. Container: `max-w-6xl mx-auto px-5 sm:px-8`.
- Logo: display font + brand‑green pulse dot + `.dev` in `text-brand-purple`.
- Links: `text-sm text-zinc-600 dark:text-zinc-400 hover:text-ink dark:hover:text-white transition`, gap `gap-7`.
- Right cluster: circular theme toggle + secondary CTA pill (`hidden sm:inline-flex`).
- Mobile: nav links collapse (`hidden md:flex`). **Recommended:** add a Preline `hs-collapse` mobile menu drawer.

### 10.2 In‑page anchor links
Use the hash‑section pattern (`#work`, `#process`, `#words`, `#faq`, `#talk`) and rely on `html.scroll-smooth`. Always provide a corresponding `id=` on the section.

### 10.3 Carousel controls
Pair of circular icon buttons (`w-11 h-11`) + gradient progress bar (`from-brand-purple to-brand-green`) + active dot (`w-28 bg-brand-purple`). Document as one shared `<CarouselNav>` component.

---

## 11. Cards & Content Blocks

### 11.1 Project card
Two‑column 7/5 grid, image in `rounded-2xl border bg-white dark:bg-zinc-900 shadow-soft` with `aspect-[16/10]`. Alternate `order-1 / order-2` for visual rhythm. Eyebrow color rotates `brand-purple → brand-green → brand-orange → brand-green`.

### 11.2 Case‑study panel
Full panel: `rounded-2xl border bg-paper dark:bg-ink p-6 sm:p-10 shadow-soft`. Contains nested image card (`rounded-xl`), three metric tiles, tech tags, problem block, step timeline, and a tinted "result" callout (`bg-brand-purple/5 dark:bg-brand-purple/10 border border-brand-purple/20`).

### 11.3 Metric tile
`p-4 rounded-xl border border-zinc-200 dark:border-white/10` with `font-display text-3xl font-bold` number in a rotating brand color and a `text-[11px] font-mono text-zinc-500 mt-1` caption.

### 11.4 Status pill
```html
<span class="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full
             bg-brand-green/10 text-brand-green border border-brand-green/20">
  <span class="w-1.5 h-1.5 rounded-full bg-brand-green pulse-dot"></span>
  Booking for June 2026
</span>
```
Used in hero, footer, case‑study badges. **Always** pairs with a pulse dot when status is "live/available".

### 11.5 Tag / chip
`text-[11px] font-mono px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400` — used for tech‑stack tags inside case studies.

### 11.6 Floating sticker
Small rounded‑full panel with mono text, optionally rotated (`rotate-[-3deg]` / `rotate-[6deg]`), `shadow-soft`, used to inject personality. **Limit:** max 2 per section.

### 11.7 Accordion (FAQ)
Native `<details class="group py-6">` + `<summary>` with a circular `+` that becomes `×` (45° rotate) and turns purple on open:
```html
<span class="shrink-0 w-8 h-8 grid place-items-center rounded-full
             border border-zinc-200 dark:border-white/10
             group-open:bg-brand-purple group-open:text-white group-open:border-brand-purple
             transition">
  <svg class="w-3 h-3 group-open:rotate-45 transition" …/>
</span>
```
Wrap the list in `divide-y divide-zinc-200 dark:divide-white/10 border-y …` for clean rails.

---

## 12. Imagery & Iconography

### 12.1 Photography
- Treatment: contained in `rounded-2xl`/`rounded-3xl`, `object-cover`, with a soft border. Hero photo uses `mix-blend-multiply` in light mode + brand gradient wash (`from-brand-purple/20 via-brand-green/10 to-brand-orange/20`) for a unified tone.
- Always pair photos with a sticker/badge to anchor the hand‑made feel.
- All images use `loading="lazy"` and meaningful `alt` text.
- Aspect ratios in use: `aspect-[4/5]` (portrait hero), `aspect-[16/10]` (project / case‑study).

### 12.2 Icons
- **Inline SVG only.** No icon font, no icon library yet. Stroke icons use `fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"`, sized `w-3 → w-5` (currently 3, 3.5, 4, 5).
- Brand logos in marquee are full‑color SVGs (single `<path>` each) — kept tiny (`width: 18px`).
- **Recommended:** standardize on **Lucide** for any future icon needs (matches the 24×24 / 2px stroke convention already used).

### 12.3 Decorative SVGs
- `.squiggle` (green wavy underline) — hero word emphasis, **once per page**.
- `.hand-arrow` (animated stroke‑dash path) — used to point to secondary CTAs, **once per page**.
- Code‑window "traffic lights" — decorative only.

---

## 13. Motion & Interaction

| Motion | Definition | Use |
|---|---|---|
| `pulse-dot` | 2s infinite keyframes scaling box‑shadow halo | Availability dots |
| `.reveal` → `.reveal.in` | `opacity 0→1` + `translateY(16px→0)`, `.7s ease` | All scroll‑in elements (triggered by IntersectionObserver) |
| Button micro‑lift | `hover:-translate-y-0.5 transition-all` | Primary CTAs |
| Card image zoom | `transition: transform .6s ease` → `scale(1.03)`/`(1.04)` on parent hover | Project & blog cards |
| Carousel slide | `transform .5s ease-out` (track), `.55s cubic-bezier(.22,.61,.36,1)` (featured posts) | Case studies, featured posts |
| Marquee | `40s linear infinite translateX(0 → -50%)`, paused on hover | Tech stack |
| Metric underline | `.cs-metric-num` keyframe scaling `background-size 0% → 100%` over `.8s ease .15s` | Case‑study metrics |
| `hand-arrow` draw | `stroke-dashoffset 200→0`, 1.4s ease, .4s delay | Hero arrow |
| FAQ icon rotate | `group-open:rotate-45 transition` | Accordion `+` → `×` |

**Principles**
1. Motion is **subtle, supportive, never decorative for its own sake.** Most transitions are 150–550ms.
2. Always pair entrance animations with `prefers-reduced-motion` overrides — **flagged inconsistency:** the mockup does not currently respect it. Add:
   ```css
   @media (prefers-reduced-motion: reduce) {
     .reveal, .pulse-dot, .marquee-track, .cs-metric-num, .hand-arrow path { animation: none !important; transition: none !important; opacity: 1 !important; transform: none !important; }
   }
   ```

---

## 14. Accessibility Guidelines

| Topic | Rule |
|---|---|
| Color | Brand colors fail AA for body text. Reserve for icons, large headings, decorative tints. |
| Focus | Inputs ship a focus ring; **buttons & links currently rely on default outline** → add `focus-visible:ring-2 focus-visible:ring-brand-purple/40 focus-visible:ring-offset-2` to every interactive class. **Recommended.** |
| Labels | Every input has a visible mono label. ARIA labels are used on icon‑only buttons (`aria-label="Toggle dark mode"`, `aria-label="Previous case study"`). Continue this. |
| Headings | One `<h1>` per page (hero). Sections use `<h2>` with `id=`. Card titles `<h3>`/`<h4>`. |
| Landmarks | `<header>`, `<nav>`, `<section>`, `<article>`, `<footer>` are already used. Add `<main>` wrapping the page body (currently missing — **flagged**). |
| Reduced motion | Add the override above. |
| Decorative imagery | Marquee duplicate uses `aria-hidden="true"` — keep this pattern. |
| Target size | Minimum interactive target `40 × 40` (currently 36px circle nav toggle — **flagged**, bump to `w-10 h-10`). |
| Forms | Add `aria-describedby` for helper text and inline error messages. |

---

## 15. Responsive Design Rules

### 15.1 Breakpoints (Tailwind defaults — **Explicitly Found** in use: `sm`, `md`, `lg`)

| Breakpoint | Min width | Used for |
|---|---|---|
| `sm` | 640px | Padding/typography step‑up, show inline stickers |
| `md` | 768px | Show desktop nav links |
| `lg` | 1024px | Activate 12‑col grids, multi‑card carousel slides |
| `xl` / `2xl` | 1280 / 1536 | **Not currently used.** Reserve for future ultra‑wide layouts. |

### 15.2 Patterns
- **Mobile‑first:** classes are unprefixed for mobile, then opt into `sm:` / `lg:` for upscaling.
- **Grid collapse:** all 12‑col grids → single column below `lg`. Image and text re‑order via `order-1` / `order-2`.
- **Typography:** scale headings exactly two steps from `text-4xl → sm:text-5xl` (or `5xl → 6xl → 7xl` for hero).
- **Vertical rhythm:** `py-24 sm:py-32` (never use `md:` or `lg:` for section padding).
- **Hide secondary chrome** on small screens: `hidden sm:inline-flex`, `hidden md:flex`.

### 15.3 Flagged inconsistencies
- The hero hides decorative floating elements with `hidden sm:block` — but the nav CTA uses `hidden sm:inline-flex` (different breakpoint logic from the menu, which uses `md:`). **Standardize:** decorative → `sm:`, structural → `md:`.

---

## 16. CSS Utility Recommendations

The mockup repeats several class clusters. Promote these into shared components / `@apply` recipes.

### 16.1 Repeated patterns to extract

| Cluster | Suggested abstraction |
|---|---|
| `bg-brand-purple text-white px-6 py-3.5 rounded-full font-medium shadow-soft hover:bg-ink dark:hover:bg-white dark:hover:text-ink hover:-translate-y-0.5 transition-all` | `<UiButton variant="primary">` |
| `inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20` | `<UiStatusPill tone="success">` |
| `font-mono text-xs text-brand-purple mb-3` (with rotating color) | `<UiEyebrow tone="purple\|green\|orange">` |
| `w-full px-4 py-3 rounded-xl border ... focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition` | `<UiInput>` / `<UiTextarea>` |
| `p-4 rounded-xl border border-zinc-200 dark:border-white/10` (metric tile) | `<UiMetricTile>` |
| `rounded-2xl border bg-paper dark:bg-ink p-6 sm:p-10 shadow-soft` (panel) | `<UiPanel>` |
| `w-9 h-9 grid place-items-center rounded-full border ... hover:border-brand-purple hover:text-brand-purple transition` | `<UiIconButton size="sm\|md">` |
| `text-[11px] font-mono px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400` | `<UiTag>` |

### 16.2 Tailwind v4 — suggested `@theme` extension

The project already uses Tailwind v4 with the `@theme {}` directive in `landing.css`. Extend it:

```css
@theme {
  /* Already present */
  --color-brand-purple: #8B5CF6;
  --color-brand-green:  #10B981;
  --color-brand-orange: #FB923C;
  --color-paper: #FEFCFB;
  --color-ink:   #0D0B1E;
  --font-display: "Space Grotesk", system-ui, sans-serif;
  --font-sans:    "Inter", system-ui, sans-serif;
  --font-mono:    "JetBrains Mono", monospace;
  --shadow-soft:  0 1px 0 rgba(0,0,0,0.04), 0 8px 24px -12px rgba(0,0,0,0.08);

  /* Recommended additions */
  --color-brand-purple-hover: #7C3AED; /* violet-600, AA-safe for small text */
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-danger:  #EF4444;
  --color-info:    #3B82F6;

  --radius-pill: 9999px;
  --radius-card: 1.5rem;

  --shadow-focus: 0 0 0 2px rgba(139, 92, 246, 0.20);

  --container-narrow: 56rem;
  --container-cta:    64rem;
  --container-page:   72rem;

  --ease-carousel:    cubic-bezier(.22,.61,.36,1);
  --duration-carousel: 550ms;
}
```

### 16.3 Equivalent classic `tailwind.config.js` (for reference / portability)

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './app/**/*.{vue,ts,tsx,html}',
    './node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        brand: {
          purple: { DEFAULT: '#8B5CF6', hover: '#7C3AED' },
          green:  '#10B981',
          orange: '#FB923C',
        },
        paper: '#FEFCFB',
        ink:   '#0D0B1E',
        success: '#10B981',
        warning: '#F59E0B',
        danger:  '#EF4444',
        info:    '#3B82F6',
      },
      maxWidth: {
        narrow: '56rem',
        cta:    '64rem',
        page:   '72rem',
      },
      borderRadius: {
        pill: '9999px',
        card: '1.5rem',
      },
      boxShadow: {
        soft:  '0 1px 0 rgba(0,0,0,0.04), 0 8px 24px -12px rgba(0,0,0,0.08)',
        focus: '0 0 0 2px rgba(139, 92, 246, 0.20)',
      },
      transitionTimingFunction: {
        carousel: 'cubic-bezier(.22,.61,.36,1)',
      },
      transitionDuration: {
        carousel: '550ms',
      },
      animation: {
        'pulse-dot': 'pulseDot 2s infinite',
        'marquee':   'marquee 40s linear infinite',
      },
      keyframes: {
        pulseDot: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(16,185,129,0.5)' },
          '50%':     { boxShadow: '0 0 0 8px rgba(16,185,129,0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [require('preline/plugin')],
};
```

---

## 17. Brand Consistency Rules

1. **Only three families, only three brands, only one ink, only one paper.** No new neutrals.
2. **Pill or sharp — never half‑round.** Buttons & pills `rounded-full`; cards `rounded-xl/2xl`; inputs `rounded-xl`. Nothing else.
3. **Mono is for metadata, not paragraphs.** Eyebrows, tags, code, labels, step numerals — that's it.
4. **Eyebrow color rotation:** purple → green → orange → repeat. Don't introduce a fourth.
5. **One squiggle, one hand‑arrow per page.** Both are signature flourishes; overusing kills them.
6. **Stickers always have personality copy** (`☕ probably on coffee #3`), never marketing claims.
7. **Status pills must always carry the pulse dot** when describing an active/live status.
8. **Buttons trail an arrow.** Primary CTAs use `→` (arrow SVG); the arrow nudges right on hover.
9. **Cards always have `shadow-soft`,** never the heavier Tailwind shadows.
10. **Dark mode is a first‑class citizen.** Every component must specify a `dark:` counterpart for surface, border, and text.
11. **All sections get a `<h2>` and a mono eyebrow.** No exceptions.
12. **Image cards are wrapped in a `rounded-2xl border` panel** before any aspect‑ratio image.

---

## 18. Design System Recommendations

### 18.1 Folder structure (Nuxt 4)

```
app/
├── components/
│   ├── ui/                 ← primitives (zero-business-logic)
│   │   ├── UiButton.vue
│   │   ├── UiIconButton.vue
│   │   ├── UiInput.vue
│   │   ├── UiTextarea.vue
│   │   ├── UiTag.vue
│   │   ├── UiEyebrow.vue
│   │   ├── UiStatusPill.vue
│   │   ├── UiPanel.vue
│   │   ├── UiMetricTile.vue
│   │   ├── UiCard.vue
│   │   └── UiAccordion.vue
│   ├── marketing/          ← composed marketing blocks (1:1 with Storyblok blocks)
│   │   ├── HeroBlock.vue
│   │   ├── ProjectRowBlock.vue
│   │   ├── CaseStudyCarouselBlock.vue
│   │   ├── TechMarqueeBlock.vue
│   │   ├── FaqBlock.vue
│   │   ├── ContactFormBlock.vue
│   │   └── FooterBlock.vue
│   └── chrome/             ← layout chrome
│       ├── SiteHeader.vue
│       └── ThemeToggle.vue
├── assets/
│   └── css/
│       ├── main.css
│       ├── landing.css     ← @theme tokens
│       ├── tokens.css      ← :root CSS variables (new)
│       └── themes/
└── pages/
```

### 18.2 Naming conventions

| Layer | Prefix / convention | Example |
|---|---|---|
| UI primitive | `Ui*` | `UiButton.vue` |
| Marketing block (CMS‑bound) | `*Block` | `HeroBlock.vue` |
| Layout chrome | `Site*` | `SiteHeader.vue` |
| Composable | `use*` | `useScrollReveal.ts` |
| CSS custom prop | `--<category>-<role>-[modifier]` | `--color-text-secondary` |
| Tailwind utility class | kebab‑case Tailwind defaults | `text-brand-purple` |
| Variant prop | semantic word, not visual | `tone="success"` not `tone="green"` |

### 18.3 Variant model — recommended

Standardize component variants around three orthogonal props:

```ts
type Tone    = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'accent';
type Size    = 'sm' | 'md' | 'lg';
type Variant = 'solid' | 'soft' | 'outline' | 'ghost';
```

- `Tone` maps to brand color (`primary` → `brand-purple`, `success` → `brand-green`, `accent` → `brand-orange`).
- `Size` maps to padding + font-size, never to color.
- `Variant` maps to fill style:
  - `solid` — filled background, white text
  - `soft`  — `tone/10` fill + `tone/20` border + `tone` text (status pills, result callouts)
  - `outline` — transparent fill + neutral border, color on hover
  - `ghost` — text only

### 18.4 Responsive utility conventions

- Step up at `sm:` for typography & padding.
- Step up at `lg:` for grid activation.
- Never use `md:` for anything other than nav‑level chrome.
- Never write more than two breakpoint variants per class chain (`text-4xl sm:text-5xl` ✅, `text-3xl sm:text-4xl lg:text-5xl xl:text-6xl` ❌ — collapse it).

### 18.5 Preline UI integration

The Preline source globs are already wired (`@source "../../../node_modules/preline/dist/*.js";`). For the components in this guide, prefer **native HTML + Tailwind** for the simple primitives (button, input, accordion), and reach for Preline only for behavior‑heavy widgets:

| Use Preline for | Build custom for |
|---|---|
| Modal / Overlay (`hs-overlay`) | Buttons, pills, eyebrows |
| Collapse / Off‑canvas mobile nav (`hs-collapse`) | Inputs, textareas |
| Tabs / Tooltips | Cards, panels |
| Toasts | Accordions (native `<details>` is on‑brand) |

When using Preline, *restyle* to brand tokens — never ship Preline's default blue.

### 18.6 Quality gates (recommended additions)

- Add an `eslint-plugin-tailwindcss` rule to prevent ad‑hoc colors outside the token list.
- Add a Storybook (or Histoire, since this is Vue) instance for every `Ui*` component with all `Tone × Size × Variant` permutations.
- Add Playwright visual regression on `/components/_kitchen-sink` before each release.
- Lint that disallows raw hex values in `*.vue` files — must reference a CSS var or Tailwind token.

---

## Appendix A — Issues & Inconsistencies Flagged

| # | Where | Issue | Recommendation |
|---|---|---|---|
| 1 | Brand purple body text | ~3.5:1 contrast | Use `violet-600 #7C3AED` for small text; reserve `#8B5CF6` for ≥18px bold or icons. |
| 2 | Brand green/orange small text | <3:1 | Decorative only. Pair with high‑contrast neutrals for any readable copy. |
| 3 | `<main>` landmark missing | a11y | Wrap page body in `<main id="content">`. |
| 4 | No `prefers-reduced-motion` override | a11y | Add the media query block from §13. |
| 5 | 36px icon button hit target | a11y / touch | Bump to `w-10 h-10` (40px min). |
| 6 | Two breakpoint logics for "mobile" chrome (`sm:` vs `md:`) | inconsistency | Standardize: decorative `sm:`, structural `md:`. |
| 7 | Duplicate CSS between `index.html` `<style>` and `landing.css` | maintenance | Delete the `<style>` block once the mockup is fully ported to Nuxt components. |
| 8 | Eyebrow color is hand‑coded per section | maintenance | Drive via `<UiEyebrow tone="purple\|green\|orange">` with a documented rotation order. |
| 9 | Inline SVGs duplicated 14× in marquee | bundle size | Extract to a `TechIcon` component or sprite. |
| 10 | No `focus-visible` ring on buttons/links | a11y | Add `focus-visible:ring-2 focus-visible:ring-brand-purple/40 focus-visible:ring-offset-2` to all interactive primitives. |
| 11 | Mobile nav has no menu when links hide | UX | Add a Preline `hs-collapse` drawer triggered by a hamburger `<UiIconButton>`. |
| 12 | Three different card paddings (`p-6 sm:p-10`, `p-7 sm:p-9`, `p-4`) | inconsistency | Reduce to two: `UiPanel` (`p-6 sm:p-10`) and `UiTile` (`p-4`). |
| 13 | Form button label mutated via inline `onsubmit` | maintenance | Migrate to a Vue component with reactive submit state. |

---

## Appendix B — Quick Reference Cheat Sheet

```html
<!-- Eyebrow (rotates color: purple → green → orange) -->
<p class="font-mono text-xs text-brand-purple mb-3">/ recent work</p>

<!-- Section heading -->
<h2 class="font-display text-4xl sm:text-5xl font-bold">Stuff I've shipped lately.</h2>

<!-- Body lead -->
<p class="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">…</p>

<!-- Primary CTA -->
<a class="group inline-flex items-center gap-2 bg-brand-purple text-white px-6 py-3.5
          rounded-full font-medium shadow-soft hover:bg-ink dark:hover:bg-white dark:hover:text-ink
          hover:-translate-y-0.5 transition-all">…</a>

<!-- Status pill -->
<span class="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full
             bg-brand-green/10 text-brand-green border border-brand-green/20">
  <span class="w-1.5 h-1.5 rounded-full bg-brand-green pulse-dot"></span> Booking for June 2026
</span>

<!-- Card panel -->
<div class="rounded-2xl border border-zinc-200 dark:border-white/10
            bg-paper dark:bg-ink p-6 sm:p-10 shadow-soft">…</div>

<!-- Input -->
<input class="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-white/10
              bg-white dark:bg-zinc-900 focus:outline-none focus:border-brand-purple
              focus:ring-2 focus:ring-brand-purple/20 transition" />
```

— *End of Brand Style Guide v1.0 — derived from `app/pages/index.html`.*

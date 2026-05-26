# PRD — Content Listing & Detail Pages
## Blogs · Case Studies · Featured Posts

**Status:** Draft  
**Date:** 2026-05-26  
**Scope:** Three public routes + their shared reusable components

---

## 1. Overview

The landing page (`app/pages/public/landing.vue`) already renders teaser sections for posts, case studies, and featured posts using `WebWorkFeaturedPosts`, `WebWorkCaseStudies`, and `WebWorkRecentProjects`. These link out to standalone listing pages and detail pages that do not yet exist.

This PRD defines the **pages**, **layout templates**, and **reusable components** needed to complete those three content areas as standalone navigable routes.

---

## 2. Routes

| Route | File | Purpose |
|---|---|---|
| `/blogs` | `app/pages/public/blogs/index.vue` | Blog post listing — paginated grid |
| `/blogs/:id` | `app/pages/public/blogs/[id].vue` | Single blog post reader |
| `/case-studies` | `app/pages/public/case-studies/index.vue` | Case study listing — card grid |
| `/case-studies/:id` | `app/pages/public/case-studies/[id].vue` | Single case study deep-dive |
| `/featured-posts` | `app/pages/public/featured-posts/index.vue` | Featured post listing — editorial grid |
| `/featured-posts/:id` | `app/pages/public/featured-posts/[id].vue` | Single featured post reader |

All six pages use the same `SiteHeader` + `SiteFooter` shell (already existing in `layout/`).

---

## 3. Shared Reusable Components

All components live under `app/components/web/` in their appropriate domain folder. Props-driven only — no hardcoded copy.

### 3.1 `content/PostCard` — blog post card

The base card used on all listing pages. Supports two display variants.

**Props:**
```ts
interface PostCard {
  tag: string           // e.g. "Process", "Postgres"
  date: string          // e.g. "May 12, 2026"
  readTime: string      // e.g. "6 min read"
  title: string
  excerpt: string
  href: string          // link to detail page
  image?: string        // optional cover image URL
  imageAlt?: string
  featured?: boolean    // renders wider/prominent layout if true
}
```

**Variants (controlled by `image` presence + `featured` flag):**

| Variant | When | Layout |
|---|---|---|
| **Text-only** | `image` is undefined/empty | Full-width text block: tag pill + date + title + excerpt + "Read →" link |
| **With image** | `image` is provided | Left-side image (aspect 16/9 or 4/3) + right-side text stack |
| **Featured / hero card** | `featured: true` + `image` | Full-bleed background image, text overlaid on bottom gradient, larger type |

**Domain:** `app/components/web/content/PostCard.vue`

---

### 3.2 `content/CaseStudyCard` — case study card

Used on the case studies listing page. More structured than `PostCard` — emphasises metrics.

**Props:**
```ts
interface CaseStudyCard {
  title: string
  tag: string            // e.g. "SaaS · 2026"
  status: string         // e.g. "Live"
  image?: string
  imageAlt?: string
  stats: StatItem[]      // up to 3 stat tiles (reuse existing StatItem type)
  stack: string[]        // tech pill labels
  excerpt: string        // 1–2 sentences
  href: string
  featured?: boolean     // hero treatment for first card
}
```

**Domain:** `app/components/web/content/CaseStudyCard.vue`

---

### 3.3 `content/ContentHero` — page-level hero for listing pages

Replaces the site-wide `MainHero` for inner content pages. Slim, focused.

**Props:**
```ts
interface ContentHero {
  eyebrow: string        // e.g. "/ writing"
  eyebrowTone?: Tone
  title: string          // may contain inline HTML spans
  description?: string
  badge?: BadgeContent   // optional status badge (e.g. post count)
}
```

**Layout:** Single column, `max-w-4xl`, centered. No image or code snippet. Uses `font-display` headline.

**Domain:** `app/components/web/content/ContentHero.vue`

---

### 3.4 `content/ArticleBody` — rich prose renderer

The main content area for detail pages. Wraps Nuxt Content / HTML prose with brand-token typography.

**Props:**
```ts
interface ArticleBody {
  html: string           // server-rendered prose HTML
}
```

**Styling requirements:**
- `prose` class from `@tailwindcss/typography` scoped to brand tokens
- Headings: `font-display`, `text-ink dark:text-zinc-100`
- Code blocks: `font-mono`, dark background, `text-brand-green`
- Inline code: `bg-brand-purple/10 text-brand-purple rounded`
- Links: `text-ink underline` (not `text-brand-purple` — AA contrast requirement for small text)
- `max-w-2xl mx-auto` for reading column width

**Domain:** `app/components/web/content/ArticleBody.vue`

---

### 3.5 `content/ArticleMeta` — byline / meta bar

Displayed at the top of every detail page, just below the article title.

**Props:**
```ts
interface ArticleMeta {
  tag: string
  tagTone?: Tone
  date: string
  readTime?: string
  author?: string        // defaults to "Alex Rivera" if omitted
}
```

**Domain:** `app/components/web/content/ArticleMeta.vue`

---

### 3.6 `content/TagFilter` — filter pill bar

Used on listing pages to filter by tag/category.

**Props:**
```ts
interface TagFilter {
  tags: { id: string; label: string }[]
  modelValue: string   // currently active tag id ("all" = no filter)
}
// emits: update:modelValue
```

Reuses the visual language of `WebTechStackGrid`'s category filters (pill buttons with brand-tone active state).

**Domain:** `app/components/web/content/TagFilter.vue`

---

### 3.7 `content/Pagination` — page navigator

**Props:**
```ts
interface Pagination {
  currentPage: number
  totalPages: number
  baseHref: string     // e.g. "/blogs?page="
}
```

Simple prev / next + page numbers, `rounded-full` buttons, brand-purple active state.

**Domain:** `app/components/web/content/Pagination.vue`

---

### 3.8 `content/RelatedCards` — "more like this" strip

Shown at the bottom of every detail page. Horizontal scroll on mobile, 3-column on `lg:`.

**Props:**
```ts
interface RelatedCards {
  header?: string       // defaults to "/ more like this"
  items: PostCard[]     // reuses PostCard type (without featured flag)
}
```

**Domain:** `app/components/web/content/RelatedCards.vue`

---

### 3.9 `content/BackLink` — breadcrumb-style back arrow

**Props:**
```ts
interface BackLink {
  label: string   // e.g. "All posts"
  href: string    // e.g. "/blogs"
}
```

Small, mono-font, `←` prefix. Used at the top of every detail page.

**Domain:** `app/components/web/content/BackLink.vue`

---

## 4. Page Templates

### 4.1 Blogs — Index (`/blogs`)

```
SiteHeader
ContentHero           eyebrow="/ writing", full count badge
TagFilter             by topic tag
PostCard grid         3-col lg:, 2-col md:, 1-col base
  - First card:       featured=true (hero treatment)
  - Rest:             with image OR text-only based on data
Pagination
SiteFooter
```

**Key decisions:**
- First card always `featured` if it has an image.
- Cards without an image use `text-only` variant — never a broken placeholder.
- Tag filter emits URL param (`?tag=postgres`) for shareable filtered URLs.
- 9 posts per page (3×3).

---

### 4.2 Blogs — Detail (`/blogs/:id`)

```
SiteHeader
  BackLink            ← All posts
  ArticleMeta         tag, date, readTime
  <h1>                post title, font-display, text-5xl sm:text-6xl
  [cover image]       optional, aspect-video, rounded-2xl
ArticleBody           prose HTML
  — — — — — — — — — — — — —
RelatedCards          3 related posts
SiteFooter
```

**Layout:** `max-w-4xl mx-auto px-5 sm:px-8`

---

### 4.3 Case Studies — Index (`/case-studies`)

```
SiteHeader
ContentHero           eyebrow="/ deep dives"
TagFilter             by industry/type (SaaS, Marketplace, Internal tool, Public sector)
CaseStudyCard grid    2-col lg:, 1-col base
  - First card:       featured=true (full-width banner)
  - Rest:             standard card
Pagination
SiteFooter
```

---

### 4.4 Case Studies — Detail (`/case-studies/:id`)

```
SiteHeader
  BackLink            ← All case studies
  ArticleMeta         tag, year, status badge
  <h1>                title
  StatItem row        3 outcome metrics (brand tones purple/green/orange)
  [cover image]       aspect-video, rounded-2xl
ArticleBody
  — structured sections — 
  Problem             eyebrow + prose
  Steps               numbered 01/02/03 list (reuses ApproachStep visual pattern)
  Result              highlighted prose block
  Stack pills         tech stack row
  — — — — — — — — — — — — —
RelatedCards          3 related case studies
WebMiscBookTalk       (reuse existing) — abbreviated, no FAQ
SiteFooter
```

---

### 4.5 Featured Posts — Index (`/featured-posts`)

```
SiteHeader
ContentHero           eyebrow="/ featured"
PostCard grid         editorial layout: 2+1 asymmetric on lg: (one wide left, two stacked right)
                      fallback: 1-col on mobile
RelatedCards / see-all link to /blogs
SiteFooter
```

**Note:** Featured posts are a curated subset (no pagination needed — max ~6). No `TagFilter`.

---

### 4.6 Featured Posts — Detail (`/featured-posts/:id`)

Identical template to Blogs Detail (`4.2`). No separate component needed — reuses same layout.

---

## 5. New Types to Add to `types.ts`

```ts
// Content pages
export interface PostCardData {
  id: string
  tag: string
  tagTone?: Tone
  date: string
  readTime?: string
  title: string
  excerpt: string
  href: string
  image?: string
  imageAlt?: string
  featured?: boolean
}

export interface CaseStudyCardData extends Pick<CaseStudySlide, 'title' | 'tag' | 'status' | 'image' | 'stats' | 'stack'> {
  id: string
  imageAlt?: string
  excerpt: string
  href: string
  featured?: boolean
}

export interface ArticleMetaData {
  tag: string
  tagTone?: Tone
  date: string
  readTime?: string
  author?: string
}
```

---

## 6. Component Inventory Summary

| Component | File path | New / Existing |
|---|---|---|
| `ContentHero` | `web/content/ContentHero.vue` | **New** |
| `PostCard` | `web/content/PostCard.vue` | **New** |
| `CaseStudyCard` | `web/content/CaseStudyCard.vue` | **New** |
| `ArticleBody` | `web/content/ArticleBody.vue` | **New** |
| `ArticleMeta` | `web/content/ArticleMeta.vue` | **New** |
| `TagFilter` | `web/content/TagFilter.vue` | **New** |
| `Pagination` | `web/content/Pagination.vue` | **New** |
| `RelatedCards` | `web/content/RelatedCards.vue` | **New** |
| `BackLink` | `web/content/BackLink.vue` | **New** |
| `WebUiBadge` | `web/ui/Badge.vue` | Existing |
| `WebUiCta` | `web/ui/Cta.vue` | Existing |
| `WebUiStat` | `web/ui/Stat.vue` | Existing |
| `WebUiSectionHeader` | `web/ui/SectionHeader.vue` | Existing |
| `WebMiscBookTalk` | `web/misc/BookTalk.vue` | Existing (reused on CS detail) |
| `WebLayoutSiteHeader` | `web/layout/SiteHeader.vue` | Existing |
| `WebLayoutSiteFooter` | `web/layout/SiteFooter.vue` | Existing |

All new components go in the new `app/components/web/content/` domain folder.

---

## 7. Brand & Accessibility Requirements

- All components must declare `dark:` variants.
- `PostCard` text-only variant: title `text-ink dark:text-zinc-100`, excerpt `text-zinc-600 dark:text-zinc-400`.
- `PostCard` with-image variant: image uses `rounded-2xl overflow-hidden`, `object-cover`, explicit `alt`.
- Tag pills: active state `bg-brand-purple text-white`, inactive `bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400`, all `rounded-full`.
- Reading column (`ArticleBody`): `max-w-2xl mx-auto` — never full-width on desktop.
- `BackLink`: `focus:ring-2 focus:ring-brand-purple/20` focus state required.
- `StatItem` tones: first=purple, second=green, third=orange (consistent across all content pages).
- No eyebrow text in `uppercase`. Always lowercase with leading `/`.

---

## 8. Out of Scope (v1)

- CMS/Storyblok data binding (data is prop-driven with mock data in pages for now).
- Search functionality.
- Comment system.
- RSS feed.
- Author profile pages.
- Newsletter subscription form.

---

## 9. Build Order (Recommended)

1. Add new types to `types.ts`
2. Build shared primitives: `BackLink`, `ArticleMeta`, `ContentHero`, `TagFilter`, `Pagination`
3. Build `PostCard` (all three variants)
4. Build `CaseStudyCard`
5. Build `ArticleBody`, `RelatedCards`
6. Wire up index pages: `blogs/index.vue`, `case-studies/index.vue`, `featured-posts/index.vue`
7. Wire up detail pages: `[id].vue` for all three routes
8. QA: dark mode, mobile, keyboard navigation, focus states

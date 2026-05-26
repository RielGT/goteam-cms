# PRD — Wire `app/components/web/*` into `app/pages/public/landing.vue` demo

**Status:** Draft
**Owner:** Frontend
**Last updated:** 2026-05-26

---

## 1. Background

The components under `app/components/web/` were recently refactored from hard-coded layouts into **typed, props-driven reusables** (see plan `props-driven_web_components_14799c13`). Each section now accepts its content (text, links, images, CTAs, items) via strongly-typed props, and 5 shared primitives live under `app/components/web/ui/` (`Cta`, `SectionHeader`, `Avatar`, `Badge`, `Stat`).

What's missing: a **single demo page** that proves the refactor works end-to-end by providing concrete data to every section. `app/pages/public/landing.vue` was nominated as that page, but its current contents have been reduced to a placeholder (literally `test`) during the refactor and need to be rebuilt as the data-providing host.

## 2. Goal

Produce a working demo at the route `/landing` (Nuxt strips the `/public` prefix) that:

1. Imports types from `~/components/web/types`.
2. Defines one typed `const` per section holding the concrete content currently shown on the existing site.
3. Renders every refactored component in the same order/layout as before, passing data via `:prop` / `v-bind`.
4. Renders **identically** to the pre-refactor landing page — pixel-level diff acceptable only for whitespace.
5. Keeps every interactive behavior working (theme toggle, tech filter, carousels, lifecycle autoplay, work-cycle wheel, FAQ accordion, contact form, scroll-to-top, chat bot).

## 3. Non-goals

- No CMS / Storyblok integration. Content is inlined in `landing.vue`.
- No backing `content/landing.ts` or JSON file — `landing.vue` itself is the source of truth for the demo.
- No design changes. No new components. No new behaviors.
- No tests written as part of this work (visual + manual verification only).

## 4. Scope of work

### 4.1 Restore `landing.vue` page meta

Re-add the page meta that was present before the placeholder overwrite:

- `definePageMeta({ layout: false })`
- `useHead({ ... })` with the same title, description, theme bootstrap inline script, and `data-default-theme` attribute.

### 4.2 Define typed content constants

Inside `<script setup lang="ts">`, declare one `const` per section. Imports come from `~/components/web/types`. Required consts (mapped to the components they feed):

| Const                   | Component                               | Notes                                                                                                |
| ----------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `brand`, `nav`, `headerCta` | `WebLayoutSiteHeader`                  | Brand mark, nav links, top-right CTA                                                                |
| `hero`                  | `WebHeroMainHero`                       | `availability`, `headline` (HTML), `subheadline`, `ctas[]`, `image`, `codeSnippet`, `floatingBadge` |
| `techPills`             | `WebTechStackOverview`                  | Marquee pills array                                                                                  |
| `stackHeader`, `techs`, `techCategories` | `WebTechStackGrid`        | Header + filterable grid                                                                             |
| `openingHookParts`      | `WebMiscOpeningHook`                    | `ProsePart[]` with `muted`/`highlight`/`accent` emphasis                                            |
| `projectsHeader`, `projects`, `projectsSecondaryLink` | `WebWorkRecentProjects` | 4 entries currently in `RecentProjects.vue`                                       |
| `caseStudiesHeader`, `caseStudiesDescription`, `caseStudies` | `WebWorkCaseStudies` | 4 slides with stats, stack, problem, steps, result                              |
| `postsHeader`, `posts`, `postsSeeAll` | `WebWorkFeaturedPosts`     | 6 posts                                                                                              |
| `approachHeader`, `approachSteps` | `WebProcessWorkApproach`        | 3 cards                                                                                              |
| `lifecycleHeader`, `lifecycleSteps`, `lifecyclePanels`, `lifecycleArtifacts`, `lifecycleStats`, `lifecycleFooter` | `WebProcessProjectLifecycle` | 6 phases + 6 syntax-highlighted artifact `<pre>` blocks (HTML strings) |
| `cycleHeader`, `cyclePanels`, `cycleCta`, `cycleHint` | `WebProcessWorkCycle` | 6 panels, wheel hub                                                                       |
| `testimonialsHeader`, `featuredTestimonial`, `secondaryTestimonials`, `wideTestimonial` | `WebSocialClientTestimonials` | 1 featured + 1 small + 1 wide w/ chat snippet              |
| `recsHeader`, `recs`, `recsSummary` | `WebLinkedinPeerRecs`         | 7 LinkedIn recommendations + summary CTA                                                            |
| `linkedInCta`           | `WebLinkedinProfileCta`                 | Bundle of `eyebrow`, `headline`, `body`, `primaryCta`, `secondaryLink`, `stats`, `card`, `cardCallout` |
| `bookTalkHeader`, `bookTalkBullets`, `bookTalkFields`, `bookTalkFallback` | `WebMiscBookTalk` | 3 bullets + name/email/idea fields + email fallback link                       |
| `faqHeader`, `faqs`     | `WebMiscCommonQuestions`                | 5 FAQ entries                                                                                        |
| `footer*`               | `WebLayoutSiteFooter`                   | `brand`, `tagline`, `availability`, `groups[]`, `legal`, `backToTop`                                |
| `chatBot`, `chatQuickReplies`, `chatReplies`, `chatFallback` | `WebMiscChatBot` | Greeting + quick replies + match→reply table replacing the old if/else chain                  |

All literal copy, image URLs, dates, numbers, and link `href`s are taken **verbatim** from the pre-refactor component sources (which were captured in git history and in the prior plan's research). No paraphrasing.

### 4.3 Template structure

The `<template>` block is a flat list of sections in this order (matches the pre-refactor `landing.vue`):

```vue
<div>
  <WebLayoutSiteHeader :brand="brand" :nav="nav" :cta="headerCta" />
  <WebHeroMainHero v-bind="hero" />
  <WebTechStackOverview :pills="techPills" />
  <WebTechStackGrid :header="stackHeader" :techs="techs" :categories="techCategories" footnote="..." />
  <WebMiscOpeningHook :parts="openingHookParts" />
  <WebWorkRecentProjects :header="projectsHeader" :projects="projects" :secondary-link="projectsSecondaryLink" section-id="work" />
  <WebWorkCaseStudies :header="caseStudiesHeader" :description="caseStudiesDescription" :slides="caseStudies" />
  <WebWorkFeaturedPosts :header="postsHeader" :posts="posts" :see-all="postsSeeAll" section-id="posts" />
  <WebProcessWorkApproach :header="approachHeader" :steps="approachSteps" section-id="process" />
  <WebProcessProjectLifecycle :header="lifecycleHeader" :steps="lifecycleSteps" :panels="lifecyclePanels" :artifacts="lifecycleArtifacts" :stats="lifecycleStats" :footer="lifecycleFooter" />
  <WebProcessWorkCycle :header="cycleHeader" :panels="cyclePanels" :cta="cycleCta" :hint="cycleHint" />
  <WebSocialClientTestimonials :header="testimonialsHeader" :featured="featuredTestimonial" :secondary="secondaryTestimonials" :wide="wideTestimonial" section-id="words" />
  <WebLinkedinPeerRecs :header="recsHeader" :recs="recs" :summary="recsSummary" section-id="linkedin" />
  <WebLinkedinProfileCta v-bind="linkedInCta" />
  <WebMiscBookTalk :header="bookTalkHeader" :bullets="bookTalkBullets" :fields="bookTalkFields" :fallback="bookTalkFallback" section-id="talk" />
  <WebMiscCommonQuestions :header="faqHeader" :faqs="faqs" section-id="faq" />
  <WebLayoutSiteFooter :brand="brand" :tagline="footerTagline" :availability="footerAvailability" :groups="footerGroups" :legal="footerLegal" :back-to-top="footerBackToTop" />
  <WebMiscScrollToTop />
  <WebMiscChatBot :bot="chatBot" :quick-replies="chatQuickReplies" :replies="chatReplies" :fallback="chatFallback" />
</div>
```

### 4.4 Implementation strategy (handles the previous payload-size issue)

The earlier attempt to write `landing.vue` in one shot kept failing on the editor harness because the file is large (~600 lines of typed data). Mitigations:

1. **Write the file in stages.** First write a skeleton (`<script setup>` with imports + empty consts, `<template>` with all components but bound to `undefined`-tolerant slots commented out). Then use `StrReplace` to fill in one const at a time. This keeps each tool payload small.
2. **Order of fills:** smallest sections first (`brand`, `nav`, `chatBot`) → largest (`lifecycleArtifacts`, `caseStudies`). Run typecheck after each batch of 3-4 sections to catch shape drift early.
3. **Inline HTML strings** (hero headline highlight, lifecycle artifacts, work-cycle panel `body` with `<em>`, peer rec quotes with `<em>`) live as plain template literals. No string concatenation tricks needed since Vue's `v-html` consumes them.

### 4.5 Type-safety guardrail

Every const must be annotated with its imported type so a missing/extra field surfaces at typecheck:

```ts
import type {
  Brand, NavLink, Cta, Project, CaseStudySlide, Post,
  ApproachStep, LifecyclePanel, LifecycleArtifact,
  WorkCyclePanel, Testimonial, WideTestimonial, Rec, RecsSummary,
  Tech, TechCategoryFilter, TechPill, ProsePart,
  StatItem, BadgeContent, FormField, BookTalkBullet, Faq,
  ChatBot, ChatReply, FooterGroup, LinkedInCard, HeroImage, HeroCodeSnippet,
} from "~/components/web/types";

const projects: Project[] = [/* ... */];
const recs: Rec[] = [/* ... */];
// etc.
```

## 5. Acceptance criteria

1. Visiting `/landing` renders a page that is **visually identical** to the pre-refactor landing page (same sections in the same order, same copy, same images, same colors).
2. `pnpm nuxt typecheck` (or the project's configured typecheck command) passes with **zero errors** in `landing.vue` and any `app/components/web/**` file.
3. Every interactive element works:
   - Theme toggle in `WebLayoutSiteHeader` flips light/dark and persists to `localStorage`.
   - Tech grid category chips filter the grid; hover updates the live readout.
   - Tech overview marquee animates and pauses on hover.
   - Case studies, featured posts, peer recs carousels navigate with prev/next buttons.
   - Project lifecycle tabs switch panels and artifacts; autoplay button starts/stops.
   - Work-cycle wheel highlights the active phase; spin button cycles through.
   - FAQ `<details>` accordions open/close.
   - Contact form replaces the submit button label on submit and resets fields.
   - Scroll-to-top button appears past 400px and scrolls smoothly.
   - Chat bot opens, accepts input, and replies based on the data-driven `chatReplies` table — not a hard-coded if/else.
4. No literal copy strings remain anywhere under `app/components/web/**` (other than icon SVGs and structural labels like "Connect" / "Message" buttons inside the LinkedIn card preview, which are part of the visual mock).
5. The `landing.vue` file itself is **the only place** that needs editing to change page copy, links, images, projects, testimonials, FAQs, etc.

## 6. Risks and mitigations

| Risk                                                  | Mitigation                                                                                          |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Carousel logic relies on globally-scoped IDs (`csTrack`, `fpTrack`, `recTrack`, `lcRail`, `pcWheel`) | Those IDs are preserved in the refactored components. No JS to wire up.       |
| HTML strings in `lifecycleArtifacts` / `recs.quote` / `cyclePanels.body` could XSS if sourced from CMS | Out of scope — content is author-controlled in `landing.vue`. Add sanitization later when CMS lands. |
| Inline theme-bootstrap script in `useHead` must run **before paint** | Keep `tagPosition: "head"` exactly as it was pre-refactor.                                  |
| Prop name drift between `landing.vue` and component `defineProps` | The strong type imports in §4.5 force compile-time alignment.                                  |
| Large file slows down editor / agent payloads        | Use the staged-write strategy in §4.4. Or, if it becomes a real problem, accept a one-off escape hatch: extract data into a sibling `landing.data.ts` (still inlined, just split across two files) — note this would deviate from the original plan's "single source of truth" rule and should require sign-off. |

## 7. Open questions

1. **Storyblok wiring later?** — The current PRD ends at "props-driven, demo wired locally." A follow-up PRD should cover mapping each section's prop shape to a Storyblok blok schema. Does that follow-up belong in this repo's `.cursor/docs/` or in a Storyblok-specific space?
2. **Do we want a fixture file** (`landing.data.ts`) even now, to keep `landing.vue` template-only? The original plan said no; calling it out again here in case the file size in §6 becomes painful in practice.
3. **Should the `chatReplies` shape eventually support regex matching** (the original code had no regex, just substring includes)? Current plan keeps `string[]` matchers for simplicity.

## 8. Out-of-band cleanup

Two unrelated items noticed during this work — flagging here so they don't get lost:

- `app/components/web/misc/FloatingActions.vue` exists but is not referenced anywhere. Either delete or wire it into the page.
- `app/components/landing/*` (`HeroSection.vue`, `TechStackSection.vue`, `TestimonialsSection.vue`, `LinkedInCtaSection.vue`, `HowIWorkSection.vue`) appears to be an older parallel implementation of the same sections. After `landing.vue` is rebuilt against `app/components/web/*`, the `app/components/landing/` folder can likely be deleted. Confirm with the team before removal.

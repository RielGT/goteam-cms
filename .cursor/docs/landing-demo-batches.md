# Landing Demo — Batched Implementation Plan

**Status:** Ready
**Owner:** Frontend
**Last updated:** 2026-05-26
**Companion to:** [`landing-demo-prd.md`](./landing-demo-prd.md)

---

## 0. Purpose

The PRD (`landing-demo-prd.md`) describes the full scope of wiring every `app/components/web/*` component into `app/pages/public/landing.vue`. That file ends up at ~600 lines of typed content and has previously failed to write in a single shot.

This document groups the work into **6 self-contained batches**. Each batch:

- Adds a coherent slice of content + template usage.
- Leaves `landing.vue` in a **renderable, type-checking** state.
- Is independently verifiable in the browser at `/landing`.

Run typecheck (`pnpm nuxt typecheck` or equivalent) at the end of every batch. Do not start the next batch until the current one is green.

---

## 1. Pre-flight (one-time, not a batch)

Before Batch 1:

1. Confirm `app/pages/public/landing.vue` is the current placeholder (script setup with page meta + empty `<div>`).
2. Confirm all 18 components under `app/components/web/**` exist and compile in isolation.
3. Confirm `app/components/web/types.ts` exports every type the PRD lists in §4.5.

If any of those are false, fix them before starting Batch 1 — do **not** roll them into a batch.

---

## 2. Batch overview

| Batch | Theme                  | Components wired                                                                 | Approx. lines added | Risk  |
| ----- | ---------------------- | -------------------------------------------------------------------------------- | ------------------- | ----- |
| 1     | Shell + hero           | `SiteHeader`, `MainHero`, `SiteFooter`, `ScrollToTop`                            | ~90                 | Low   |
| 2     | Tech + opening hook    | `StackOverview`, `StackGrid`, `OpeningHook`                                      | ~110                | Med   |
| 3     | Work showcase          | `RecentProjects`, `CaseStudies`, `FeaturedPosts`                                 | ~150                | High  |
| 4     | Process                | `WorkApproach`, `ProjectLifecycle`, `WorkCycle`                                  | ~140                | High  |
| 5     | Social proof + contact | `ClientTestimonials`, `PeerRecs`, `ProfileCta`, `BookTalk`, `CommonQuestions`    | ~110                | Med   |
| 6     | ChatBot + polish       | `ChatBot`, FAQ tidy-up, theme bootstrap verify, full-page QA                     | ~40                 | Low   |

Total: 18 components, ~640 lines, 6 batches.

---

## 3. Batch details

### Batch 1 — Shell + hero (skeleton everything renders inside)

**Goal:** the page has a header, a hero, a footer, and the floating scroll-to-top — i.e. a working chrome that subsequent batches drop sections into.

**Edits to `landing.vue`:**

- Add type imports for `Brand`, `NavLink`, `Cta`, `HeroImage`, `HeroCodeSnippet`, `BadgeContent`, `FooterGroup`.
- Add consts: `brand`, `nav`, `headerCta`, `hero` (with `availability`, `headline`, `subheadline`, `ctas`, `image`, `codeSnippet`, `floatingBadge`), `footerTagline`, `footerAvailability`, `footerGroups`, `footerLegal`, `footerBackToTop`.
- Template gets `WebLayoutSiteHeader`, `WebHeroMainHero`, `WebLayoutSiteFooter`, `WebMiscScrollToTop`.

**Acceptance:**

- `/landing` renders header + hero + footer + scroll-to-top.
- Theme toggle in header works and persists.
- Typecheck green.

---

### Batch 2 — Tech overview + grid + opening hook

**Goal:** below the hero, the visitor sees the marquee, the filterable tech grid, and the opening hook prose.

**Edits:**

- Add types `Tech`, `TechCategoryFilter`, `TechPill`, `ProsePart`, `SectionHeaderContent`.
- Consts: `techPills` (marquee), `stackHeader`, `techs`, `techCategories`, `openingHookParts`.
- Template inserts (between hero and footer): `WebTechStackOverview`, `WebTechStackGrid`, `WebMiscOpeningHook`.

**Acceptance:**

- Marquee animates, pauses on hover.
- Category chips filter the grid; hover updates live readout.
- Opening hook prose styles applied to `muted`/`highlight`/`accent` parts.

---

### Batch 3 — Work showcase (projects + case studies + posts)

**Goal:** the meaty portfolio section. This is the largest batch by data volume.

**Edits:**

- Types: `Project`, `CaseStudySlide`, `CaseStudyStep`, `Post`, `StatItem`.
- Consts: `projectsHeader`, `projects` (4 entries), `projectsSecondaryLink`, `caseStudiesHeader`, `caseStudiesDescription`, `caseStudies` (4 slides — each with `stats`, `stack`, `steps`), `postsHeader`, `posts` (6 entries), `postsSeeAll`.
- Template: `WebWorkRecentProjects`, `WebWorkCaseStudies`, `WebWorkFeaturedPosts`.

**Strategy:** fill `projects` first, typecheck. Then `caseStudies`, typecheck. Then `posts`. Do **not** paste all three in a single edit — each is ~50 lines.

**Acceptance:**

- Case studies and featured posts carousels navigate prev/next.
- Section IDs (`work`, `posts`) are wired so header nav anchors land correctly.

---

### Batch 4 — Process (approach + lifecycle + work cycle)

**Goal:** the three process sections. Lifecycle is the most complex because of the syntax-highlighted artifacts.

**Edits:**

- Types: `ApproachStep`, `LifecyclePanel`, `LifecycleBullet`, `LifecycleStep`, `LifecycleArtifact`, `WorkCyclePanel`, `WorkCycleCard`.
- Consts: `approachHeader`, `approachSteps` (3), `lifecycleHeader`, `lifecycleSteps` (6), `lifecyclePanels` (6 with bullets), `lifecycleArtifacts` (6 syntax-highlighted HTML strings), `lifecycleStats`, `lifecycleFooter`, `cycleHeader`, `cyclePanels` (6 with `cards`), `cycleCta`, `cycleHint`.
- Template: `WebProcessWorkApproach`, `WebProcessProjectLifecycle`, `WebProcessWorkCycle`.

**Strategy:** approach (smallest) → work cycle → lifecycle (largest, do artifacts last). Typecheck between each.

**Acceptance:**

- Lifecycle tabs switch panels and artifacts; autoplay toggles.
- Work-cycle wheel rotates; spin button advances active phase.
- `section-id="process"` lands header anchor here.

---

### Batch 5 — Social proof + contact

**Goal:** testimonials, LinkedIn recs, LinkedIn CTA card, book-a-talk form, FAQ.

**Edits:**

- Types: `Testimonial`, `WideTestimonial`, `TestimonialChat`, `Rec`, `RecsSummary`, `LinkedInCard`, `FormField`, `BookTalkBullet`, `Faq`.
- Consts: `testimonialsHeader`, `featuredTestimonial`, `secondaryTestimonials`, `wideTestimonial`, `recsHeader`, `recs` (7), `recsSummary`, `linkedInCta` (bundle), `bookTalkHeader`, `bookTalkBullets` (3), `bookTalkFields` (name/email/idea), `bookTalkFallback`, `faqHeader`, `faqs` (5).
- Template: `WebSocialClientTestimonials`, `WebLinkedinPeerRecs`, `WebLinkedinProfileCta`, `WebMiscBookTalk`, `WebMiscCommonQuestions`.

**Acceptance:**

- Peer-recs carousel navigates.
- Contact form swaps submit label, resets fields.
- FAQ `<details>` accordions open/close.
- Anchors `words`, `linkedin`, `talk`, `faq` jump correctly.

---

### Batch 6 — ChatBot + final polish

**Goal:** wire the chat widget and do an end-to-end QA pass.

**Edits:**

- Types: `ChatBot`, `ChatReply`.
- Consts: `chatBot`, `chatQuickReplies`, `chatReplies` (substring matchers), `chatFallback`.
- Template: `WebMiscChatBot`.

**Polish checklist:**

- Verify theme bootstrap inline script runs head-position and prevents flash on reload.
- Re-run the full PRD §5 acceptance list manually.
- Run typecheck one last time.
- Decide on the §8 cleanup items: delete `app/components/landing/*` if unused; either wire or delete `app/components/web/misc/FloatingActions.vue`.

---

## 4. Verification commands (run after every batch)

```bash
pnpm nuxt typecheck
pnpm dev
# then open http://localhost:3000/landing
```

If typecheck fails, fix **before** moving on. Don't accumulate type errors across batches.

---

## 5. Rollback strategy

Each batch is a single commit. If a batch goes sideways:

```bash
git reset --hard HEAD~1
```

…and re-attempt that batch only. Previous batches stay green.

Suggested commit message format:

```
landing demo batch N: <theme>
```

e.g. `landing demo batch 3: work showcase (projects, case studies, posts)`.

---

## 6. Open questions deferred to the PRD

See `landing-demo-prd.md` §7 — Storyblok wiring, fixture-file split, regex matchers for chat. None of those block any batch here.

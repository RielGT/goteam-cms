---
name: brand-design-review
description: Audit a Vue component, page, or screenshot against the alex.dev brand style guide and produce a prioritized issue list with fixes. Use when the user asks for a brand review, design review, style audit, accessibility check on UI, or wants to know if a component is on-brand.
---

# Brand Design Review

Audit UI work against `.cursor/docs/brand-style-guide.md` and report deviations with concrete fixes.

## Quick Start

1. Read `.cursor/docs/brand-style-guide.md` (focus on §§ 3, 4, 5, 7–11 plus any section matching the component type).
2. Read the target file(s) or inspect the provided screenshot/markup.
3. Walk the checklist below.
4. Output a prioritized report using the template at the bottom.

## Audit Checklist

### Color

- [ ] All colors use brand tokens (`brand-purple`, `brand-green`, `brand-orange`, `paper`, `ink`, `zinc-*`) — no arbitrary hex
- [ ] Background tints stay in `/5 → /20`; border tints in `/20 → /30`
- [ ] Brand-color text used only for eyebrows / inline emphasis / metric numbers — never paragraphs
- [ ] Light + dark variants both present for every colored element

### Typography

- [ ] `font-display` (Space Grotesk) only on headings and large numbers
- [ ] `font-mono` (JetBrains Mono) only on eyebrows, tags, code, micro-labels
- [ ] Inter is used for body; no body text in display or mono
- [ ] No `uppercase` text-transform anywhere
- [ ] Eyebrows are lowercase and start with `/`

### Spacing & Layout

- [ ] Container uses one of: `max-w-6xl` / `max-w-4xl` / `max-w-5xl` with `px-5 sm:px-8`
- [ ] Major section padding is `py-24 sm:py-32` (or documented variant)
- [ ] Grid splits match brand guide §5.4 (7/5, 8/4, 3/2)
- [ ] Mobile collapses to single column with `gap-8 lg:gap-14`

### Buttons & CTAs

- [ ] All actions are `rounded-full` (pill) — no `rounded-md` / `rounded-lg`
- [ ] Primary uses `bg-brand-purple text-white px-6 py-3.5`
- [ ] Hover applies `-translate-y-0.5` lift + color swap
- [ ] Only one primary CTA per row; paired with a ghost link if needed

### Forms

- [ ] Inputs are `rounded-xl` (not pill)
- [ ] Labels are `font-mono text-xs text-zinc-500 mb-2`
- [ ] Focus state = purple border + `ring-2 ring-brand-purple/20`

### Accessibility

- [ ] Contrast pairs cross-checked against brand guide §3.8
- [ ] No small body text in `text-brand-purple` or `text-brand-green`
- [ ] Focus rings visible on all interactive elements
- [ ] Semantic HTML (`<section>`, `<nav>`, headings ordered without skips)

### Voice

- [ ] Copy is lowercase, conversational, contractions OK
- [ ] No marketing superlatives ("world-class", "cutting-edge")
- [ ] One personality moment max per section (squiggle / sticker / hand-arrow)

## Report Template

```markdown
# Brand Review — [component or page name]

## Summary
[1-2 sentences: overall on-brand verdict]

## Critical (must fix)
- 🔴 **[Issue]** — Cite brand guide section. Current: `class="..."`. Fix: `class="..."`.

## Suggestions (should fix)
- 🟡 **[Issue]** — ...

## Nice to Have
- 🟢 **[Issue]** — ...

## Passes
- ✅ [What's already on-brand and worth keeping]
```

## Priority Heuristic

- 🔴 **Critical**: accessibility failures, wrong primary color, broken type hierarchy, raw hex values
- 🟡 **Suggestion**: spacing inconsistencies, missing dark mode, suboptimal token choice
- 🟢 **Nice to have**: motion polish, copy tweaks, micro-detail (stickers, eyebrow rotation)

## Hand-Off

After the report, list the exact files and line numbers to edit, and suggest whether the work belongs to the **UI/UX and Branding Designer** (spec change) or the **Creative Frontend Developer** (code change).

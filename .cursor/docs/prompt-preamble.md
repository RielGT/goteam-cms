# Prompt Preamble Templates

Copy-paste the relevant preamble at the top of your brief before sending it to the agent.
The agent reads the preamble to activate the right pipeline, agents, and defaults.

---

## Minimal preamble (all page types)

Paste this at the top of every prompt. Fill in `[BRIEF]` with one sentence.

```
Use the multi-agent pipeline defined in .cursor/agents/.
Detect mode automatically (Storyblok if .storyblok/ exists, otherwise static).
Do not ask follow-up questions — infer defaults and log all assumptions in agent-changes.md.

Brief: [BRIEF]
```

---

## New landing page

```
Use the multi-agent pipeline defined in .cursor/agents/.
Detect mode automatically (Storyblok if .storyblok/ exists, otherwise static).
Do not ask follow-up questions — infer defaults and log all assumptions in agent-changes.md.
Page type: landing page
Pipeline: seo-strategist → content-writer → ui-ux-designer → storyblok-schema (if Storyblok mode) → frontend-implementer + asset-creator (parallel) → accessibility-auditor + performance-auditor + seo-validator (parallel) → change-summarizer

Brief: [One sentence describing the landing page and its main offer or feature]
```

**Optional modifiers you can append:**
- `+a11y` — force accessibility audit (already on by default for landing pages)
- `mode:static` or `mode:storyblok` — override auto-detection
- `+strict` — fail on any audit warning, not just failures

---

## New blog post

```
Use the multi-agent pipeline defined in .cursor/agents/.
Detect mode automatically (Storyblok if .storyblok/ exists, otherwise static).
Do not ask follow-up questions — infer defaults and log all assumptions in agent-changes.md.
Page type: blog post
Pipeline: seo-strategist → content-writer → frontend-implementer + asset-creator (parallel) → performance-auditor + seo-validator (parallel) → change-summarizer
Skip: ui-ux-designer (use existing blog template)
Accessibility audit: opt-in only — add +a11y to brief if needed

Brief: [One sentence describing the blog post topic]
```

---

## New case study

```
Use the multi-agent pipeline defined in .cursor/agents/.
Detect mode automatically (Storyblok if .storyblok/ exists, otherwise static).
Do not ask follow-up questions — infer defaults and log all assumptions in agent-changes.md.
Page type: case study
Pipeline: seo-strategist → content-writer → ui-ux-designer → storyblok-schema (if Storyblok mode, reuse-first) → frontend-implementer + asset-creator (parallel) → performance-auditor + seo-validator (parallel) → change-summarizer

Brief: [One sentence describing the customer, outcome, or story angle]
```

---

## Pricing page revision

```
Use the multi-agent pipeline defined in .cursor/agents/.
Detect mode automatically (Storyblok if .storyblok/ exists, otherwise static).
Do not ask follow-up questions — infer defaults and log all assumptions in agent-changes.md.
Page type: pricing revision
Pipeline: content-writer → frontend-implementer → performance-auditor + seo-validator (parallel) → change-summarizer
Skip: seo-strategist, ui-ux-designer (modifying existing page structure only)

Brief: [One sentence describing what changed — e.g. "Add the new $99/month Starter tier"]
```

---

## Legal page

```
Use the multi-agent pipeline defined in .cursor/agents/.
Detect mode automatically (Storyblok if .storyblok/ exists, otherwise static).
Do not ask follow-up questions — infer defaults and log all assumptions in agent-changes.md.
Page type: legal
Pipeline: content-writer → frontend-implementer → accessibility-auditor + performance-auditor + seo-validator (parallel) → PAUSE for human legal approval → change-summarizer
Accessibility audit: required (legal pages always opt-in)

Brief: [One sentence — e.g. "Legal page for the updated terms of service, effective June 2026"]
```

> **Note:** The pipeline pauses before `change-summarizer` and waits for you to confirm legal approval before finalizing the summary.

---

## Performance fix

```
Use the multi-agent pipeline defined in .cursor/agents/.
Detect mode automatically (Storyblok if .storyblok/ exists, otherwise static).
Do not ask follow-up questions — infer defaults and log all assumptions in agent-changes.md.
Page type: performance fix
Pipeline: performance-auditor (diagnose) → frontend-implementer (fix per audit findings) → performance-auditor (re-run) → change-summarizer

Brief: [Route and observed issue — e.g. "/solutions/healthcare — LCP is 4.2s on mobile"]
```

---

## Accessibility audit only (opt-in)

```
Use the multi-agent pipeline defined in .cursor/agents/.
Detect mode automatically (Storyblok if .storyblok/ exists, otherwise static).
Do not ask follow-up questions.
Run: accessibility-auditor only
Page: [route, e.g. /about]
```

---

## Tips

- **Richer briefs override defaults.** The more context you give, the fewer `[PLACEHOLDER]` items end up in the output. Example: *"Landing page for the new AI export feature, targeting data engineers, primary CTA is 'Start free trial'."*
- **Check `agent-changes.md`** after each run — it lists every assumption made and every placeholder left for you to fill.
- **Storyblok reuse.** In Storyblok mode, `storyblok-schema` will reuse or extend existing blocks before creating new ones. The reuse ratio is reported in `agent-changes.md`.
- **Retry budget.** Each quality gate (performance, SEO, a11y) retries up to 3 times automatically. If all 3 fail, the agent halts and writes the full trace to `agent-changes.md` — check there first before re-running.

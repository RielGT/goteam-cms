---
name: run-axe-audit
description: Run axe-core accessibility audit against rendered HTML. Returns WCAG violations grouped by severity. Use when a page needs WCAG AA accessibility verification before handoff. Only invoked when accessibility-auditor subagent is opted in.
---

# Run axe Accessibility Audit

## When to use
- Opt-in accessibility verification after a page is implemented
- Checking for WCAG AA violations on landing pages or legal pages

## Prerequisites
- `npm install --save-dev axe-core` must be available
- Nuxt dev server running

## Steps
1. Ensure dev server is running: `npm run dev`
2. Run: `npx axe <url> --reporter json > axe-results.json`
3. Parse results, group violations by impact: critical → serious → moderate → minor
4. Map each violation to its WCAG success criterion
5. Return structured report

## Output format
```json
{
  "url": "...",
  "pass": true | false,
  "violations": {
    "critical": [],
    "serious": [],
    "moderate": [],
    "minor": []
  },
  "wcag_criteria_failed": []
}
```

## Notes
- Do not fix violations — report only. Fixes are the frontend-implementer's job.
- A page passes if there are zero critical or serious violations.

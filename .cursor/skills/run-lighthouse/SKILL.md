---
name: run-lighthouse
description: Run Lighthouse audit on a URL or local route. Parse results into a structured Core Web Vitals report. Use when checking page performance, debugging LCP/CLS/INP issues, or verifying performance budgets before page handoff.
---

# Run Lighthouse

## When to use
- Verifying performance after implementing a page
- Diagnosing why a page failed the performance gate
- Comparing performance before/after a change

## Steps
1. Start the Nuxt dev server if not running: `npm run dev`
2. Run the audit: `node ./scripts/lighthouse-audit.js <url>`
3. Parse the JSON output for: LCP, CLS, INP, TBT, Speed Index
4. Apply gates: LCP > 2.5s = FAIL, CLS > 0.1 = FAIL, INP > 200ms = FAIL
5. Return a structured report with PASS/FAIL per metric and the LCP-causing element if FAIL

## Output format
```json
{
  "url": "...",
  "gates": { "lcp": "PASS|FAIL", "cls": "PASS|FAIL", "inp": "PASS|FAIL" },
  "metrics": { "lcp_ms": 0, "cls": 0, "inp_ms": 0 },
  "failure_reasons": []
}
```

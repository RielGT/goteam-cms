---
name: seo-validate-html
description: Validate rendered HTML for SEO requirements: meta tags, canonical URL, JSON-LD schema parses correctly, single H1, heading hierarchy, sitemap inclusion. Use at quality-gate stage after a page is implemented.
---

# SEO Validate HTML

## When to use
- Quality-gate check after a page is implemented
- Verifying SEO compliance before developer handoff

## Steps
1. Fetch the rendered HTML: `curl -s http://localhost:3000/<route>`
2. Check each gate below and record PASS/FAIL

## Gates

| Check | Pass condition |
|-------|---------------|
| `<title>` | Present, 30–60 characters |
| `<meta name="description">` | Present, 120–160 characters |
| Canonical `<link rel="canonical">` | Present, absolute URL, matches current route |
| H1 count | Exactly one H1 |
| Heading hierarchy | No skipped levels (H1→H2→H3, never H1→H3) |
| JSON-LD | Present, parses as valid JSON, `@type` matches expected schema.org type |
| OG tags | `og:title`, `og:description`, `og:image` all present |
| `og:image` size | References a 1200×630 image |
| Sitemap | Route appears in `/sitemap.xml` (if sitemap auto-generation is configured) |

## Output format
```json
{
  "url": "...",
  "pass": true | false,
  "gates": {
    "title": "PASS|FAIL",
    "meta_description": "PASS|FAIL",
    "canonical": "PASS|FAIL",
    "h1_count": "PASS|FAIL",
    "heading_hierarchy": "PASS|FAIL",
    "json_ld": "PASS|FAIL",
    "og_tags": "PASS|FAIL",
    "sitemap": "PASS|FAIL"
  },
  "failures": []
}
```

## Notes
- Do not fix failures — report only. Fixes go to seo-validator subagent feedback loop.

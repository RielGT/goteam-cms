---
name: generate-og-card
description: Generate an Open Graph card image at 1200x630 using the brand template with a given headline. Use when a new page needs an OG image for social sharing.
---

# Generate OG Card

## When to use
- A new page is being created and needs an OG/social share image
- Replacing a missing or placeholder OG image

## Steps
1. Locate the brand OG template in `.cursor/skills/generate-og-card/templates/og-template.html`
2. Substitute `{{HEADLINE}}`, `{{DESCRIPTION}}`, and `{{LOGO_URL}}` with the page's values
3. Render the HTML to a 1200×630 PNG using a headless browser: `node .cursor/skills/generate-og-card/render.js "<headline>" "<description>"`
4. Optimize the output with the `optimize-image` skill
5. Place the result in `public/og/<slug>.png`
6. Verify dimensions are exactly 1200×630

## Output
- File: `public/og/<page-slug>.png`
- Size: 1200×630 px
- Format: PNG (converted to WebP by optimize-image if supported)

## Notes
- Never invent brand colors — read them from `assets/css/main.css` `@theme` block.
- If no logo is found, use text-only template.

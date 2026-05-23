---
name: optimize-image
description: Convert an image to WebP with appropriate dimensions for a given component slot. Use when adding images to a page or after generating assets like OG cards.
---

# Optimize Image

## When to use
- Adding a new hero image, OG card, or any raster asset to the project
- Converting existing images to WebP for performance

## Steps
1. Identify the target component slot and its max rendered width (e.g. hero: 1440px, card: 480px)
2. Run: `npx sharp-cli --input <source> --output <dest>.webp --format webp --quality 85 --resize <width>`
3. Generate a low-quality placeholder (LQIP): `npx sharp-cli --input <source> --output <dest>-lqip.webp --quality 20 --resize 32`
4. Verify output file size is reasonable (hero: < 200KB, card: < 60KB)
5. Return the output path and LQIP path

## Accepted input formats
- JPG, PNG, GIF, AVIF, TIFF

## Output format
```json
{
  "source": "...",
  "output": "...",
  "lqip": "...",
  "format": "webp",
  "width": 0,
  "size_kb": 0,
  "pass": true | false
}
```

## Notes
- Never upscale. If source is smaller than target width, use source dimensions.
- All images placed via `<NuxtImg>` — never raw `<img>`.

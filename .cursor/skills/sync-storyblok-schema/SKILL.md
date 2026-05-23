---
name: sync-storyblok-schema
description: Push block schema definitions from .storyblok/components/ to the Storyblok management API. Targets the development space by default. Use when block schemas have been added or modified and need to be visible in the Storyblok editor. Storyblok mode only.
---

# Sync Storyblok Schema

## When to use
After the storyblok-schema subagent has created or modified block definitions. Storyblok mode only.

## Steps
1. Read all `.json` files in `.storyblok/components/`
2. Diff against current schema in the target Storyblok space (via management API)
3. Apply additions and modifications. Never deletions without explicit confirmation.
4. Report what changed.

## Environment
Reads `STORYBLOK_MANAGEMENT_TOKEN` from `.env`. Defaults to `STORYBLOK_SPACE_DEV`; override with `STORYBLOK_SPACE`.

## Script
Run: `node .cursor/skills/sync-storyblok-schema/scripts/sync.js`

## Output
Structured diff: components added, modified, unchanged. Production space is never written to by this skill.

```json
{
  "space": "dev",
  "added": [],
  "modified": [],
  "unchanged": [],
  "skipped_deletions": []
}
```

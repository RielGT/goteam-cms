# Preamble Prompts — Design → Build

Designer runs first, stops for approval, then the developer builds.

---

## A — Generic

```
Run `.cursor/agents/ui-ux-branding-designer.md` first, then
`.cursor/agents/creative-frontend-developer.md` only after I approve the spec.

Task: <what you want>
```

---

## B — New page

```
Design then build a new page at `app/pages/public/<route>.vue`.
Use `.cursor/agents/ui-ux-branding-designer.md` → wait for my approval →
`.cursor/agents/creative-frontend-developer.md`.

Purpose: <one line>
Sections: <hero, …>
```

---

## C — New component

```
Design then build a new component in `app/components/web/<domain>/`.
Use `.cursor/agents/ui-ux-branding-designer.md` → wait for approval →
`.cursor/agents/creative-frontend-developer.md`.

Component: <PascalName>
Purpose: <one line>
```

---

## D — Audit + fix

```
Audit <file> with `.cursor/skills/brand-design-review/SKILL.md`,
then spec fixes via `.cursor/agents/ui-ux-branding-designer.md`,
then apply with `.cursor/agents/creative-frontend-developer.md` after I approve.
```

---

**Rules:** Designer never edits `.vue` files. Developer waits for "approved". Brand guide (`.cursor/docs/brand-style-guide.md`) wins on conflicts.

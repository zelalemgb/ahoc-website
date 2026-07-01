# Contributing

## Workflow

1. Branch from `main`: `feat/…`, `fix/…`, `chore/…`.
2. Keep PRs focused. CI (type-check, lint, build) must pass.
3. Use [Conventional Commits](https://www.conventionalcommits.org/):
   `feat: add event detail route`, `fix: correct am locale fallback`.

## Conventions

- **TypeScript strict** — no `any` without cause.
- **Styling** — Tailwind + semantic tokens (see `docs/BRAND.md`). No raw hex in
  components.
- **i18n** — never hard-code user-facing strings; add keys to
  `src/messages/{en,am}.json`. Content strings belong in Sanity.
- **Components** — `ui/` = design-system primitives, `layout/` = page chrome,
  `sections/` = composed page sections.
- **Server-first** — default to Server Components; add `'use client'` only when
  interactivity requires it.

## Before pushing

```bash
npm run format
npm run lint
npm run typecheck
npm run build
```

Husky + lint-staged run the first three on staged files at commit time.

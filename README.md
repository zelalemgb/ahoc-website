# Addis House of Culture — Website

Official website for **Addis House of Culture (AHOC)**, a cultural centre in Addis Ababa — art gallery, audiovisual centre, library & shop, and café. Bilingual (English / Amharic).

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **next-intl**, and **Sanity** as the headless CMS.

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
#    → fill in your Sanity project id (create one at sanity.io/manage)

# 3. Run the dev server
npm run dev
```

- App: <http://localhost:3000> (redirects to `/en`)
- Studio (CMS): <http://localhost:3000/studio>

The site builds and runs **without** Sanity credentials — content simply falls
back to empty until a dataset is connected (see `src/sanity/env.ts`).

## Scripts

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start the dev server                 |
| `npm run build`     | Production build                     |
| `npm run start`     | Serve the production build           |
| `npm run lint`      | ESLint (next/core-web-vitals)        |
| `npm run typecheck` | `tsc --noEmit`                       |
| `npm run format`    | Prettier write                       |

## Project structure

```
src/
├── app/
│   ├── [locale]/          # Localised routes (en, am) — pages live here
│   ├── studio/            # Embedded Sanity Studio at /studio
│   ├── api/revalidate/    # Sanity webhook → on-demand revalidation
│   ├── robots.ts · sitemap.ts
│   └── globals.css        # Design tokens + Tailwind layers
├── components/
│   ├── layout/            # Header, Footer, LocaleSwitcher, PageShell
│   └── ui/                # Arch, Button, Logo (design-system primitives)
├── i18n/                  # next-intl routing / request / navigation
├── messages/              # en.json, am.json (UI strings)
├── lib/                   # utilities
└── sanity/                # env, client, image, queries, schema types, structure
```

## Documentation

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — stack, rendering, data flow, i18n
- [`docs/BRAND.md`](docs/BRAND.md) — colour tokens, type, the arch motif
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — branching, commits, conventions

## Deployment

Optimised for **Vercel** (or any Node host). If the site must run on the current
cPanel/LiteSpeed host, add `output: 'export'` for a static build — note that
disables server features (on-demand revalidation, the embedded Studio, image
optimisation), so a Node host is recommended. See `docs/ARCHITECTURE.md`.

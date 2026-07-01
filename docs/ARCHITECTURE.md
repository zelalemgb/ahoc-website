# Architecture

## Stack

| Concern        | Choice                              | Why                                                            |
| -------------- | ----------------------------------- | ------------------------------------------------------------- |
| Framework      | Next.js 15 (App Router)             | SSR/SSG for SEO, React Server Components, mature ecosystem     |
| Language       | TypeScript (strict)                 | Safety across content models and components                   |
| Styling        | Tailwind CSS + CSS variable tokens  | Fast, consistent; tokens re-themeable without a rebuild       |
| i18n           | next-intl                           | First-class App Router support, `/en` + `/am` prefixes        |
| CMS            | Sanity (embedded Studio at /studio) | Structured content, real-time editing, generous free tier     |
| Hosting        | Vercel (recommended)                | Zero-config Next.js; ISR + on-demand revalidation             |

## Rendering & data flow

- Pages are **React Server Components** and statically rendered per locale
  (`generateStaticParams` + `setRequestLocale`).
- Content is fetched from Sanity via `src/sanity/lib/fetch.ts`, a thin wrapper
  that adds `revalidate` and **falls back gracefully** when Sanity isn't
  configured or a request fails — so the app always builds and renders.
- Sanity publishes trigger the webhook at `POST /api/revalidate` (shared
  secret), which calls `revalidatePath` for near-instant content updates
  without a redeploy.

## Internationalisation

- Locales: `en`, `am` (see `src/i18n/routing.ts`). Prefix is always shown.
- UI strings live in `src/messages/*.json`.
- **Content** is localised inside Sanity via the `localeString` / `localeText`
  objects (EN + AM on the same document), read per active locale on the front
  end.
- `middleware.ts` handles locale detection/redirects and excludes `/studio`,
  `/api`, and static assets.

## Content model (Sanity)

| Type          | Purpose                                             |
| ------------- | --------------------------------------------------- |
| `siteSettings`| Singleton — title, tagline, description, socials    |
| `event`       | Dynamic Events module (date range → On View tiers)  |
| `space`       | Gallery, Audiovisual, Library & Shop, Café          |
| `newsPost`    | News & Stories                                      |
| `page`        | Generic editorial pages (About, Visit, Support…)    |
| `staffMember` | Team & governance; author references                |

## Deployment options

1. **Vercel / Node host (recommended).** Full feature set: ISR, on-demand
   revalidation, image optimisation, embedded Studio.
2. **Static export to cPanel/LiteSpeed.** Set `output: 'export'` in
   `next.config.mjs`. Trade-offs: no server-side revalidation (rebuild to
   publish), no image optimisation, host the Studio separately
   (`sanity deploy`). Given AHOC's current host is cPanel/LiteSpeed, decide
   between moving to a Node host or accepting these constraints before launch.

## Roadmap seams (intentional TODOs)

- Wire home programming tiers + `/whats-on` to `event` queries.
- Event/space/news detail routes (`[slug]`) with Portable Text rendering.
- Ticketing: embed a provider on `/tickets` (islands) or link out per event.
- Sanity typegen (`sanity typegen`) for end-to-end typed queries.
- Analytics + consent, and a newsletter integration.

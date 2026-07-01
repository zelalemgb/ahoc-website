# Brand in code

The design tokens live in `src/app/globals.css` (CSS variables) and are exposed
to Tailwind in `tailwind.config.ts`. Use the semantic Tailwind classes
(`bg-maroon`, `text-gold`, `font-display`…) rather than raw hex.

## Colour

### Heritage core (from the printed brand guideline)

| Token     | Name         | Hex       |
| --------- | ------------ | --------- |
| `maroon`  | Brown Coffee | `#512934` |
| `tan`     | Café au Lait | `#A38054` |
| `cream`   | Dust Storm   | `#E3D0BB` |

### Elevated system (digital-only expansion)

| Token       | Name           | Hex       | Use                          |
| ----------- | -------------- | --------- | ---------------------------- |
| `gold`      | Marigold       | `#E0A63C` | Headings, links, key accents |
| `green`     | Meskel Green   | `#1E7A50` | Primary interactive / CTAs   |
| `lapis`     | Timket Lapis   | `#1F5673` | Cool accent, tags            |
| `vermilion` | Berbere        | `#D9482B` | Spark — use sparingly        |
| `plum`      | Midnight Coffee| `#2E141C` | Deep grounds, footers        |
| `ivory`     | Injera Ivory   | `#F5EEE2` | Light backgrounds            |
| `ink`       | Coffee Ink     | `#241318` | Text on light                |
| `stone`     | Stone          | `#8A7A6B` | Borders, muted text          |

> The elevated tones are a **digital expansion** — the printed guideline is
> unchanged. `vermilion` and `lapis` are accents, not body-text colours.

## Type

- **Fraunces** — expressive display voice (`font-display`).
- **Archivo** — neutral body/UI (`font-sans`). Stand-in for the brand's Acumin
  (Adobe-licensed); swap to Acumin via Adobe Fonts when licensed.
- **Noto Serif Ethiopic** — Amharic / Ge'ez (`font-ethiopic`). Applied
  automatically to `:lang(am)`.

Fonts are loaded with `next/font/google` in `app/[locale]/layout.tsx`.

## The Arch

AHOC's signature motif (arch-top window + rectangle). Available as:

- the `Arch` component (`src/components/ui/arch.tsx`) for image masks/containers;
- the `rounded-arch` Tailwind radius / `.arch` utility.

// Centralised Sanity environment configuration.
// During local scaffolding these fall back to placeholders so `next build`
// succeeds without credentials; set real values in `.env.local` before
// connecting to a dataset.

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01';

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder-project';

export const isSanityConfigured =
  projectId !== 'placeholder-project';

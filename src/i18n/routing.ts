import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // English and Amharic (Ge'ez). AHOC serves both a local and international audience.
  locales: ['en', 'am'],
  defaultLocale: 'en',
  // Always prefix so /en and /am are explicit and SEO-friendly.
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];

/** Type guard for a value being one of the configured locales. */
export function isValidLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (routing.locales as readonly string[]).includes(value);
}

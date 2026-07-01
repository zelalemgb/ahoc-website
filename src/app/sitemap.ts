import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://addishouseofculture.com';

// Static routes; extend with Sanity-driven event/space/news slugs as they land.
const ROUTES = ['', '/whats-on', '/spaces', '/programs', '/library', '/visit', '/shop', '/news', '/support', '/contact', '/about'];

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: `${base}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
    })),
  );
}

import { getTranslations } from 'next-intl/server';
import { sanityFetch } from '@/sanity/lib/fetch';
import { SEARCH_QUERY } from '@/sanity/lib/queries';
import { ARTISTS } from './artists';
import type { Locale } from '@/i18n/routing';

export type SearchKind = 'page' | 'event' | 'space' | 'news' | 'artist';

export type SearchResult = {
  id: string;
  title: string;
  href: string;
  kind: SearchKind;
  excerpt?: string;
};

/**
 * Standing destinations. Most of the site isn't in the CMS yet, so searching
 * only Sanity would return almost nothing — these keep search useful today and
 * stay useful afterwards, since nobody writes "opening hours" into a document
 * but plenty of people search for it. Titles and keywords both live in the
 * message files so each locale is searchable in its own language.
 */
const TARGETS = [
  { id: 'whatsOn', href: '/whats-on' },
  { id: 'spaces', href: '/spaces' },
  { id: 'artists', href: '/artists' },
  { id: 'about', href: '/about' },
  { id: 'visit', href: '/visit' },
  { id: 'workWithUs', href: '/support' },
  { id: 'contact', href: '/contact' },
  { id: 'newsletter', href: '/support' },
] as const;

type LocaleString = { en?: string; am?: string } | undefined;

type CmsHit = {
  _id: string;
  _type: 'event' | 'space' | 'newsPost';
  title?: LocaleString;
  slug?: { current?: string };
  summary?: LocaleString;
  excerpt?: LocaleString;
};

/** Lower-case and normalise so "Café" and "cafe" behave the same way. */
function normalise(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // strip Latin accents; Ge'ez is unaffected
    .toLowerCase()
    .trim();
}

export function tokenise(query: string): string[] {
  return normalise(query).split(/\s+/).filter(Boolean).slice(0, 8);
}

/**
 * Every token must land somewhere, so "cafe hours" doesn't match a page about
 * cafés that never mentions hours. Title hits outrank keyword hits.
 */
function score(title: string, haystack: string, tokens: string[]): number {
  const t = normalise(title);
  const h = normalise(haystack);
  let total = 0;

  for (const token of tokens) {
    let best = 0;
    if (t === token) best = 100;
    else if (t.startsWith(token)) best = 70;
    else if (t.includes(token)) best = 50;
    else if (h.includes(token)) best = 25;

    if (best === 0) return 0;
    total += best;
  }
  return total;
}

function pick(value: LocaleString, locale: string): string {
  if (!value) return '';
  return (locale === 'am' ? value.am : value.en) ?? value.en ?? value.am ?? '';
}

/** Detail routes that actually exist. Anything else is linked to its index. */
function hrefFor(hit: CmsHit): string | null {
  const slug = hit.slug?.current;
  switch (hit._type) {
    case 'event':
      return slug ? `/whats-on/${slug}` : '/whats-on';
    case 'space':
      return '/spaces';
    case 'newsPost':
      return '/news';
    default:
      return null;
  }
}

const KIND_FOR: Record<CmsHit['_type'], SearchKind> = {
  event: 'event',
  space: 'space',
  newsPost: 'news',
};

export async function search(query: string, locale: Locale): Promise<SearchResult[]> {
  const tokens = tokenise(query);
  if (tokens.length === 0) return [];

  const t = await getTranslations({ locale, namespace: 'search.targets' });
  const scored: { result: SearchResult; score: number }[] = [];

  for (const target of TARGETS) {
    const title = t(`${target.id}.title`);
    const keywords = t(`${target.id}.keywords`);
    const value = score(title, `${title} ${keywords}`, tokens);
    if (value > 0) {
      scored.push({
        result: { id: target.id, title, href: target.href, kind: 'page' },
        score: value,
      });
    }
  }

  for (const name of ARTISTS) {
    const value = score(name, name, tokens);
    if (value > 0) {
      scored.push({
        // Artists have no individual pages yet, so send people to the index.
        result: { id: `artist:${name}`, title: name, href: '/artists', kind: 'artist' },
        score: value,
      });
    }
  }

  // CMS content. Returns [] when Sanity isn't configured, so this is additive.
  const hits = await sanityFetch<CmsHit[]>({
    query: SEARCH_QUERY,
    params: { t: `${tokens.join(' ')}*` },
    fallback: [],
  });

  for (const hit of hits) {
    const href = hrefFor(hit);
    const title = pick(hit.title, locale);
    if (!href || !title) continue;

    const excerpt = pick(hit.excerpt, locale) || pick(hit.summary, locale);
    scored.push({
      result: {
        id: hit._id,
        title,
        href,
        kind: KIND_FOR[hit._type],
        excerpt: excerpt || undefined,
      },
      // Sanity already filtered for relevance; rank against the title we show.
      score: Math.max(score(title, `${title} ${excerpt}`, tokens), 30),
    });
  }

  const seen = new Set<string>();
  return scored
    .sort((a, b) => b.score - a.score || a.result.title.localeCompare(b.result.title))
    .filter(({ result }) => {
      const key = `${result.kind}:${result.href}:${result.title}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map(({ result }) => result);
}

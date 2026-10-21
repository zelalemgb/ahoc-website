import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { isValidLocale, routing } from '@/i18n/routing';
import { search } from '@/lib/search';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'search' });
  // Results pages are thin and query-specific — keep them out of the index.
  return { title: t('title'), robots: { index: false, follow: true } };
}

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('search');
  const raw = (await searchParams).q;
  const query = (Array.isArray(raw) ? raw[0] : raw)?.slice(0, 120).trim() ?? '';

  const lang = isValidLocale(locale) ? locale : routing.defaultLocale;
  const results = query ? await search(query, lang) : [];

  return (
    <div className="mx-auto max-w-shell px-5 py-[clamp(48px,7vw,96px)] sm:px-10">
      <header className="border-b border-line pb-8">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-maroon">
          {t('eyebrow')}
        </p>
        <h1 className="mt-4 font-display text-[clamp(32px,4.5vw,56px)] font-normal leading-[0.98] tracking-tight">
          {t('title')}
        </h1>

        {/* A plain GET form: results get a shareable URL and the page works
            without JavaScript. */}
        <form action={`/${lang}/search`} method="get" role="search" className="mt-8 flex max-w-xl gap-2">
          <label htmlFor="q" className="sr-only">
            {t('label')}
          </label>
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={query}
            placeholder={t('placeholder')}
            maxLength={120}
            className="min-w-0 flex-1 border border-line bg-paper px-4 py-3 text-[15px] outline-none transition focus:border-maroon"
          />
          <button
            type="submit"
            className="shrink-0 rounded-sm bg-maroon px-5 py-3 text-sm font-bold text-paper transition hover:bg-ink"
          >
            {t('submit')}
          </button>
        </form>
      </header>

      <div className="mt-10">
        {!query ? (
          <p className="max-w-prose text-ink/70">{t('prompt')}</p>
        ) : results.length === 0 ? (
          <div className="max-w-prose text-ink/70">
            <p className="text-ink">{t('count', { count: 0, q: query })}</p>
            <p className="mt-2">{t('emptyHint')}</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-ink/60">{t('count', { count: results.length, q: query })}</p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {results.map((result) => (
                <li key={result.id}>
                  <Link href={result.href} className="group flex flex-col gap-1 py-5 transition">
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-maroon">
                      {t(`kinds.${result.kind}`)}
                    </span>
                    <span className="text-lg font-extrabold tracking-[0.01em] text-ink group-hover:underline">
                      {result.title}
                    </span>
                    {result.excerpt ? (
                      <span className="max-w-prose text-[15px] text-ink/70">{result.excerpt}</span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

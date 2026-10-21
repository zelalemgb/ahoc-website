/* eslint-disable @next/next/no-img-element */
import { getLocale, getTranslations } from 'next-intl/server';
import type { Image } from 'sanity';
import { ButtonLink } from '@/components/ui/button';
import { sanityFetch } from '@/sanity/lib/fetch';
import { EVENTS_ON_VIEW_QUERY, EVENTS_UPCOMING_QUERY } from '@/sanity/lib/queries';

type CmsEvent = {
  _id: string;
  title?: { en?: string; am?: string };
  slug?: { current?: string };
  summary?: { en?: string; am?: string };
  startDate?: string;
  endDate?: string;
  space?: { title?: { en?: string; am?: string } };
  image?: Image;
};

function pick(value: { en?: string; am?: string } | undefined, locale: string): string {
  if (!value) return '';
  return (locale === 'am' ? value.am : value.en) ?? value.en ?? value.am ?? '';
}

/**
 * Full-bleed hero with a floating content card. The card follows whatever is
 * actually on view in the CMS — on-view first, then the next upcoming show.
 * With nothing published it states that plainly rather than inventing an
 * exhibition: a placeholder people might mistake for real programming is worse
 * than an honest blank.
 */
export async function Hero() {
  const locale = await getLocale();
  const t = await getTranslations('home');

  const [onView, upcoming] = await Promise.all([
    sanityFetch<CmsEvent[]>({ query: EVENTS_ON_VIEW_QUERY, fallback: [] }),
    sanityFetch<CmsEvent[]>({ query: EVENTS_UPCOMING_QUERY, fallback: [] }),
  ]);
  const featured: CmsEvent | undefined = onView[0] ?? upcoming[0];

  const title = featured ? pick(featured.title, locale) : '';
  const space = featured ? pick(featured.space?.title, locale) : '';
  const blurb = featured ? pick(featured.summary, locale) : '';

  const dates =
    featured?.startDate && featured?.endDate
      ? new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' }).formatRange(
          new Date(featured.startDate),
          new Date(featured.endDate),
        )
      : '';

  const href = featured?.slug?.current ? `/whats-on/${featured.slug.current}` : '/whats-on';

  return (
    <section className="relative h-[min(86vh,760px)] overflow-hidden bg-ink">
      {/* PLACEHOLDER: the brief asks for a wide shot of the house exterior and
          no such photograph was supplied. Drop the real image in and swap the
          src — nothing else here needs to change. */}
      <img
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        src="/images/placeholder-exterior-wide.svg"
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute bottom-5 left-5 max-w-[440px] bg-paper p-8 pb-7 sm:bottom-12 sm:left-10">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-maroon">
          <span className="mr-2 inline-block h-[7px] w-[7px] rounded-full bg-gold align-middle" />
          {featured && space ? `${t('featured.onView')} · ${space}` : t('featured.onView')}
        </p>
        <h1 className="my-3 font-display text-[clamp(38px,5vw,60px)] font-normal leading-[0.94] tracking-tight">
          {title || t('featured.emptyTitle')}
        </h1>
        <p className="mb-5 text-[15.5px] text-ink/70">{blurb || t('featured.emptyBlurb')}</p>
        {dates ? (
          <p className="mb-5 text-[12.5px] font-bold uppercase tracking-wide text-maroon">{dates}</p>
        ) : null}
        <ButtonLink href={featured ? href : '/visit'}>
          {featured ? t('featured.more') : t('planVisit')} →
        </ButtonLink>
      </div>
    </section>
  );
}

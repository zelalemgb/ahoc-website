/* eslint-disable @next/next/no-img-element */
import { getLocale, getTranslations } from 'next-intl/server';
import type { Image } from 'sanity';
import { Link } from '@/i18n/navigation';
import { SectionHead } from './section-head';
import { sanityFetch } from '@/sanity/lib/fetch';
import { EVENTS_ON_VIEW_QUERY, EVENTS_UPCOMING_QUERY } from '@/sanity/lib/queries';
import { urlForImage } from '@/sanity/lib/image';

type CmsEvent = {
  _id: string;
  title?: { en?: string; am?: string };
  slug?: { current?: string };
  category?: string;
  startDate?: string;
  image?: Image;
};

// Fallback demo data — used until events are published in Sanity.
const DEMO = [
  {
    key: 'e1',
    img: 'https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=800&q=80&auto=format&fit=crop',
  },
  {
    key: 'e2',
    img: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80&auto=format&fit=crop',
  },
  {
    key: 'e3',
    img: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=800&q=80&auto=format&fit=crop',
  },
] as const;

export async function WhatsOn() {
  const locale = await getLocale();
  const t = await getTranslations('home.whatsOn');

  // Pull live events from Sanity; on-view first, then upcoming.
  const [onView, upcoming] = await Promise.all([
    sanityFetch<CmsEvent[]>({ query: EVENTS_ON_VIEW_QUERY, fallback: [] }),
    sanityFetch<CmsEvent[]>({ query: EVENTS_UPCOMING_QUERY, fallback: [] }),
  ]);
  const cms = [...onView, ...upcoming].slice(0, 3);

  return (
    <section className="px-5 py-[clamp(56px,8vw,110px)] sm:px-10">
      <div className="mx-auto max-w-shell">
        <SectionHead
          kicker={t('kicker')}
          title={t('title')}
          link={{ href: '/whats-on', label: t('viewAll') }}
        />
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {cms.length > 0
            ? cms.map((e) => (
                <EventCard
                  key={e._id}
                  href={e.slug?.current ? `/whats-on/${e.slug.current}` : '/whats-on'}
                  img={e.image ? urlForImage(e.image).width(800).height(600).url() : undefined}
                  tag={e.category ?? ''}
                  title={e.title?.[locale as 'en' | 'am'] ?? e.title?.en ?? ''}
                  when={
                    e.startDate
                      ? new Intl.DateTimeFormat(locale, {
                          day: 'numeric',
                          month: 'long',
                        }).format(new Date(e.startDate))
                      : ''
                  }
                />
              ))
            : DEMO.map((d) => (
                <EventCard
                  key={d.key}
                  href="/whats-on"
                  img={d.img}
                  tag={t(`items.${d.key}.tag`)}
                  title={t(`items.${d.key}.title`)}
                  when={t(`items.${d.key}.when`)}
                />
              ))}
        </div>
      </div>
    </section>
  );
}

function EventCard({
  href,
  img,
  tag,
  title,
  when,
}: {
  href: string;
  img?: string;
  tag: string;
  title: string;
  when: string;
}) {
  return (
    <Link href={href} className="group block">
      <div className="mb-4 aspect-[4/3] overflow-hidden bg-paper-2">
        {img ? (
          <img
            alt=""
            src={img}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-maroon">
        {tag}
      </div>
      <h3 className="my-1.5 font-display text-[22px] font-normal leading-[1.02] tracking-tight">
        {title}
      </h3>
      <div className="text-[13px] font-semibold text-ink/60">{when}</div>
    </Link>
  );
}

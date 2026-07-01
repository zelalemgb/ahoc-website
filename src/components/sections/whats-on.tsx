/* eslint-disable @next/next/no-img-element */
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SectionHead } from './section-head';

// Demo data — replaced by the `event` Sanity queries once the CMS is connected.
const EVENTS = [
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

export function WhatsOn() {
  const t = useTranslations('home.whatsOn');

  return (
    <section className="px-5 py-[clamp(56px,8vw,110px)] sm:px-10">
      <div className="mx-auto max-w-shell">
        <SectionHead
          kicker={t('kicker')}
          title={t('title')}
          link={{ href: '/whats-on', label: t('viewAll') }}
        />
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {EVENTS.map((e) => (
            <Link key={e.key} href="/whats-on" className="group block">
              <div className="mb-4 aspect-[4/3] overflow-hidden bg-paper-2">
                <img
                  alt=""
                  src={e.img}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-maroon">
                {t(`items.${e.key}.tag`)}
              </div>
              <h3 className="my-1.5 font-display text-[22px] font-normal leading-[1.02] tracking-tight">
                {t(`items.${e.key}.title`)}
              </h3>
              <div className="text-[13px] font-semibold text-ink/60">
                {t(`items.${e.key}.when`)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

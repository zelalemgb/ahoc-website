/* eslint-disable @next/next/no-img-element */
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SectionHead } from './section-head';

// Demo data — replaced by the `space` Sanity query once the CMS is connected.
const SPACES = [
  { key: 'gallery', am: 'የጥበብ አዳራሽ', img: '/images/space-gallery.jpg' },
  { key: 'audiovisual', am: 'የድምፅና ምስል', img: '/images/space-audiovisual.jpg' },
  { key: 'library', am: 'ቤተ-መጻሕፍት', img: '/images/space-library.jpg' },
  { key: 'cafe', am: 'ቡና ቤት', img: '/images/space-cafe.jpg' },
] as const;

export function Spaces() {
  const t = useTranslations('home.spaces');

  return (
    <section className="px-5 py-[clamp(56px,8vw,110px)] sm:px-10">
      <div className="mx-auto max-w-shell">
        <SectionHead
          kicker={t('kicker')}
          title={t('title')}
          link={{ href: '/spaces', label: t('viewAll') }}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SPACES.map((s) => (
            <Link key={s.key} href="/spaces" className="group block">
              <div className="mb-3.5 aspect-[3/4] overflow-hidden bg-paper-2">
                <img
                  alt=""
                  src={s.img}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <h3 className="text-base font-extrabold tracking-[0.01em]">{t(`items.${s.key}`)}</h3>
              <small lang="am" className="mt-0.5 block font-ethiopic text-[13px] text-ink/50">
                {s.am}
              </small>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* eslint-disable @next/next/no-img-element */
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageShell } from '@/components/layout/page-shell';

/**
 * The four spaces. Descriptions are factual summaries of the team's October
 * brief — their longer prose is still pending a decision on register, but the
 * brief's explicit instruction to name Afro Kitchen is carried here.
 */
const SPACES = [
  { key: 'gallery', img: '/images/space-gallery.jpg' },
  { key: 'auditorium', img: '/images/space-audiovisual.jpg' },
  { key: 'library', img: '/images/space-library.jpg' },
  { key: 'cafe', img: '/images/space-cafe.jpg' },
] as const;

export default async function SpacesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('spaces');
  const nav = await getTranslations('nav');
  const names = await getTranslations('home.spaces.items');

  return (
    <PageShell eyebrow={t('eyebrow')} title={nav('spaces')} wide>
      <p className="max-w-prose">{t('intro')}</p>

      <div className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2">
        {SPACES.map((space) => (
          <section key={space.key}>
            <div className="mb-4 aspect-[4/3] overflow-hidden bg-paper-2">
              <img
                alt=""
                src={space.img}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="font-display text-[26px] font-normal leading-[1.02] tracking-tight text-ink">
              {names(space.key)}
            </h2>
            <p className="mt-2 max-w-prose text-[15.5px]">{t(`items.${space.key}`)}</p>
          </section>
        ))}
      </div>
    </PageShell>
  );
}

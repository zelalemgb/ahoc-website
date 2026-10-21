import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageShell } from '@/components/layout/page-shell';
import { ARTISTS } from '@/lib/artists';

/**
 * Artists index. The October brief supplied six names and nothing else — no
 * portraits, bios or links — so each card renders a placeholder frame. When the
 * material arrives this should move to a Sanity `artist` document type, the way
 * events and spaces already work.
 */

export default async function ArtistsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('artists');

  return (
    <PageShell eyebrow={t('eyebrow')} title={t('title')} wide>
      <p className="max-w-prose">{t('intro')}</p>

      <ul className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3">
        {ARTISTS.map((name) => (
          <li key={name}>
            {/* PLACEHOLDER: no portrait supplied yet. */}
            <div
              className="mb-3.5 aspect-[3/4] bg-paper-2"
              role="img"
              aria-label={`Portrait of ${name} — image to follow`}
            />
            <h2 className="text-base font-extrabold tracking-[0.01em] text-ink">{name}</h2>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}

import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Arch } from '@/components/ui/arch';
import { ButtonLink } from '@/components/ui/button';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Home />;
}

function Home() {
  const t = useTranslations('home');

  return (
    <div className="mx-auto max-w-7xl px-6">
      {/* Hero */}
      <section className="grid items-end gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-tan">
            {t('welcome')}
          </p>
          <h1 className="mt-6 font-display text-5xl font-black leading-[0.92] tracking-tight sm:text-6xl lg:text-7xl">
            {t('heroTitle')}
          </h1>
          <p className="mt-6 max-w-prose text-lg text-cream/80">{t('heroBody')}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href="/visit">{t('planVisit')}</ButtonLink>
            <ButtonLink href="/whats-on" variant="outline">
              {t('seeWhatsOn')}
            </ButtonLink>
          </div>
        </div>
        <Arch className="aspect-[3/4] w-full">
          {/* Replace with a Sanity-driven featured image. */}
          <div className="h-full w-full bg-gradient-to-br from-tan via-maroon to-plum" />
        </Arch>
      </section>

      {/* Programming tiers — wired to Sanity events in a later pass. */}
      <section className="grid gap-8 border-y border-cream/15 py-8 sm:grid-cols-3">
        {(['onView', 'upcoming', 'past'] as const).map((tier) => (
          <div key={tier}>
            <h2 className="font-display text-sm font-black uppercase tracking-[0.16em] text-gold">
              {t(tier)}
            </h2>
            <p className="mt-2 text-sm text-cream/70">—</p>
          </div>
        ))}
      </section>
    </div>
  );
}

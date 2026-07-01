import { useTranslations } from 'next-intl';
import { ButtonLink } from '@/components/ui/button';

/** Light "Plan your visit" band with the key logistics + CTAs. */
export function VisitBand() {
  const t = useTranslations('home.visit');

  const info = [
    { b: t('hoursLabel'), v: t('hours') },
    { b: t('whereLabel'), v: t('where') },
    { b: t('admissionLabel'), v: t('admission') },
  ];

  return (
    <section className="border-y border-line bg-paper-2 px-5 py-[clamp(40px,5vw,64px)] sm:px-10">
      <div className="mx-auto flex max-w-shell flex-wrap items-center justify-between gap-8">
        <div>
          <h2 className="font-display text-[clamp(26px,3.2vw,40px)] font-normal leading-none tracking-tight">
            {t('title')}
          </h2>
          <div className="mt-4 flex flex-wrap gap-10 text-sm">
            {info.map((i) => (
              <div key={i.b}>
                <b className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.14em] text-maroon">
                  {i.b}
                </b>
                {i.v}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/tickets">{t('tickets')} →</ButtonLink>
          <ButtonLink href="/visit" variant="ghost">
            {t('directions')}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

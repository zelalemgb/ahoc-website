/* eslint-disable @next/next/no-img-element */
import { useTranslations } from 'next-intl';
import { ButtonLink } from '@/components/ui/button';

/**
 * Full-bleed cinematic hero with a floating content card (British Museum
 * pattern). Featured content is hardcoded demo data for now — will be driven
 * by a Sanity `event` once the CMS is connected.
 */
export function Hero() {
  const t = useTranslations('home');

  return (
    <section className="relative h-[min(86vh,760px)] overflow-hidden bg-ink">
      <img
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1800&q=80&auto=format&fit=crop"
      />
      <div className="absolute bottom-5 left-5 max-w-[440px] bg-paper p-8 pb-7 sm:bottom-12 sm:left-10">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-maroon">
          <span className="mr-2 inline-block h-[7px] w-[7px] rounded-full bg-gold align-middle" />
          {t('featured.tag')}
        </p>
        <h1 className="my-3 font-display text-[clamp(38px,5vw,60px)] font-normal leading-[0.94] tracking-tight">
          {t('featured.title')}
        </h1>
        <p className="mb-5 text-[15.5px] text-ink/70">{t('featured.blurb')}</p>
        <p className="mb-5 text-[12.5px] font-bold uppercase tracking-wide text-maroon">
          {t('featured.meta')}
        </p>
        <ButtonLink href="/visit">{t('planVisit')} →</ButtonLink>
      </div>
    </section>
  );
}

/* eslint-disable @next/next/no-img-element */
import { useTranslations } from 'next-intl';

/**
 * The single brand-heavy moment: a full-width maroon block with a big
 * statement (V&A-style energy), one gold-highlighted word, and an image.
 */
export function Statement() {
  const t = useTranslations('home.statement');

  return (
    <section className="bg-maroon text-paper">
      <div className="mx-auto grid max-w-shell items-center gap-[clamp(30px,5vw,70px)] px-5 py-[clamp(56px,8vw,110px)] sm:px-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-5 text-xs font-extrabold uppercase tracking-[0.2em] text-gold">
            {t('kicker')}
          </div>
          <h2 className="font-display text-[clamp(30px,4vw,54px)] font-normal leading-none tracking-tight">
            {t.rich('body', {
              gold: (chunks) => <span className="text-gold">{chunks}</span>,
            })}
          </h2>
          <div lang="am" className="mt-5 font-ethiopic text-xl text-paper/70">
            {t('amharic')}
          </div>
        </div>
        <div className="hidden aspect-[4/5] overflow-hidden lg:block">
          <img
            alt=""
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1577720580479-7d839d829c73?w=900&q=80&auto=format&fit=crop"
          />
        </div>
      </div>
    </section>
  );
}

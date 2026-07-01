import { useTranslations } from 'next-intl';

/** Thin institutional announcement bar (Guggenheim/British Museum pattern). */
export function Announcement() {
  const t = useTranslations('announcement');
  return (
    <div className="bg-ink px-4 py-2.5 text-center text-[13px] tracking-[0.01em] text-paper">
      {t('lead')} <span className="font-bold text-gold">{t('date')}</span> — {t('tail')}
    </div>
  );
}

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

/**
 * AHOC lockup: maroon arch monogram + tracked wordmark (Guggenheim-style).
 * The monogram is the only place the arch motif appears in the new system.
 */
export function Logo() {
  const t = useTranslations('meta');
  return (
    <Link href="/" className="flex items-center gap-3" aria-label={t('siteName')}>
      <span className="flex h-11 w-[34px] flex-col items-center justify-center rounded-[17px_17px_3px_3px] bg-maroon font-display text-[11px] leading-[0.8] text-paper">
        <span>AH</span>
        <span>OC</span>
      </span>
      <span className="font-display text-[15px] uppercase leading-none tracking-[0.14em]">
        Addis House of Culture
        <span className="mt-[3px] block font-sans text-[9px] font-semibold tracking-[0.32em] text-maroon">
          {t('tagline')}
        </span>
      </span>
    </Link>
  );
}

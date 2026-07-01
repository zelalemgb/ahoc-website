import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

/**
 * AHOC lockup: the "AHOC" arch monogram + wordmark.
 * The monogram is CSS-drawn; swap for the official SVG when licensed assets
 * are added to /public.
 */
export function Logo() {
  const t = useTranslations('meta');
  return (
    <Link href="/" className="flex items-center gap-3" aria-label={t('siteName')}>
      <span className="flex h-14 w-11 flex-col items-center justify-center rounded-[22px_22px_5px_5px] bg-cream font-display text-sm font-black leading-[0.82] text-maroon">
        <span>AH</span>
        <span>OC</span>
      </span>
      <span className="text-sm font-black uppercase leading-tight">
        Addis House
        <br />
        of Culture
        <span className="block text-[10px] font-medium tracking-[0.34em] text-tan">
          {t('tagline')}
        </span>
      </span>
    </Link>
  );
}

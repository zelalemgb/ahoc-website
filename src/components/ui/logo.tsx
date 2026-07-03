import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LogoMark } from './logo-mark';

/** AHOC lockup: the official arch monogram + tracked wordmark. */
export function Logo() {
  const t = useTranslations('meta');
  return (
    <Link href="/" className="flex items-center gap-3" aria-label={t('siteName')}>
      <LogoMark className="h-11 w-auto" />
      <span className="font-display text-[15px] uppercase leading-none tracking-[0.14em]">
        Addis House of Culture
        <span className="mt-[3px] block font-sans text-[9px] font-semibold tracking-[0.32em] text-maroon">
          {t('tagline')}
        </span>
      </span>
    </Link>
  );
}

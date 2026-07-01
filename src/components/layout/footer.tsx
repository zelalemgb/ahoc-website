import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const meta = useTranslations('meta');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cream/10 bg-plum">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-black leading-none">
            Addis House
            <br />
            of Culture
          </p>
          <p className="mt-3 text-sm text-tan">{meta('tagline')}</p>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-tan">
            {t('visit')}
          </h2>
          <p className="text-sm text-cream/80">{t('address')}</p>
          <p className="mt-2 text-sm text-cream/80">{t('hours')}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-tan">
            {t('explore')}
          </h2>
          <ul className="space-y-2 text-sm text-cream/80">
            <li>
              <Link href="/whats-on" className="hover:text-cream">
                {nav('whatsOn')}
              </Link>
            </li>
            <li>
              <Link href="/programs" className="hover:text-cream">
                {nav('programs')}
              </Link>
            </li>
            <li>
              <Link href="/library" className="hover:text-cream">
                {nav('library')}
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-cream">
                {nav('shop')}
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-tan">
            {t('connect')}
          </h2>
          <ul className="space-y-2 text-sm text-cream/80">
            <li>
              <Link href="/support" className="hover:text-cream">
                {nav('support')}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-cream">
                {nav('contact')}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 px-6 py-6 text-center text-xs text-stone">
        © {year} {meta('siteName')}. {t('rights')}
      </div>
    </footer>
  );
}

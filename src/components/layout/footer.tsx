import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LogoMark } from '@/components/ui/logo-mark';

export function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const meta = useTranslations('meta');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink px-5 pb-10 pt-16 text-paper sm:px-10">
      <div className="mx-auto max-w-shell">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <LogoMark className="mb-5 h-14 w-auto" bg="var(--color-cream)" fg="var(--color-ink)" />
            <p className="font-display text-3xl uppercase leading-[0.95] tracking-tight">
              Addis House
              <br />
              of Culture
            </p>
            <p className="mt-3.5 text-[13px] text-paper/60">
              {meta('tagline')} · <span lang="am">አዲስ የባህል ቤት</span>
            </p>
          </div>

          <FooterCol title={t('visit')}>
            <FooterLink href="/whats-on">{nav('whatsOn')}</FooterLink>
            <FooterLink href="/visit">{t('planVisit')}</FooterLink>
            <FooterLink href="/visit">{t('accessibility')}</FooterLink>
          </FooterCol>

          <FooterCol title={t('explore')}>
            <FooterLink href="/spaces">{nav('spaces')}</FooterLink>
            <FooterLink href="/programs">{nav('programs')}</FooterLink>
            <FooterLink href="/library">{nav('library')}</FooterLink>
            <FooterLink href="/shop">{nav('shop')}</FooterLink>
          </FooterCol>

          <FooterCol title={t('connect')}>
            <FooterLink href="/support">{nav('support')}</FooterLink>
            <FooterLink href="/contact">{nav('contact')}</FooterLink>
            <FooterLink href="/support">{t('newsletter')}</FooterLink>
          </FooterCol>
        </div>

        <hr className="my-11 border-paper/15" />
        <div className="flex flex-wrap justify-between gap-3 text-xs text-paper/55">
          <span>
            © {year} {meta('siteName')}. {t('rights')}
          </span>
          <span>{t('address')}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <nav>
      <h2 className="mb-3.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-gold">
        {title}
      </h2>
      <div className="space-y-2">{children}</div>
    </nav>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="block text-sm text-paper/75 transition hover:text-paper">
      {children}
    </Link>
  );
}

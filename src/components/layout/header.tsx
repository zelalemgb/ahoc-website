import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Logo } from '@/components/ui/logo';
import { LocaleSwitcher } from '@/components/layout/locale-switcher';

const NAV = [
  { key: 'whatsOn', href: '/whats-on' },
  { key: 'spaces', href: '/spaces' },
  { key: 'programs', href: '/programs' },
  { key: 'library', href: '/library' },
  { key: 'visit', href: '/visit' },
] as const;

export function Header() {
  const t = useTranslations('nav');

  return (
    <header className="sticky top-0 z-50 border-b border-cream/10 bg-maroon/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Logo />

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {NAV.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-cream/80 transition hover:text-cream"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LocaleSwitcher />
          <Link
            href="/tickets"
            className="rounded-full bg-green px-5 py-2 text-sm font-semibold text-ivory transition hover:bg-green/90"
          >
            {t('tickets')}
          </Link>
        </div>
      </div>
    </header>
  );
}

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Logo } from '@/components/ui/logo';
import { LocaleSwitcher } from '@/components/layout/locale-switcher';

// Four sections per the team's October brief. Programs folds into What's On;
// Library and Shop are now rooms described on the Spaces page, not destinations.
const NAV = [
  { key: 'whatsOn', href: '/whats-on' },
  { key: 'spaces', href: '/spaces' },
  { key: 'artists', href: '/artists' },
  { key: 'about', href: '/about' },
] as const;

export function Header() {
  const t = useTranslations('nav');

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-shell items-center justify-between gap-6 px-5 py-4 sm:px-10">
        <Logo />

        <nav className="hidden items-center gap-8 text-sm font-bold lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="relative py-1.5 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-maroon after:transition-[width] after:duration-300 hover:after:w-full"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-[13px] font-bold">
          <LocaleSwitcher />
          {/* Admission is the Palace's own entrance fee, so AHOC sells nothing
              here — the Tickets button is gone. The /tickets routes and payment
              code are left in place pending a decision on ticketed events. */}
          <Link href="/search" className="hidden sm:inline hover:text-maroon">
            {t('search')}
          </Link>
        </div>
      </div>
    </header>
  );
}

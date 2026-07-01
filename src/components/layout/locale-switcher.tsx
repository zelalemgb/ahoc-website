'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const LABELS: Record<string, string> = { en: 'EN', am: 'አማ' };

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-0.5" role="group" aria-label="Language">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          lang={loc}
          onClick={() => router.replace(pathname, { locale: loc })}
          aria-current={loc === locale ? 'true' : undefined}
          className={cn(
            'px-1 py-0.5 text-xs transition',
            loc === locale
              ? 'text-ink underline decoration-maroon underline-offset-4'
              : 'text-ink/50 hover:text-ink',
          )}
        >
          {LABELS[loc] ?? loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

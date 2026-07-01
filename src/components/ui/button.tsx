import type { ComponentProps, ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type Variant = 'solid' | 'outline';

const base =
  'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition hover:-translate-y-0.5';

const variants: Record<Variant, string> = {
  solid: 'bg-green text-ivory hover:bg-green/90',
  outline: 'border border-cream text-cream hover:bg-cream hover:text-maroon',
};

type ButtonLinkProps = {
  href: ComponentProps<typeof Link>['href'];
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = 'solid',
  className,
}: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}

import type { ComponentProps, ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type Variant = 'solid' | 'ghost';

const base =
  'inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-bold tracking-wide transition';

const variants: Record<Variant, string> = {
  solid: 'bg-maroon text-paper hover:bg-ink',
  ghost: 'border-[1.5px] border-ink text-ink hover:bg-ink hover:text-paper',
};

export function ButtonLink({
  href,
  children,
  variant = 'solid',
  className,
}: {
  href: ComponentProps<typeof Link>['href'];
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}

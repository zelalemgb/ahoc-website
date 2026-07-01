import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * The Arch — AHOC's signature design element (arch-top window + rectangle).
 * Use as an image mask or content container. See docs/BRAND.md.
 */
export function Arch({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-arch bg-gradient-to-br from-tan to-plum',
        className,
      )}
    >
      {children}
    </div>
  );
}

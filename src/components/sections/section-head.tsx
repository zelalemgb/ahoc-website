import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';

/** Shared section header: kicker + big title on the left, a link on the right. */
export function SectionHead({
  kicker,
  title,
  link,
}: {
  kicker: string;
  title: ReactNode;
  link?: { href: string; label: string };
}) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6">
      <div>
        <div className="mb-2.5 text-xs font-extrabold uppercase tracking-[0.2em] text-maroon">
          {kicker}
        </div>
        <h2 className="font-display text-[clamp(28px,3.6vw,46px)] font-normal leading-[0.98] tracking-tight">
          {title}
        </h2>
      </div>
      {link ? (
        <Link
          href={link.href}
          className="whitespace-nowrap border-b-2 border-maroon pb-0.5 text-sm font-bold"
        >
          {link.label} →
        </Link>
      ) : null}
    </div>
  );
}

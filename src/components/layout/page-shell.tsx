import type { ReactNode } from 'react';

/**
 * Standard editorial page shell — an arch-topped header band + content well.
 * Route pages compose this until each is wired to its Sanity source.
 */
export function PageShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <header className="border-b border-cream/15 pb-8">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-tan">{eyebrow}</p>
        ) : null}
        <h1 className="mt-4 font-display text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl">
          {title}
        </h1>
      </header>
      <div className="prose-invert mt-10 max-w-prose text-cream/80">
        {children ?? <p>This section is coming soon.</p>}
      </div>
    </div>
  );
}

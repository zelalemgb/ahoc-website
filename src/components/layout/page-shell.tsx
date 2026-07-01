import type { ReactNode } from 'react';

/**
 * Standard editorial page shell for inner routes — a titled header band + a
 * content well. Composed until each route is wired to its Sanity source.
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
    <div className="mx-auto max-w-shell px-5 py-[clamp(48px,7vw,96px)] sm:px-10">
      <header className="border-b border-line pb-8">
        {eyebrow ? (
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-maroon">{eyebrow}</p>
        ) : null}
        <h1 className="mt-4 font-display text-[clamp(32px,4.5vw,56px)] font-normal leading-[0.98] tracking-tight">
          {title}
        </h1>
      </header>
      <div className="mt-10 max-w-prose text-ink/70">
        {children ?? <p>This section is coming soon.</p>}
      </div>
    </div>
  );
}

import type { ReactNode } from 'react';

/**
 * The Studio needs its own document shell. The root layout deliberately
 * renders bare children so that `[locale]/layout.tsx` can own <html lang>
 * per request — which leaves sibling routes outside the locale tree, like
 * this one, with no <html>/<body> at all. `coming-soon` solves it the same
 * way.
 *
 * Sanity renders a full-viewport application, so the body carries no margin
 * and the Studio's own styles take over from there.
 */
export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}

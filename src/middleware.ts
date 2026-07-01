import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  //  - API routes
  //  - the Sanity Studio (/studio)
  //  - Next.js internals (/_next, /_vercel)
  //  - static files (anything with a dot)
  matcher: ['/((?!api|studio|_next|_vercel|.*\\..*).*)'],
};

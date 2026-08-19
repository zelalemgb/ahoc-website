import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Flip the whole public site to a holding page by setting COMING_SOON=true.
// /studio and /api are excluded by the matcher below, so the CMS and webhooks
// keep working while the site is hidden.
const COMING_SOON = process.env.COMING_SOON === 'true';

export default function middleware(req: NextRequest) {
  if (COMING_SOON && !req.nextUrl.pathname.startsWith('/coming-soon')) {
    const url = req.nextUrl.clone();
    url.pathname = '/coming-soon';
    return NextResponse.rewrite(url);
  }
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|studio|_next|_vercel|.*\\..*).*)'],
};

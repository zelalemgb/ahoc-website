import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * On-demand revalidation webhook for Sanity.
 * Configure in Sanity → API → Webhooks to POST here with a shared secret,
 * so published content updates the live site without a redeploy.
 */
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  // Broadly revalidate; refine to per-document paths as routes are wired up.
  revalidatePath('/', 'layout');

  return NextResponse.json({ revalidated: true, now: Date.now() });
}

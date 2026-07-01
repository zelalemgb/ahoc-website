/**
 * Sanity Studio, embedded in the Next.js app at /studio.
 * This route opts out of static rendering and the site's i18n middleware.
 */
import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

export const dynamic = 'force-static';

export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  return <NextStudio config={config} />;
}

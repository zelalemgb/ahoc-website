import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Use the CDN in production; disable when a read token is present so
  // draft/preview content is fresh.
  useCdn: !process.env.SANITY_API_READ_TOKEN,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'published',
});

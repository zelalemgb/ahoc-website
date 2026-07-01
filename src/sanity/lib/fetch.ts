import type { QueryParams } from 'next-sanity';
import { client } from './client';
import { isSanityConfigured } from '@/sanity/env';

/**
 * Safe GROQ fetch. Returns `fallback` when Sanity isn't configured yet or a
 * request fails, so pages render (and `next build` succeeds) before a dataset
 * is connected. Tune `revalidate` per call site.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
  fallback,
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number;
  fallback: T;
}): Promise<T> {
  if (!isSanityConfigured) return fallback;
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate },
    });
  } catch (error) {
    console.error('[sanityFetch] query failed, using fallback:', error);
    return fallback;
  }
}

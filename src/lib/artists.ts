/**
 * Artists supplied in the team's October brief. Proper nouns, so they read the
 * same in both locales. Shared by the Artists index and site search; when
 * portraits and biographies arrive this should become a Sanity document type
 * and both consumers switch to the CMS together.
 */
export const ARTISTS = [
  'Zelalem Merga',
  'Kidane Gizaw',
  'Dawit Geressu',
  'Joey Lawrence',
  'Tibeb Sirak',
  'Michael Hailu',
] as const;

export type ArtistName = (typeof ARTISTS)[number];

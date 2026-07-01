import { defineQuery } from 'next-sanity';

// GROQ queries. `defineQuery` enables typegen via `sanity typegen`.

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    title, tagline, description, socialLinks
  }
`);

// Events split into the three programming tiers by date.
export const EVENTS_ON_VIEW_QUERY = defineQuery(`
  *[_type == "event" && startDate <= now() && endDate >= now()]
    | order(startDate asc){
      _id, title, slug, startDate, endDate, space->{title}, "image": heroImage
    }
`);

export const EVENTS_UPCOMING_QUERY = defineQuery(`
  *[_type == "event" && startDate > now()]
    | order(startDate asc)[0...12]{
      _id, title, slug, startDate, endDate, "image": heroImage
    }
`);

export const EVENTS_PAST_QUERY = defineQuery(`
  *[_type == "event" && endDate < now()]
    | order(endDate desc)[0...24]{
      _id, title, slug, startDate, endDate, "image": heroImage
    }
`);

export const EVENT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "event" && slug.current == $slug][0]{
    ..., space->{title, slug}
  }
`);

export const SPACES_QUERY = defineQuery(`
  *[_type == "space"] | order(order asc){
    _id, title, slug, summary, "image": heroImage
  }
`);

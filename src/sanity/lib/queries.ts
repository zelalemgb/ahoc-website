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

// Ticketing view of an event: identity + ticket-type definitions.
export const EVENT_TICKETING_QUERY = defineQuery(`
  *[_type == "event" && slug.current == $slug][0]{
    _id, title, slug, startDate, endDate, "image": heroImage, summary,
    space->{title},
    ticketTypes[]{ _key, name, price, currency, capacity }
  }
`);

export const SPACES_QUERY = defineQuery(`
  *[_type == "space"] | order(order asc){
    _id, title, slug, summary, "image": heroImage
  }
`);

// Site search. Matches localised titles, summaries and portable-text bodies.
// `$t` arrives already wildcarded (e.g. "gebey*") so partial words hit.
// Only document types with a real detail route are included — linking to a
// page that doesn't exist yet would be worse than omitting the result.
export const SEARCH_QUERY = defineQuery(`
  *[
    (_type == "event" || _type == "space" || _type == "newsPost")
    && (
      title.en match $t || title.am match $t
      || summary.en match $t || summary.am match $t
      || excerpt.en match $t || excerpt.am match $t
      || pt::text(body) match $t
    )
  ][0...30]{
    _id, _type, title, slug, summary, excerpt
  }
`);

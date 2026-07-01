/* eslint-disable @next/next/no-img-element */
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Image } from 'sanity';
import { sanityFetch } from '@/sanity/lib/fetch';
import { EVENT_TICKETING_QUERY } from '@/sanity/lib/queries';
import { urlForImage } from '@/sanity/lib/image';
import { getSoldCounts, remaining } from '@/lib/tickets/availability';
import { TicketPicker, type TicketTypeView } from '@/components/tickets/ticket-picker';

// Live availability comes from the DB, so render per-request.
export const dynamic = 'force-dynamic';

type LocaleStr = { en?: string; am?: string };
type TT = { _key: string; name?: LocaleStr; price?: number; currency?: string; capacity?: number };
type EventDoc = {
  _id: string;
  title?: LocaleStr;
  startDate?: string;
  summary?: LocaleStr;
  image?: Image;
  ticketTypes?: TT[];
};

export default async function EventPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const event = await sanityFetch<EventDoc | null>({
    query: EVENT_TICKETING_QUERY,
    params: { slug },
    fallback: null,
  });
  if (!event) notFound();

  const l = locale as 'en' | 'am';
  const sold = event.ticketTypes?.length ? await getSoldCounts(event._id) : {};
  const title = event.title?.[l] ?? event.title?.en ?? '';

  const ticketTypes: TicketTypeView[] = (event.ticketTypes ?? []).map((t) => ({
    key: t._key,
    name: t.name?.[l] ?? t.name?.en ?? 'Ticket',
    price: t.price ?? 0,
    currency: t.currency ?? 'ETB',
    remaining: remaining(t.capacity, sold[t._key] ?? 0),
  }));

  return (
    <div className="mx-auto max-w-shell px-5 py-16 sm:px-10">
      <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          {event.image ? (
            <div className="mb-8 aspect-video overflow-hidden rounded-sm bg-paper-2">
              <img
                alt=""
                className="h-full w-full object-cover"
                src={urlForImage(event.image).width(1200).height(675).url()}
              />
            </div>
          ) : null}
          <h1 className="font-display text-[clamp(32px,4.5vw,56px)] leading-[0.98]">{title}</h1>
          {event.summary ? (
            <p className="mt-4 max-w-prose text-lg text-ink/70">
              {event.summary[l] ?? event.summary.en}
            </p>
          ) : null}
        </div>
        <aside>
          {ticketTypes.length ? (
            <TicketPicker slug={slug} ticketTypes={ticketTypes} />
          ) : (
            <p className="text-ink/60">Tickets for this event aren’t available yet.</p>
          )}
        </aside>
      </div>
    </div>
  );
}

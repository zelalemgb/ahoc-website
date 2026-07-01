'use server';

import { z } from 'zod';
import { db, isDbConfigured } from '@/db';
import { orders, orderItems } from '@/db/schema';
import { sanityFetch } from '@/sanity/lib/fetch';
import { EVENT_TICKETING_QUERY } from '@/sanity/lib/queries';
import { getGateway } from '@/lib/payments';
import { orderReference } from '@/lib/ids';
import { getSoldCounts, remaining } from './availability';
import { mintTickets } from './fulfil';

const InputSchema = z.object({
  slug: z.string().min(1),
  email: z.string().email(),
  name: z.string().max(120).optional(),
  locale: z.enum(['en', 'am']).default('en'),
  items: z
    .array(z.object({ key: z.string().min(1), quantity: z.number().int().min(1).max(10) }))
    .min(1),
});

type LocaleStr = { en?: string; am?: string };
type TicketTypeDef = {
  _key: string;
  name?: LocaleStr;
  price?: number;
  currency?: string;
  capacity?: number;
};
type EventDoc = { _id: string; title?: LocaleStr; ticketTypes?: TicketTypeDef[] };

export type OrderResult =
  | { ok: true; kind: 'free'; reference: string }
  | { ok: true; kind: 'redirect'; url: string }
  | { ok: false; error: string };

/**
 * Validate a ticket request against the CMS (never trust client prices),
 * check availability, create an order + line items, then either confirm a free
 * RSVP immediately or hand off to the payment gateway. Tickets for paid orders
 * are minted by the webhook after verification (see fulfilPaidOrder).
 */
export async function createTicketOrder(input: unknown): Promise<OrderResult> {
  const parsed = InputSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: 'Invalid request.' };
  const { slug, email, name, locale, items } = parsed.data;

  if (!isDbConfigured) return { ok: false, error: 'Ticketing is not available yet.' };

  const event = await sanityFetch<EventDoc | null>({
    query: EVENT_TICKETING_QUERY,
    params: { slug },
    fallback: null,
    revalidate: 0,
  });
  if (!event?.ticketTypes?.length) {
    return { ok: false, error: 'This event is not open for ticketing.' };
  }

  const sold = await getSoldCounts(event._id);
  const defs = new Map(event.ticketTypes.map((t) => [t._key, t]));
  const currency = event.ticketTypes[0]?.currency ?? 'ETB';

  let amountTotal = 0; // minor units
  const lines: { def: TicketTypeDef; quantity: number }[] = [];
  for (const item of items) {
    const def = defs.get(item.key);
    if (!def) return { ok: false, error: 'Unknown ticket type.' };
    const rem = remaining(def.capacity, sold[item.key] ?? 0);
    if (rem !== null && item.quantity > rem) {
      const label = def.name?.[locale] ?? def.name?.en ?? 'this ticket';
      return { ok: false, error: rem === 0 ? `${label} is sold out.` : `Only ${rem} left for ${label}.` };
    }
    amountTotal += Math.round((def.price ?? 0) * 100) * item.quantity;
    lines.push({ def, quantity: item.quantity });
  }

  const reference = orderReference();
  const eventTitle = event.title?.[locale] ?? event.title?.en ?? '';
  const isFree = amountTotal === 0;
  const gateway = getGateway();

  const [order] = await db
    .insert(orders)
    .values({
      reference,
      eventId: event._id,
      eventTitle,
      email,
      name,
      status: isFree ? 'paid' : 'pending',
      currency,
      amountTotal,
      gateway: isFree ? 'free' : gateway.name,
      locale,
    })
    .returning();

  await db.insert(orderItems).values(
    lines.map((l) => ({
      orderId: order!.id,
      ticketTypeKey: l.def._key,
      ticketTypeName: l.def.name?.en,
      unitPrice: Math.round((l.def.price ?? 0) * 100),
      quantity: l.quantity,
    })),
  );

  if (isFree) {
    await mintTickets(order!.id, event._id);
    return { ok: true, kind: 'free', reference };
  }


  if (!gateway.configured) {
    return { ok: false, error: 'Online payment is not configured yet.' };
  }
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const { checkoutUrl } = await gateway.createCheckout({
    reference,
    amount: amountTotal,
    currency,
    email,
    name,
    title: eventTitle,
    callbackUrl: `${base}/api/payments/${gateway.name}/webhook`,
    returnUrl: `${base}/${locale}/tickets/success?ref=${reference}`,
  });
  return { ok: true, kind: 'redirect', url: checkoutUrl };
}

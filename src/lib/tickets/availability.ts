import 'server-only';
import { and, eq, sql } from 'drizzle-orm';
import { db, isDbConfigured } from '@/db';
import { orders, tickets } from '@/db/schema';

/** Tickets sold (paid & valid) per ticket-type key for an event. */
export async function getSoldCounts(eventId: string): Promise<Record<string, number>> {
  if (!isDbConfigured) return {};
  try {
    const rows = await db
      .select({ key: tickets.ticketTypeKey, count: sql<number>`count(*)::int` })
      .from(tickets)
      .innerJoin(orders, eq(tickets.orderId, orders.id))
      .where(
        and(
          eq(tickets.eventId, eventId),
          eq(orders.status, 'paid'),
          eq(tickets.status, 'valid'),
        ),
      )
      .groupBy(tickets.ticketTypeKey);
    return Object.fromEntries(rows.map((r) => [r.key, r.count]));
  } catch (error) {
    console.error('[availability] getSoldCounts failed:', error);
    return {};
  }
}

/** Remaining capacity, or null when capacity is unlimited. */
export function remaining(capacity: number | null | undefined, sold: number): number | null {
  if (capacity == null) return null;
  return Math.max(0, capacity - sold);
}

import 'server-only';
import { eq } from 'drizzle-orm';
import { db, isDbConfigured } from '@/db';
import { orders, orderItems, tickets, type NewTicket } from '@/db/schema';
import { ticketToken } from '@/lib/ids';

/** Mint one ticket row per admitted seat from an order's stored line items. */
export async function mintTickets(orderId: string, eventId: string): Promise<void> {
  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  const rows: NewTicket[] = [];
  for (const item of items) {
    for (let i = 0; i < item.quantity; i++) {
      rows.push({
        orderId,
        eventId,
        ticketTypeKey: item.ticketTypeKey,
        ticketTypeName: item.ticketTypeName,
        unitPrice: item.unitPrice,
        token: ticketToken(),
      });
    }
  }
  if (rows.length) await db.insert(tickets).values(rows);
}

/**
 * Mark a paid order fulfilled and mint its tickets. Idempotent — safe against
 * a webhook firing more than once.
 */
export async function fulfilPaidOrder(reference: string, gatewayRef?: string): Promise<boolean> {
  if (!isDbConfigured) return false;
  const order = await db.query.orders.findFirst({ where: eq(orders.reference, reference) });
  if (!order) return false;
  if (order.status === 'paid') return true;

  await db
    .update(orders)
    .set({ status: 'paid', gatewayRef, updatedAt: new Date() })
    .where(eq(orders.id, order.id));
  await mintTickets(order.id, order.eventId);
  return true;
}

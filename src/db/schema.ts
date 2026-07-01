import { pgTable, pgEnum, uuid, text, integer, timestamp, index } from 'drizzle-orm/pg-core';

/**
 * Transactional schema (the "application plane").
 * Content (events, ticket-type definitions, prices, capacity) lives in Sanity;
 * this database holds the state that changes with sales — orders and issued
 * tickets. Money is stored in minor units (e.g. Birr santim / cents).
 */

export const orderStatus = pgEnum('order_status', [
  'pending',
  'paid',
  'failed',
  'cancelled',
  'refunded',
]);

export const ticketStatus = pgEnum('ticket_status', ['valid', 'checked_in', 'void']);

export const orders = pgTable(
  'orders',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    // Short human-readable code shown to the buyer (e.g. AHOC-7F3K2Q).
    reference: text('reference').notNull().unique(),
    // Sanity event document id + a denormalised title snapshot.
    eventId: text('event_id').notNull(),
    eventTitle: text('event_title'),
    // Buyer (guest checkout — userId optional until accounts land).
    email: text('email').notNull(),
    name: text('name'),
    userId: text('user_id'),
    status: orderStatus('status').notNull().default('pending'),
    currency: text('currency').notNull().default('ETB'),
    amountTotal: integer('amount_total').notNull().default(0),
    // Payment gateway metadata ('chapa' | 'free' | 'stripe' | ...).
    gateway: text('gateway'),
    gatewayRef: text('gateway_ref'),
    locale: text('locale').notNull().default('en'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    eventIdx: index('orders_event_idx').on(t.eventId),
    emailIdx: index('orders_email_idx').on(t.email),
  }),
);

export const tickets = pgTable(
  'tickets',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    orderId: uuid('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    eventId: text('event_id').notNull(),
    // References the Sanity ticketType array item `_key`.
    ticketTypeKey: text('ticket_type_key').notNull(),
    ticketTypeName: text('ticket_type_name'),
    unitPrice: integer('unit_price').notNull().default(0),
    // Opaque token encoded in the QR for door check-in.
    token: text('token').notNull().unique(),
    status: ticketStatus('status').notNull().default('valid'),
    checkedInAt: timestamp('checked_in_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    orderIdx: index('tickets_order_idx').on(t.orderId),
    eventTypeIdx: index('tickets_event_type_idx').on(t.eventId, t.ticketTypeKey),
  }),
);

/** Line items of an order — what was requested, persisted so the payment
 *  webhook can mint the correct tickets after verification. */
export const orderItems = pgTable('order_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  ticketTypeKey: text('ticket_type_key').notNull(),
  ticketTypeName: text('ticket_type_name'),
  unitPrice: integer('unit_price').notNull().default(0),
  quantity: integer('quantity').notNull().default(1),
});

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;
export type Ticket = typeof tickets.$inferSelect;
export type NewTicket = typeof tickets.$inferInsert;

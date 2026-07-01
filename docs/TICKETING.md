# Ticketing & the application plane

The site has two data planes:

- **Content plane — Sanity** (already live): events, spaces, pages, news, and
  the *definitions* of ticket types (name, price, capacity) on each event.
- **Application plane — Postgres** (this): the state that changes with sales —
  `orders`, `order_items`, `tickets`. Money is stored in **minor units**.

Payments go through **Chapa** (works in Ethiopia: cards, telebirr, mobile
money, bank transfer) behind a `PaymentGateway` interface, so the provider can
be swapped without touching business logic.

## Flow

```
Event page (/whats-on/[slug])
  → TicketPicker (client) → createTicketOrder (Server Action)
      · validates against Sanity (prices/capacity — never trusts the client)
      · checks availability (capacity − paid tickets)
      · inserts order (pending) + order_items
      · FREE  → mints tickets immediately, status=paid, done
      · PAID  → Chapa checkout → redirect
  → Chapa → /api/payments/chapa/webhook
      · re-verifies the transaction with Chapa
      · fulfilPaidOrder(): status=paid, mints one `tickets` row per seat (QR token)
  → /tickets/success?ref=… shows status; tickets are emailed (Resend, later)
```

Availability is derived: `capacity` (Sanity) − sold (`tickets` joined to paid
`orders`). Overselling in the brief pending window is a known MVP trade-off;
add short-lived reservations later.

## Key files

| Area | Path |
| --- | --- |
| DB schema | `src/db/schema.ts`, client `src/db/index.ts`, migrations `drizzle/` |
| Auth | `src/auth.ts`, `src/app/api/auth/[...nextauth]/route.ts` |
| Payments | `src/lib/payments/` (gateway interface + `chapa.ts`) |
| Ticketing | `src/lib/tickets/` (actions, availability, fulfil) |
| Webhook | `src/app/api/payments/chapa/webhook/route.ts` |
| UI | `src/components/tickets/ticket-picker.tsx`, `src/app/[locale]/whats-on/[slug]` |
| CMS | `ticketTypes` on the `event` schema |

## Activating it

1. **Database** — create a Postgres (Neon free tier, or DO Managed). Set
   `DATABASE_URL`, then `npm run db:migrate`.
2. **Auth** (optional for guest checkout) — `npx auth secret` → `AUTH_SECRET`;
   add `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` for Google sign-in.
3. **Payments** — create a Chapa account, set `CHAPA_SECRET_KEY` (test key first).
4. Set the same vars in DigitalOcean → the deployed app turns ticketing on.
5. In `/studio`, add an event with one or more **Ticket types** (price 0 = free
   RSVP) and publish. The event page then shows the picker.

Until `DATABASE_URL` is set, everything is guarded: the rest of the site works
normally and ticket actions return "not available yet."

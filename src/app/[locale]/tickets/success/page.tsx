import { setRequestLocale } from 'next-intl/server';
import { eq } from 'drizzle-orm';
import { db, isDbConfigured } from '@/db';
import { orders } from '@/db/schema';
import { ButtonLink } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function TicketSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ ref?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { ref } = await searchParams;

  let status: string | null = null;
  if (ref && isDbConfigured) {
    try {
      const order = await db.query.orders.findFirst({ where: eq(orders.reference, ref) });
      status = order?.status ?? null;
    } catch {
      status = null;
    }
  }
  const paid = status === 'paid';

  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="font-display text-xs uppercase tracking-[0.2em] text-maroon">Booking</p>
      <h1 className="mt-3 font-display text-4xl">
        {paid ? 'You’re in' : status === 'pending' ? 'Payment pending…' : 'Order received'}
      </h1>
      <p className="mt-4 text-ink/70">
        {ref ? (
          <>
            Reference <b>{ref}</b>.{' '}
          </>
        ) : null}
        {paid
          ? 'Your tickets have been emailed to you.'
          : 'If you completed payment, your tickets will arrive by email shortly.'}
      </p>
      <ButtonLink href="/whats-on" className="mt-8">
        Back to What’s On →
      </ButtonLink>
    </div>
  );
}

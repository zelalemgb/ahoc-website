import { type NextRequest, NextResponse } from 'next/server';
import { getGateway } from '@/lib/payments';
import { fulfilPaidOrder } from '@/lib/tickets/fulfil';

/**
 * Chapa payment callback. We never trust the payload — we re-verify the
 * transaction with Chapa by our reference, then fulfil the order (idempotent).
 */
async function handle(req: NextRequest) {
  let reference = req.nextUrl.searchParams.get('tx_ref') ?? undefined;
  if (!reference) {
    const body = (await req.json().catch(() => ({}))) as { tx_ref?: string; reference?: string };
    reference = body.tx_ref ?? body.reference;
  }
  if (!reference) return NextResponse.json({ ok: false, error: 'missing reference' }, { status: 400 });

  const result = await getGateway().verify(reference);
  if (!result.paid) {
    return NextResponse.json({ ok: false, error: 'unverified' }, { status: 202 });
  }
  await fulfilPaidOrder(reference, result.gatewayRef);
  return NextResponse.json({ ok: true });
}

export const POST = handle;
export const GET = handle;

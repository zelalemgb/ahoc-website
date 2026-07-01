import type { CheckoutParams, PaymentGateway, VerifyResult } from './gateway';

const CHAPA_API = 'https://api.chapa.co/v1';

/**
 * Chapa gateway. Amounts are passed to Chapa in major units (Birr), so we
 * convert from the minor units we store. Set CHAPA_SECRET_KEY to enable.
 */
export class ChapaGateway implements PaymentGateway {
  readonly name = 'chapa';

  get configured(): boolean {
    return Boolean(process.env.CHAPA_SECRET_KEY);
  }

  private headers() {
    return {
      Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
      'Content-Type': 'application/json',
    };
  }

  async createCheckout(p: CheckoutParams): Promise<{ checkoutUrl: string }> {
    if (!this.configured) throw new Error('Chapa is not configured (CHAPA_SECRET_KEY missing).');
    const [firstName, ...rest] = (p.name ?? '').trim().split(' ');
    const res = await fetch(`${CHAPA_API}/transaction/initialize`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify({
        amount: (p.amount / 100).toFixed(2),
        currency: p.currency,
        email: p.email,
        first_name: firstName || undefined,
        last_name: rest.join(' ') || undefined,
        tx_ref: p.reference,
        callback_url: p.callbackUrl,
        return_url: p.returnUrl,
        customization: { title: (p.title ?? 'AHOC').slice(0, 16) },
      }),
    });
    const json = (await res.json()) as {
      status: string;
      message?: string;
      data?: { checkout_url?: string };
    };
    if (json.status !== 'success' || !json.data?.checkout_url) {
      throw new Error(`Chapa init failed: ${json.message ?? 'unknown error'}`);
    }
    return { checkoutUrl: json.data.checkout_url };
  }

  async verify(reference: string): Promise<VerifyResult> {
    if (!this.configured) return { paid: false };
    const res = await fetch(`${CHAPA_API}/transaction/verify/${reference}`, {
      headers: this.headers(),
    });
    const json = (await res.json()) as {
      status: string;
      data?: { status?: string; reference?: string };
    };
    return {
      paid: json.status === 'success' && json.data?.status === 'success',
      gatewayRef: json.data?.reference,
    };
  }
}

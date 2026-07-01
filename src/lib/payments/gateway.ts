/**
 * Payment-gateway abstraction. The rest of the app (orders, fulfilment,
 * webhooks) is written against this interface so the concrete provider can be
 * swapped without touching business logic. AHOC uses Chapa (works in Ethiopia:
 * cards, telebirr, mobile money, bank transfer); a Stripe implementation could
 * be added later for an international/USD flow behind the same interface.
 */

export type CheckoutParams = {
  reference: string; // our order reference / tx_ref
  amount: number; // minor units (e.g. Birr santim)
  currency: string; // e.g. 'ETB'
  email: string;
  name?: string;
  title?: string; // event / order title for the checkout page
  callbackUrl: string; // server-to-server verification webhook
  returnUrl: string; // browser redirect after payment
};

export type VerifyResult = {
  paid: boolean;
  gatewayRef?: string;
};

export interface PaymentGateway {
  readonly name: string;
  readonly configured: boolean;
  /** Create a hosted checkout and return the URL to send the buyer to. */
  createCheckout(params: CheckoutParams): Promise<{ checkoutUrl: string }>;
  /** Verify a transaction by our reference (called from the webhook). */
  verify(reference: string): Promise<VerifyResult>;
}

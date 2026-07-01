import type { PaymentGateway } from './gateway';
import { ChapaGateway } from './chapa';

/** The active payment gateway. Swap here to change providers app-wide. */
export function getGateway(): PaymentGateway {
  return new ChapaGateway();
}

export type { PaymentGateway, CheckoutParams, VerifyResult } from './gateway';

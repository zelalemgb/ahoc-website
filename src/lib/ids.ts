import { randomBytes, randomUUID } from 'crypto';

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no ambiguous chars

/** Human-friendly order reference, e.g. AHOC-7F3K2Q. */
export function orderReference(): string {
  const bytes = randomBytes(6);
  let out = '';
  for (let i = 0; i < 6; i++) out += ALPHABET[bytes[i]! % ALPHABET.length];
  return `AHOC-${out}`;
}

/** Opaque per-ticket token embedded in the QR code for door check-in. */
export function ticketToken(): string {
  return randomUUID().replace(/-/g, '') + randomBytes(8).toString('hex');
}

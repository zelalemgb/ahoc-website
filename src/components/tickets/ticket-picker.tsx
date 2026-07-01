'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { createTicketOrder, type OrderResult } from '@/lib/tickets/actions';

export type TicketTypeView = {
  key: string;
  name: string;
  price: number; // major units (Birr)
  currency: string;
  remaining: number | null; // null = unlimited
};

export function TicketPicker({ slug, ticketTypes }: { slug: string; ticketTypes: TicketTypeView[] }) {
  const locale = useLocale();
  const router = useRouter();
  const [qty, setQty] = useState<Record<string, number>>({});
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allFree = ticketTypes.every((t) => t.price === 0);
  const total = ticketTypes.reduce((s, t) => s + t.price * (qty[t.key] ?? 0), 0);
  const count = Object.values(qty).reduce((s, n) => s + n, 0);

  async function submit() {
    setError(null);
    const items = Object.entries(qty)
      .filter(([, n]) => n > 0)
      .map(([key, quantity]) => ({ key, quantity }));
    if (!items.length) return setError('Select at least one ticket.');
    setBusy(true);
    const res: OrderResult = await createTicketOrder({ slug, email, name, locale, items });
    setBusy(false);
    if (!res.ok) return setError(res.error);
    if (res.kind === 'redirect') window.location.href = res.url;
    else router.push(`/tickets/success?ref=${res.reference}`);
  }

  return (
    <div className="rounded-sm border border-line bg-paper-2/50 p-6">
      <h2 className="font-display text-xl">{allFree ? 'Reserve your place' : 'Get tickets'}</h2>

      <div className="mt-4 space-y-3">
        {ticketTypes.map((t) => {
          const soldOut = t.remaining === 0;
          return (
            <div key={t.key} className="flex items-center justify-between gap-4 border-b border-line pb-3">
              <div>
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-ink/60">
                  {t.price === 0 ? 'Free' : `${t.price} ${t.currency}`}
                  {t.remaining !== null ? ` · ${t.remaining} left` : ''}
                </div>
              </div>
              <select
                aria-label={`Quantity for ${t.name}`}
                disabled={soldOut}
                className="rounded-sm border border-line bg-paper px-3 py-2 disabled:opacity-40"
                value={qty[t.key] ?? 0}
                onChange={(e) => setQty((q) => ({ ...q, [t.key]: Number(e.target.value) }))}
              >
                {Array.from({ length: Math.min(10, (t.remaining ?? 10)) + 1 }, (_, i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>

      <div className="mt-4 grid gap-3">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-sm border border-line bg-paper px-3 py-2.5"
        />
        <input
          type="email"
          required
          placeholder="Email for your tickets"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-sm border border-line bg-paper px-3 py-2.5"
        />
      </div>

      {error ? <p className="mt-3 text-sm font-semibold text-vermilion">{error}</p> : null}

      <button
        type="button"
        onClick={submit}
        disabled={busy || count === 0}
        className="mt-4 w-full rounded-sm bg-maroon py-3 font-bold text-paper transition hover:bg-ink disabled:opacity-40"
      >
        {busy
          ? 'Processing…'
          : allFree
            ? `Reserve ${count || ''} place${count === 1 ? '' : 's'}`
            : `Pay ${total} ${ticketTypes[0]?.currency ?? 'ETB'} →`}
      </button>
      <p className="mt-2 text-center text-xs text-ink/50">
        Tickets are emailed to you. No account required.
      </p>
    </div>
  );
}

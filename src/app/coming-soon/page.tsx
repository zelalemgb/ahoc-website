/* eslint-disable @next/next/no-img-element */

export default function ComingSoonPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-paper px-6 text-center">
      {/* faint oversized arch motif */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-[130vh] w-[80vw] max-w-[900px] -translate-x-1/2 rounded-[9999px_9999px_0_0] bg-paper-2/60"
      />

      <div className="relative z-10 flex flex-col items-center">
        <img src="/logo-mark.png" alt="" width={466} height={761} className="h-24 w-auto" />

        <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.34em] text-maroon">
          Addis House of Culture · Addis Ababa
        </p>

        <h1 className="mt-5 max-w-3xl font-display text-[clamp(38px,7vw,80px)] leading-[0.95] tracking-tight">
          We&rsquo;re open —
          <br />
          our website is on its way.
        </h1>

        <p className="mt-6 max-w-xl text-lg text-ink/70">
          The gallery, audiovisual centre, library, shop and café are open now, with exhibitions and
          events throughout the week. Come visit while we finish building our full website.
        </p>

        <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-line px-6 py-3">
          <span className="h-2 w-2 rounded-full bg-gold" />
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-maroon">
            Website coming soon
          </span>
        </div>

        <p className="mt-8 text-sm font-semibold text-ink/60">
          Visit us · Grand Palace, Zewditu Court, Addis Ababa
        </p>

        <p lang="am" className="mt-3 font-ethiopic text-lg text-ink/60">
          ድረ-ገጻችን በቅርቡ ይጀምራል
        </p>
      </div>

      <footer className="absolute bottom-6 text-xs text-ink/40">
        © {new Date().getFullYear()} Addis House of Culture · Hub of Ethiopia
      </footer>
    </main>
  );
}

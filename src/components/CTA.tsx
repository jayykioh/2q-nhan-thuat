import Link from "next/link";

export default function CTA() {
  return (
    <section className="cta px-[var(--gutter)] py-[var(--section-py)] bg-[var(--bg-elevated)] text-center border-t border-[var(--border)] flex flex-col items-center">
      <p className="font-body text-[var(--label-size)] tracking-[0.15em] uppercase text-[var(--text-muted)] mb-4">
        Available for custom orders
      </p>
      <Link 
        href="/appointment"
        className="block font-display text-[var(--h2-size)] font-light tracking-tight text-[var(--text-primary)] leading-[1.1] my-8 transition-colors duration-[var(--dur-fast)] ease-[var(--ease-cinematic)] hover:text-[var(--accent)]"
      >
        Let&apos;s make something<br />
        <em className="italic">worth remembering.</em>
      </Link>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-4 mb-12">
        <Link 
          href="/connect"
          className="group inline-flex min-h-11 items-center gap-3 font-body text-[var(--label-size)] uppercase tracking-[0.15em] text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-300"
        >
          <span className="h-px w-8 bg-[var(--text-muted)] transition-all duration-500 group-hover:w-14 group-hover:bg-[var(--accent)]" />
          Connect & Channels
        </Link>
        <Link 
          href="/appointment"
          className="group inline-flex h-12 items-center justify-center gap-3 border border-[var(--accent)] px-8 font-body text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] hover:text-[var(--bg)] hover:bg-[var(--accent)] transition-all duration-500 font-medium"
        >
          Book Appointment
        </Link>
      </div>

      <p className="font-body text-[var(--label-size)] tracking-[0.15em] uppercase text-[var(--text-muted)]">
        DA NANG — WORLDWIDE SHIPPING
      </p>
    </section>
  );
}

import Link from "next/link";

export default function CTA() {
  return (
    <section className="cta px-[var(--gutter)] py-[var(--section-py)] bg-[var(--bg-elevated)] text-center border-t border-[var(--border)]">
      <p className="font-body text-[var(--label-size)] tracking-[0.15em] uppercase text-[var(--text-muted)] mb-4">
        Available for custom orders
      </p>
      <Link 
        href="https://www.facebook.com/profile.php?id=61577127505025"
        target="_blank"
        rel="noopener noreferrer"
        className="block font-display text-[var(--h2-size)] font-light tracking-tight text-[var(--text-primary)] leading-[1.1] my-8 transition-colors duration-[var(--dur-fast)] ease-[var(--ease-cinematic)] hover:text-[var(--accent)]"
      >
        Let&apos;s make something<br />
        <em className="italic">worth remembering.</em>
      </Link>
      <p className="font-body text-[var(--label-size)] tracking-[0.15em] uppercase text-[var(--text-muted)] mt-8">
        DA NANG — WORLDWIDE SHIPPING
      </p>
    </section>
  );
}

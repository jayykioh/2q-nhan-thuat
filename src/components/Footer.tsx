import Link from "next/link";

const Facebook = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const WhatsApp = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const MapPin = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--bg)] border-t border-[rgba(255,255,255,0.08)]">
      {/* CTA Section */}
      <div className="px-[var(--gutter)] py-[clamp(60px,10vw,100px)] border-b border-[rgba(255,255,255,0.08)]">
        <div className="footer-cta-reveal">
          <Link
            href="#contact"
            className="block font-display text-[clamp(28px,5vw,56px)] font-light tracking-tight leading-[1.1] text-[var(--text-primary)] hover:opacity-75 transition-opacity duration-250 max-w-[680px]"
          >
            Let&apos;s make something{" "}
            <em className="text-[var(--accent)] italic font-light">
              worth remembering.
            </em>
          </Link>
        </div>

        <p className="font-body text-[9px] font-normal tracking-[0.2em] uppercase text-[rgba(255,255,255,0.22)] mt-7">
          DA NANG — WORLDWIDE SHIPPING
        </p>
      </div>

      {/* Minimalist Bottom Bar */}
      <div className="px-[var(--gutter)] py-8 md:py-12">
        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-5 gap-8 items-end">
          {/* Col 1: Brand */}
          <div>
            <p className="font-display text-[14px] font-normal text-[var(--text-primary)]">
              2Q Nhẫn Thuật (2qnhanthuat)
            </p>
            <p className="font-body text-[10px] tracking-[0.06em] text-[rgba(255,255,255,0.40)] mt-1">
              Handcrafted rings from spoons
            </p>
            <p className="font-body text-[9px] tracking-[0.06em] text-[rgba(255,255,255,0.20)] mt-2">
              © {currentYear}
            </p>
          </div>

          {/* Col 2-3: Quick Links (Center) */}
          <div className="col-span-2 flex justify-center gap-12">
            <Link
              href="#about"
              className="font-body text-[11px] font-normal tracking-[0.12em] uppercase text-[rgba(255,255,255,0.40)] hover:text-[var(--accent)] transition-colors duration-200"
            >
              About
            </Link>
            <Link
              href="#works"
              className="font-body text-[11px] font-normal tracking-[0.12em] uppercase text-[rgba(255,255,255,0.40)] hover:text-[var(--accent)] transition-colors duration-200"
            >
              Works
            </Link>
          </div>

          {/* Col 4: Contact Link */}
          <div>
            <a
              href="tel:0896208698"
              className="font-body text-[11px] font-normal tracking-[0.12em] uppercase text-[rgba(255,255,255,0.40)] hover:text-[var(--accent)] transition-colors duration-200"
            >
              0896 208 698
            </a>
          </div>

          {/* Col 5: Social Icons */}
          <div className="flex justify-end gap-6">
            <a
              href="https://www.facebook.com/profile.php?id=61577127505025"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center text-[rgba(255,255,255,0.35)] hover:text-[var(--accent)] transition-colors duration-200"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://www.instagram.com/2qnhanthuat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center text-[rgba(255,255,255,0.35)] hover:text-[var(--accent)] transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://wa.me/84896208698"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center text-[rgba(255,255,255,0.35)] hover:text-[var(--accent)] transition-colors duration-200"
              aria-label="WhatsApp"
            >
              <WhatsApp size={18} />
            </a>
            <a
              href="https://maps.google.com/?q=27+Nguyễn+Cao+Luyện,+An+Hải,+Đà+Nẵng"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center text-[rgba(255,255,255,0.35)] hover:text-[var(--accent)] transition-colors duration-200"
              aria-label="Google Maps"
            >
              <MapPin size={18} />
            </a>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex flex-col gap-8 md:hidden">
          {/* Brand + Copyright */}
          <div className="text-center">
            <p className="font-display text-[14px] font-normal text-[var(--text-primary)]">
              2Q Nhẫn Thuật (2qnhanthuat)
            </p>
            <p className="font-body text-[10px] tracking-[0.06em] text-[rgba(255,255,255,0.40)] mt-1">
              Handcrafted rings from spoons
            </p>
            <p className="font-body text-[9px] tracking-[0.06em] text-[rgba(255,255,255,0.20)] mt-1">
              © {currentYear}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex justify-center gap-8">
            <Link
              href="#about"
              className="font-body text-[11px] font-normal tracking-[0.12em] uppercase text-[rgba(255,255,255,0.40)] hover:text-[var(--accent)] transition-colors duration-200"
            >
              About
            </Link>
            <Link
              href="#works"
              className="font-body text-[11px] font-normal tracking-[0.12em] uppercase text-[rgba(255,255,255,0.40)] hover:text-[var(--accent)] transition-colors duration-200"
            >
              Works
            </Link>
            <a
              href="tel:0896208698"
              className="font-body text-[11px] font-normal tracking-[0.12em] uppercase text-[rgba(255,255,255,0.40)] hover:text-[var(--accent)] transition-colors duration-200"
            >
              Contact
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 pt-4 border-t border-[rgba(255,255,255,0.08)]">
            <a
              href="https://www.facebook.com/profile.php?id=61577127505025"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center text-[rgba(255,255,255,0.35)] hover:text-[var(--accent)] transition-colors duration-200"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://www.instagram.com/2qnhanthuat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center text-[rgba(255,255,255,0.35)] hover:text-[var(--accent)] transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://wa.me/84896208698"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center text-[rgba(255,255,255,0.35)] hover:text-[var(--accent)] transition-colors duration-200"
              aria-label="WhatsApp"
            >
              <WhatsApp size={18} />
            </a>
            <a
              href="https://maps.google.com/?q=27+Nguyễn+Cao+Luyện,+An+Hải,+Đà+Nẵng"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center text-[rgba(255,255,255,0.35)] hover:text-[var(--accent)] transition-colors duration-200"
              aria-label="Google Maps"
            >
              <MapPin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

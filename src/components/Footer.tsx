"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-[var(--gutter)] py-12 bg-[var(--bg)] border-t border-[var(--border)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col gap-2">
          <Link href="/" className="font-display text-2xl font-light text-[var(--text-primary)] tracking-widest uppercase mb-4">
            2Q Nhẫn Thuật
          </Link>
          <p className="font-body text-sm text-[var(--text-muted)] max-w-xs leading-relaxed">
            Transforming vintage spoons into unique wearable art. Da Nang, Vietnam.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <p className="font-body text-[var(--label-size)] tracking-[0.15em] uppercase text-[var(--text-primary)]">
              Contact
            </p>
            <ul className="flex flex-col gap-2 font-body text-sm text-[var(--text-muted)]">
              <li>
                <a href="tel:0896208698" className="hover:text-[var(--text-primary)] transition-colors">
                  0896 208 698
                </a>
              </li>
              <li>
                <a href="https://maps.app.goo.gl/BfdUSBMitjXtA9rK9" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">
                  Musky Bar (Workshop)
                </a>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col gap-4">
            <p className="font-body text-[var(--label-size)] tracking-[0.15em] uppercase text-[var(--text-primary)]">
              Social
            </p>
            <ul className="flex flex-col gap-2 font-body text-sm text-[var(--text-muted)]">
              <li>
                <a href="https://www.facebook.com/profile.php?id=61577127505025" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/2qnhanthuat" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-16 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-4 font-body text-xs text-[var(--text-muted)] tracking-wider">
        <p>&copy; {new Date().getFullYear()} 2Q Nhẫn Thuật. All rights reserved.</p>
        <p>Crafted by hand.</p>
      </div>
    </footer>
  );
}

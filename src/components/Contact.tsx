"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, MapPin } from "lucide-react";

const Facebook = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="reveal-section px-[var(--gutter)] py-12 lg:py-16 border-t border-[var(--border)] bg-[var(--bg)]"
      id="contact"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Contact info & Links */}
        <div className="flex flex-col h-full justify-center">
          <div>
            <span className="reveal-item font-body text-[var(--label-size)] tracking-[0.2em] uppercase text-[var(--accent)] mb-2 block">
              Connect
            </span>
            <h2 className="reveal-item font-display text-3xl lg:text-4xl font-light tracking-tight text-[var(--text-primary)] leading-[1.1] mb-4">
              Find the studio, <br />
              <em className="italic">or drop a line.</em>
            </h2>
            
            <p className="reveal-item font-body text-[var(--body-size)] text-[var(--text-muted)] leading-relaxed mb-8 max-w-md">
              Drop by Musky Slow Bar to view available designs, try on rings, and experience the handmade process firsthand. Or, get in touch online.
            </p>
          </div>

          <div className="space-y-6">
            {/* Phone contact */}
            <div className="reveal-item border-b border-[var(--border)] pb-4">
              <a
                href="tel:0896208698"
                className="group flex min-h-11 items-center gap-3 font-display text-xl sm:text-2xl font-light text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-300"
              >
                <Phone size={24} className="text-[var(--accent)]" />
                0896 208 698
              </a>
            </div>

            {/* Social channels */}
            <div className="reveal-item border-b border-[var(--border)] pb-4">
              <div className="flex flex-row items-center gap-6 sm:gap-8">
                <a
                  href="https://www.facebook.com/profile.php?id=61577127505025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-11 items-center gap-2 font-body text-sm tracking-[0.1em] uppercase text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-300"
                >
                  <Facebook size={18} className="text-[var(--accent)]" />
                  Facebook
                  <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300">
                    &rarr;
                  </span>
                </a>
                <a
                  href="https://www.instagram.com/2qnhanthuat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-11 items-center gap-2 font-body text-sm tracking-[0.1em] uppercase text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-300"
                >
                  <Instagram size={18} className="text-[var(--accent)]" />
                  Instagram
                  <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300">
                    &rarr;
                  </span>
                </a>
              </div>
            </div>

            {/* Workshop Address details */}
            <div className="reveal-item">
              <address className="not-italic font-body text-sm text-[var(--text-muted)] leading-relaxed flex flex-col gap-6">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Musky+Slow+Bar+%26+Bakery,+27+Nguyễn+Cao+Luyện,+An+Hải+Bắc,+Sơn+Trà,+Đà+Nẵng" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 hover:bg-[var(--bg-elevated)] p-2 -ml-2 rounded-lg transition-colors duration-300"
                >
                  <MapPin size={20} className="text-[var(--accent)] shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <strong className="text-[var(--text-primary)] font-medium block mb-1 group-hover:text-[var(--accent)] transition-colors duration-300">
                      Musky Slow Bar & Bakery
                    </strong>
                    <span className="group-hover:text-[var(--text-primary)] transition-colors duration-300">27 Nguyễn Cao Luyện, An Hải Bắc, Sơn Trà, Đà Nẵng</span>
                  </div>
                </a>
                
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Innoir,+D13,+An+Thượng+34,+Ngũ+Hành+Sơn,+Đà+Nẵng" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 hover:bg-[var(--bg-elevated)] p-2 -ml-2 rounded-lg transition-colors duration-300"
                >
                  <MapPin size={20} className="text-[var(--accent)] shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <strong className="text-[var(--text-primary)] font-medium block mb-1 group-hover:text-[var(--accent)] transition-colors duration-300">
                      Innoir
                    </strong>
                    <span className="group-hover:text-[var(--text-primary)] transition-colors duration-300">D13, An Thượng 34, Ngũ Hành Sơn, Đà Nẵng</span>
                  </div>
                </a>
              </address>
            </div>
          </div>
        </div>

        {/* Right Column: Google Maps Embed */}
        <div className="reveal-item w-full aspect-[4/3] sm:aspect-video relative rounded-[2px] overflow-hidden border border-[var(--border)] bg-[var(--bg-elevated)]">
          <iframe
            src="https://maps.google.com/maps?q=Musky%20Slow%20Bar%20%26%20Bakery,%2027%20Nguy%E1%BB%85n%20Cao%20Luy%E1%BB%87n,%20An%20H%E1%BA%A3i%20B%E1%BA%AFc,%20S%C6%A1n%20Tr%C3%A0,%20%C4%90%C3%A0%20N%E1%BA%B5ng&t=&z=16&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0 opacity-90 hover:opacity-100 transition-opacity duration-300"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Musky Slow Bar & Bakery Location Map"
          />
          <div className="absolute inset-0 pointer-events-none border border-inset border-[rgba(240,237,232,0.05)] rounded-[2px]" />
        </div>

      </div>
    </section>
  );
}

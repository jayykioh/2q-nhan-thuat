"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const SpoonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
    <path d="M18 6a4 4 0 0 0-5.657 0l-1.414 1.414a1.5 1.5 0 0 0 0 2.122l2.828 2.828a1.5 1.5 0 0 0 2.122 0L17.293 11A4 4 0 0 0 18 6z" />
    <path d="M13.757 12.243 4.565 21.435" />
  </svg>
);

const RingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
    <circle cx="12" cy="14" r="5" />
    <path d="M12 5l2 2-2 2-2-2 2-2z" />
  </svg>
);

const BraceletIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
    <ellipse cx="12" cy="12" rx="8" ry="4" />
    <path d="M4 12c0 2 3.582 4 8 4" />
  </svg>
);

const NecklaceIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
    <path d="M6 5c0 6 2.5 12 6 12s6-6 6-12" />
    <circle cx="12" cy="17" r="2" />
  </svg>
);

const items = [
  { text: "ONE-OF-ONE", Icon: SpoonIcon },
  { text: "HANDCRAFTED", Icon: RingIcon },
  { text: "STAINLESS STEEL", Icon: BraceletIcon },
  { text: "SUSTAINABLE", Icon: NecklaceIcon },
  { text: "WEARABLE STORIES", Icon: SpoonIcon },
  { text: "DA NANG MADE", Icon: RingIcon },
];

export default function Marquee() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Seamless GSAP horizontal marquee
      gsap.to(trackRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 25,
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const renderItems = () => (
    <>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-8 shrink-0">
          <span className="font-display text-2xl md:text-3xl font-light text-[var(--text-primary)] tracking-[0.1em] uppercase whitespace-nowrap">
            {item.text}
          </span>
          <div className="text-[var(--accent)] flex items-center justify-center">
            <item.Icon />
          </div>
        </div>
      ))}
    </>
  );

  return (
    <section 
      ref={containerRef}
      className="py-5 border-y border-[rgba(240,237,232,0.1)] bg-[var(--bg-elevated)] overflow-hidden flex items-center"
    >
      <div 
        ref={trackRef} 
        className="flex items-center gap-8 w-max will-change-transform"
      >
        {renderItems()}
        {renderItems()}
        {/* Render a 3rd and 4th time just in case of ultra-wide screens to ensure -50% has enough coverage */}
        {renderItems()}
        {renderItems()}
      </div>
    </section>
  );
}

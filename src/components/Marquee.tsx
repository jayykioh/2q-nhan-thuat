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

const EarringsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
    <path d="M7 5a3 3 0 0 0 0 6h0a3 3 0 0 0 0-6z" />
    <path d="M17 5a3 3 0 0 0 0 6h0a3 3 0 0 0 0-6z" />
    <path d="M7 11v4" />
    <path d="M17 11v4" />
    <circle cx="7" cy="16" r="1" />
    <circle cx="17" cy="16" r="1" />
  </svg>
);

const trackAItems = [
  { type: "word", text: "ONE-OF-ONE" },
  { type: "icon", Icon: SpoonIcon },
  { type: "word", text: "HANDCRAFTED" },
  { type: "icon", Icon: RingIcon },
  { type: "word", text: "STAINLESS STEEL" },
  { type: "icon", Icon: BraceletIcon },
  { type: "word", text: "SUSTAINABLE" },
  { type: "icon", Icon: EarringsIcon },
  { type: "word", text: "WEARABLE STORIES" },
  { type: "icon", Icon: NecklaceIcon },
  { type: "word", text: "DA NANG MADE" },
  { type: "icon", Icon: SpoonIcon },
];

const trackBItems = [
  { type: "word", text: "HANDCRAFTED" },
  { type: "icon", Icon: NecklaceIcon },
  { type: "word", text: "WEARABLE STORIES" },
  { type: "icon", Icon: RingIcon },
  { type: "word", text: "SUSTAINABLE" },
  { type: "icon", Icon: EarringsIcon },
  { type: "word", text: "ONE-OF-ONE" },
  { type: "icon", Icon: BraceletIcon },
  { type: "word", text: "DA NANG MADE" },
  { type: "icon", Icon: SpoonIcon },
  { type: "word", text: "STAINLESS STEEL" },
  { type: "icon", Icon: RingIcon },
];

export default function Marquee() {
  const containerRef = useRef<HTMLElement>(null);
  const trackARef = useRef<HTMLDivElement>(null);
  const trackBRef = useRef<HTMLDivElement>(null);
  
  const tweenARef = useRef<gsap.core.Tween | null>(null);
  const tweenBRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Seamless GSAP horizontal marquee moving left (Track A)
      tweenARef.current = gsap.to(trackARef.current, {
        xPercent: -50,
        ease: "none",
        duration: 80,
        repeat: -1,
      });

      // Seamless GSAP horizontal marquee moving right (Track B)
      // By starting at -50 and moving to 0, it perfectly loops to the right
      tweenBRef.current = gsap.fromTo(trackBRef.current, 
        { xPercent: -50 },
        {
          xPercent: 0,
          ease: "none",
          duration: 110,
          repeat: -1,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    if (tweenARef.current && tweenBRef.current) {
      gsap.to([tweenARef.current, tweenBRef.current], { timeScale: 0, duration: 1.5, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    if (tweenARef.current && tweenBRef.current) {
      gsap.to([tweenARef.current, tweenBRef.current], { timeScale: 1, duration: 1.5, ease: "power2.out" });
    }
  };

  const renderItems = (items: typeof trackAItems) => (
    <>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-8 shrink-0">
          {item.type === "word" ? (
            <span className="font-display text-2xl md:text-3xl font-light text-[var(--text-primary)] tracking-[0.1em] uppercase whitespace-nowrap">
              {item.text}
            </span>
          ) : item.Icon ? (
            <div className="text-[var(--accent)] flex items-center justify-center">
              <item.Icon />
            </div>
          ) : null}
        </div>
      ))}
    </>
  );

  return (
    <section 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="py-6 border-y border-[rgba(240,237,232,0.1)] bg-[var(--bg-elevated)] overflow-hidden flex flex-col gap-5 w-full cursor-default"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
    >
      <div className="overflow-hidden flex items-center w-full">
        <div 
          ref={trackARef} 
          className="flex items-center gap-8 w-max will-change-transform"
        >
          {renderItems(trackAItems)}
          {renderItems(trackAItems)}
          {renderItems(trackAItems)}
          {renderItems(trackAItems)}
        </div>
      </div>
      
      <div className="overflow-hidden flex items-center w-full">
        <div 
          ref={trackBRef} 
          className="flex items-center gap-8 w-max will-change-transform"
        >
          {renderItems(trackBItems)}
          {renderItems(trackBItems)}
          {renderItems(trackBItems)}
          {renderItems(trackBItems)}
        </div>
      </div>
    </section>
  );
}

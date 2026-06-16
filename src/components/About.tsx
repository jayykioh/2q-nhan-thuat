"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Image Parallax & Reveal
      gsap.fromTo(
        imageWrapperRef.current,
        { clipPath: "inset(10% 10% 10% 10%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { scale: 1.2 },
        {
          scale: 1,
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      // 2. Text Content Stagger Reveal
      gsap.fromTo(
        ".reveal-text",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
      
      // 3. Decorative Line Reveal
      gsap.fromTo(
        ".reveal-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power3.out",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="px-[var(--gutter)] py-20 md:py-32 lg:py-40 bg-[var(--bg)] border-b border-[var(--border)] overflow-hidden" id="about">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-16 xl:gap-24 items-center">
          
          {/* Text Content - Ordered 1 on Mobile, 2 on Desktop */}
          <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col justify-center">
            
            {/* Label */}
            <div className="reveal-text flex items-center gap-6 mb-8 md:mb-12">
              <span className="reveal-line w-16 md:w-24 h-[1px] bg-[var(--text-muted)] opacity-50 block"></span>
              <h2 className="font-body text-[10px] md:text-xs tracking-[0.3em] uppercase text-[var(--text-muted)]">
                The Founder
              </h2>
            </div>
            
            {/* Main Headline */}
            <h3 className="reveal-text font-display text-4xl md:text-5xl lg:text-6xl xl:text-[5rem] leading-[1.05] font-light text-[var(--text-primary)] mb-10 md:mb-14">
              Crafted with <br />
              <span className="inline-block mt-2 text-[var(--accent)] italic pr-4">Intention.</span>
            </h3>

            {/* Content Divider & Body */}
            <div className="relative pl-6 md:pl-10">
              {/* Vertical decorative line */}
              <div className="reveal-text absolute left-0 top-2 bottom-2 w-[1px] bg-gradient-to-b from-[var(--text-muted)] to-transparent opacity-20"></div>
              
              <div className="font-body text-base md:text-lg text-[var(--text-muted)] space-y-6 md:space-y-8 leading-relaxed max-w-xl">
                <p className="reveal-text text-[var(--text-primary)] font-medium text-lg md:text-xl leading-snug">
                  Each item is personally crafted by Quyen, ensuring authenticity, quality, and individuality.
                </p>
                <p className="reveal-text">
                  Rather than melting materials into new forms, 2Q Nhẫn Thuật preserves existing patterns and transforms them into jewelry. Repurposing vintage spoons reduces waste and gives forgotten objects a new life.
                </p>
                <p className="reveal-text">
                  No two people are the same. No two rings should be either. The imperfections of handmade craftsmanship are embraced as part of the product&apos;s identity.
                </p>
              </div>
            </div>
          </div>

          {/* Image - Ordered 2 on Mobile, 1 on Desktop */}
          <div className="order-2 lg:order-1 lg:col-span-5 relative w-full">
            <div 
              ref={imageWrapperRef}
              className="relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden"
            >
              <Image
                ref={imageRef}
                src="/images/settingup.jpg"
                alt="Founder Quyen Setting Up"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center grayscale-[20%]"
              />
              {/* Subtle grain overlay for premium feel */}
              <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

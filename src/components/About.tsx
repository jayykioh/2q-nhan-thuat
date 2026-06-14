"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 1.0,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "all"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="reveal-section px-[var(--gutter)] py-[var(--section-py)] bg-[var(--bg-elevated)]" id="about">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="reveal-item overflow-hidden rounded-[2px] aspect-[3/4] relative w-full max-w-md mx-auto md:mx-0">
          <Image
            src="/images/settingup.jpg"
            alt="Founder Quyen Setting Up"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="reveal-item flex flex-col justify-center">
          <p className="font-body text-[var(--label-size)] tracking-[0.15em] uppercase text-[var(--text-muted)] mb-6">
            The Founder
          </p>
          <h2 className="font-display text-[var(--h2-size)] leading-[1.1] font-light text-[var(--text-primary)] mb-8">
            Each item is personally crafted by <em className="text-[var(--accent)] italic">Quyen</em>, ensuring authenticity, quality, and individuality.
          </h2>
          <div className="font-body text-[var(--body-size)] text-[var(--text-muted)] space-y-6 leading-relaxed max-w-lg">
            <p>
              Rather than melting materials into new forms, 2Q Nhẫn Thuật preserves existing patterns and transforms them into jewelry. Repurposing vintage spoons reduces waste and gives forgotten objects a new life.
            </p>
            <p>
              No two people are the same. No two rings should be either. The imperfections of handmade craftsmanship are embraced as part of the product&apos;s identity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

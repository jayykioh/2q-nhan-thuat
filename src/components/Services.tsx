"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".reveal-item",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.12,
          ease: "power3.out",
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

  const services = [
    {
      num: "01",
      name: "Handmade Spoon Rings",
      desc: "Signature rings crafted from vintage spoons. Each spoon carries its own shape, pattern, and history, making every ring unique.",
    },
    {
      num: "02",
      name: "Spoon Bracelets",
      desc: "Hand-shaped bracelets created from stainless steel spoons. Comfortable, durable, and suitable for daily wear.",
    },
    {
      num: "03",
      name: "Custom Jewelry",
      desc: "Personalized rings and bracelets made according to customer preferences. Custom sizing, pattern selection, and custom engraving.",
    },
    {
      num: "04",
      name: "Stainless Steel",
      desc: "Rust resistant, durable, long-lasting, water-resistant, and comfortable on the skin for everyday wear.",
    },
  ];

  return (
    <section ref={containerRef} className="services reveal-section px-[var(--gutter)] py-[var(--section-py)]" id="services">
      <p className="reveal-item font-body text-[var(--label-size)] tracking-[0.15em] uppercase text-[var(--text-muted)] mb-8">
        What We Create
      </p>
      <h2 className="reveal-item font-display text-[var(--h2-size)] leading-[1.1] font-light text-[var(--text-primary)] mb-16">
        Handcrafted with <em className="text-[var(--accent)] italic">intention</em>.
      </h2>
      
      <div className="services-grid grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-20">
        {services.map((service, idx) => (
          <div key={idx} className="service-item reveal-item">
            <span className="font-body text-[var(--label-size)] tracking-[0.15em] text-[var(--text-muted)] block mb-4">
              {service.num}
            </span>
            <h3 className="font-display text-[var(--h3-size)] font-light mb-3 text-[var(--text-primary)] tracking-wide">
              {service.name}
            </h3>
            <p className="font-body text-[var(--body-size)] leading-[1.7] text-[var(--text-muted)] max-w-sm">
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

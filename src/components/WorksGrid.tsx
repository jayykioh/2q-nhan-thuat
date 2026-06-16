"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    src: "/images/images.jpg",
    category: "Signature",
    title: "Handmade Spoon Rings",
    large: true,
  },
  {
    src: "/images/images2.jpg",
    category: "Custom",
    title: "Unique Patterns",
    large: false,
  },
  {
    src: "/images/customer_choosing_spoon.jpg",
    category: "Experience",
    title: "Choosing the Story",
    large: false,
  },
  {
    src: "/images/moments_of_customer.jpg",
    category: "Community",
    title: "Customer Moments",
    large: true,
  },
];

export default function WorksGrid() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cleanupCards: Array<() => void> = [];

    const ctx = gsap.context(() => {
      // Reveal items on scroll - use fromTo so opacity:1 is explicit (not relying on CSS natural state)
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

      // Magnetic hover effect
      const cards = gsap.utils.toArray(".project-card") as HTMLElement[];
      cards.forEach((card) => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = (e.clientX - cx) * 0.12;
          const dy = (e.clientY - cy) * 0.12;
          gsap.to(card, { x: dx, y: dy, duration: 0.4, ease: "power2.out" });
        };

        const handleMouseLeave = () => {
          gsap.to(card, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);
        cleanupCards.push(() => {
          card.removeEventListener("mousemove", handleMouseMove);
          card.removeEventListener("mouseleave", handleMouseLeave);
        });
      });
    }, containerRef);

    return () => {
      cleanupCards.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="works reveal-section pt-[var(--section-py)] pb-[var(--section-py)]" id="works">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6 px-[var(--gutter)] reveal-item">
        <h2 className="font-body font-medium text-lg md:text-xl text-[var(--text-primary)]">Selected Works</h2>
        <p className="font-body text-sm text-[var(--text-muted)]">&bull; Projects</p>
      </div>
      
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-[var(--gutter)]">
        {projects.map((project, idx) => (
          <article
            key={idx}
            className="project-card reveal-item group relative overflow-hidden rounded-[2px] aspect-[4/5] w-full md:cursor-pointer"
          >
            <Image
              src={project.src}
              alt={project.title}
              fill
              sizes="(max-width: 768px) calc(100vw - 2rem), 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
            {/* Overlay that dims the image slightly on hover */}
            <div className="absolute inset-0 bg-black/25 transition-colors duration-500 md:bg-black/0 md:group-hover:bg-black/20" />
            
            {/* Text wrapper - Top left and Top right */}
            <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex justify-between items-start gap-4 opacity-100 translate-y-0 transition-all duration-500 ease-out md:opacity-0 md:-translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0">
              <h3 className="font-body text-xs md:text-sm font-medium tracking-[0.1em] uppercase text-white drop-shadow-md">
                {project.title}
              </h3>
              <p className="font-body text-[10px] md:text-xs tracking-[0.15em] uppercase text-white/90 drop-shadow-md">
                {project.category}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

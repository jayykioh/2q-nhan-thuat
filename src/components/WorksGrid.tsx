"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function WorksGrid() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal items on scroll — use fromTo so opacity:1 is explicit (not relying on CSS natural state)
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

      // Magnetic hover & Image reveal
      const cards = gsap.utils.toArray(".project-card") as HTMLElement[];
      cards.forEach((card) => {
        const overlay = card.querySelector(".card-overlay");
        const img = card.querySelector("img");

        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = (e.clientX - cx) * 0.12;
          const dy = (e.clientY - cy) * 0.12;
          gsap.to(card, { x: dx, y: dy, duration: 0.4, ease: "power2.out" });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
        });

        card.addEventListener("mouseenter", () => {
          gsap.to(overlay, { opacity: 1, duration: 0.4, ease: "power2.out" });
          gsap.to(img, { scale: 1.04, duration: 0.8, ease: "power2.out" });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(overlay, { opacity: 0, duration: 0.4 });
          gsap.to(img, { scale: 1, duration: 0.6, ease: "power2.out" });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

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

  return (
    <section ref={containerRef} className="works reveal-section px-[var(--gutter)] py-[var(--section-py)]" id="works">
      <p className="reveal-item font-body text-[var(--label-size)] tracking-[0.15em] uppercase text-[var(--text-muted)] mb-8">
        Selected Works & Moments
      </p>
      
      <div className="works-grid grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
        {projects.map((project, idx) => (
          <article
            key={idx}
            className={`project-card reveal-item group ${
              project.large ? "md:col-span-2" : "col-span-1"
            }`}
          >
            <div className="card-img-wrap relative overflow-hidden rounded-[2px] aspect-[4/5] md:aspect-[2/3] w-full h-full cursor-pointer">
              <Image
                src={project.src}
                alt={project.title}
                fill
                sizes={project.large ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                className="object-cover"
              />
              <div className="card-overlay absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.85)] via-[rgba(10,10,10,0.4)] to-transparent opacity-0 flex flex-col justify-end p-6 md:p-8">
                <p className="card-category font-body text-[var(--label-size)] tracking-[0.15em] uppercase text-[var(--accent)] mb-2">
                  {project.category}
                </p>
                <h3 className="card-title font-display text-2xl md:text-3xl font-light tracking-[0.1em] text-[var(--text-primary)]">
                  {project.title}
                </h3>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

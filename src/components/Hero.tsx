"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-eyebrow", { y: 30, opacity: 0, duration: 0.9, delay: 0.2 })
        .from(
          ".hero-title .word",
          {
            y: "100%",
            opacity: 0,
            duration: 1.1,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=0.5"
        )
        .from(".hero-subtitle", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(
          ".hero-image",
          { scale: 1.06, opacity: 0, duration: 1.4, ease: "power2.out" },
          "-=1.0"
        );

      // Parallax effect on image
      gsap.to(".hero-image", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen grid grid-cols-1 md:grid-cols-2 items-end px-[var(--gutter)] pt-[calc(var(--section-py)+4rem)] pb-[var(--section-py)] gap-12"
    >
      <div className="hero-text pb-10">
        <p className="hero-eyebrow font-body text-[var(--label-size)] tracking-[0.15em] uppercase text-[var(--text-muted)] mb-6">
          Handcrafted Jewelry — Da Nang
        </p>
        <h1 className="hero-title font-display text-[var(--hero-size)] leading-[0.9] font-light text-[var(--text-primary)] overflow-hidden">
          <span className="line block overflow-hidden">
            <span className="word inline-block">Turn</span>{" "}
            <span className="word inline-block">Forgotten</span>
          </span>
          <span className="line block overflow-hidden">
            <span className="word inline-block">Spoons</span>{" "}
            <span className="word inline-block">Into</span>
          </span>
          <span className="line block overflow-hidden">
            <em className="italic text-[var(--accent)]">
              <span className="word inline-block">Wearable</span>{" "}
              <span className="word inline-block">Stories</span>
            </em>
          </span>
        </h1>
        <p className="hero-subtitle font-body text-[var(--body-size)] text-[var(--text-muted)] mt-8 max-w-md leading-relaxed">
          2Q Nhẫn Thuật is a handcrafted jewelry brand specializing in transforming vintage spoons into unique wearable art. Every piece is individually handcrafted, making each creation truly one-of-one.
        </p>
      </div>
      <div className="hero-image-wrap overflow-hidden rounded-[2px] aspect-[3/4] max-h-[80vh] relative">
        <Image
          src="/images/banner.jpg"
          alt="2Q Nhẫn Thuật Banner"
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 768px) 100vw, 50vw"
          className="hero-image object-cover"
        />
      </div>
    </section>
  );
}

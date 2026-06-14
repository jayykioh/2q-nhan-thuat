"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Location() {
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

  const gallery = [
    "/images/workshop.jpg",
    "/images/workshop2.jpg",
    "/images/workshop3.jpg",
    "/images/workshop4.jpg",
    "/images/workshop5.jpg",
  ];

  return (
    <section ref={containerRef} className="reveal-section px-[var(--gutter)] py-[var(--section-py)] bg-[var(--bg-elevated)]" id="location">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div className="reveal-item">
          <p className="font-body text-[var(--label-size)] tracking-[0.15em] uppercase text-[var(--text-muted)] mb-4">
            Main Workshop / Experience Space
          </p>
          <h2 className="font-display text-[var(--h2-size)] leading-[1.1] font-light text-[var(--text-primary)]">
            Musky <em className="text-[var(--accent)] italic">Bar</em>
          </h2>
        </div>
        <div className="reveal-item font-body text-[var(--body-size)] text-[var(--text-muted)] md:text-right max-w-sm">
          <p>27 Nguyễn Cao Luyện, An Hải, Đà Nẵng 550000</p>
          <p className="mt-2 text-sm italic">View available designs, try on rings, discuss custom orders, meet the maker, and experience the crafting process.</p>
        </div>
      </div>

      <div className="reveal-item w-full aspect-video md:aspect-[21/9] mb-4 relative overflow-hidden rounded-[2px]">
        <video 
          src="/video/viewoftheshop.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
        {gallery.map((src, i) => (
          <div key={i} className="reveal-item relative aspect-square overflow-hidden rounded-[2px] cursor-pointer group">
            <Image
              src={src}
              alt={`Workshop View ${i + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 20vw"
              className="object-cover transition-transform duration-[0.8s] ease-[var(--ease-cinematic)] group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      <div className="mt-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-t border-[var(--border)] pt-16">
        <div className="reveal-item">
          <p className="font-body text-[var(--label-size)] tracking-[0.15em] uppercase text-[var(--text-muted)] mb-4">
            Collaboration Location
          </p>
          <h2 className="font-display text-4xl leading-[1.1] font-light text-[var(--text-primary)]">
            <em className="text-[var(--accent)] italic">INNOIR</em>
          </h2>
        </div>
        <div className="reveal-item font-body text-[var(--body-size)] text-[var(--text-muted)] md:text-right max-w-sm">
          <p>D13 An Thượng 34, Đà Nẵng</p>
          <p className="mt-2 text-sm italic">Combining handmade jewelry, streetwear culture, and creative expression.</p>
        </div>
      </div>
    </section>
  );
}

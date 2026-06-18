"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

gsap.registerPlugin(ScrollTrigger);

const gallery = [
  "/images/workshop.jpg",
  "/images/workshop2.jpg",
  "/images/workshop3.jpg",
  "/images/workshop4.jpg",
  "/images/workshop5.jpg",
];

// Splits text into <span> per word, returns array of refs
function WordSplit({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className={`inline-block overflow-hidden ${className ?? ""}`}
        >
          <span className="word-inner inline-block translate-y-full opacity-0">
            {word}
            {i < text.split(" ").length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </>
  );
}

export default function Location() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(-1);

  // Magnetic cursor state per gallery image
  const magnetRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── 1. Cinematic word reveal for heading ──────────────────────────────
      gsap.to(".word-inner", {
        y: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.06,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      // ── 2. Label + address slide-in ───────────────────────────────────────
      gsap.fromTo(
        ".reveal-meta",
        { opacity: 0, x: 28 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 78%",
          },
        }
      );

      // ── 3. Scroll-scrubbed video parallax (scale + slight Y) ─────────────
      if (videoRef.current) {
        gsap.fromTo(
          videoRef.current,
          { scale: 1.08 },
          {
            scale: 1.0,
            ease: "none",
            scrollTrigger: {
              trigger: videoRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.4,
            },
          }
        );
      }

      // ── 4. Video wrapper curtain reveal (wipe from top) ──────────────────────
      gsap.fromTo(
        ".video-curtain",
        { scaleY: 1 },
        {
          scaleY: 0,
          duration: 1.3,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: ".video-wrapper",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── 5. Gallery items — staggered cascade reveal ───────────────────────
      gsap.fromTo(
        ".gallery-item",
        { opacity: 0, scale: 0.9, filter: "blur(8px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.85,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── 6. Collaboration section — slow drift-up ──────────────────────────
      gsap.fromTo(
        ".collab-block",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".collab-block",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── 7. Decorative line expand ─────────────────────────────────────────
      gsap.fromTo(
        ".collab-line",
        { scaleX: 0, transformOrigin: "center" },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".collab-block",
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ── Magnetic hover for each gallery item ─────────────────────────────────
  useEffect(() => {
    const cleanups: (() => void)[] = [];

    magnetRefs.current.forEach((el) => {
      if (!el) return;

      const handleMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        gsap.to(el, {
          x: dx * 10,
          y: dy * 8,
          rotateX: -dy * 4,
          rotateY: dx * 4,
          duration: 0.5,
          ease: "power2.out",
        });
        const img = el.querySelector(".gallery-img");
        if (img) {
          gsap.to(img, { scale: 1.09, duration: 0.6, ease: "power2.out" });
        }
      };

      const handleLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.6)",
        });
        const img = el.querySelector(".gallery-img");
        if (img) {
          gsap.to(img, { scale: 1, duration: 0.6, ease: "power2.out" });
        }
      };

      el.addEventListener("mousemove", handleMove);
      el.addEventListener("mouseleave", handleLeave);
      cleanups.push(() => {
        el.removeEventListener("mousemove", handleMove);
        el.removeEventListener("mouseleave", handleLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative px-[var(--gutter)] py-[var(--section-py)] bg-[var(--bg-elevated)] overflow-hidden"
      id="location"
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">

        {/* Heading with word-split reveal */}
        <div>
          <p className="reveal-meta font-body text-[var(--label-size)] tracking-[0.15em] uppercase text-[var(--text-muted)] mb-4 opacity-0">
            Main Workshop / Experience Space
          </p>
          <h2 className="font-display text-[var(--h2-size)] leading-[1.1] font-light tracking-tight text-[var(--text-primary)]">
            <WordSplit text="Musky" />
            {" "}
            <em className="text-[var(--accent)] italic">
              <span className="inline-block overflow-hidden">
                <span className="word-inner inline-block translate-y-full opacity-0">Bar</span>
              </span>
            </em>
          </h2>
        </div>

        {/* Address */}
        <div className="reveal-meta font-body text-[var(--body-size)] text-[var(--text-muted)] md:text-right max-w-sm opacity-0">
          <p>27 Nguyễn Cao Luyện, An Hải, Đà Nẵng 550000</p>
          <p className="mt-2 text-sm italic">
            View available designs, try on rings, discuss custom orders, meet
            the maker, and experience the crafting process.
          </p>
        </div>
      </div>

      {/* ── Video ──────────────────────────────────────────────────────────── */}
      <div className="video-wrapper w-full aspect-video md:aspect-[21/9] mb-4 relative overflow-hidden rounded-[2px]" style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}>
        {/* Parallax container — slightly larger so scale doesn't reveal edges */}
        <div ref={videoRef} className="absolute inset-0 will-change-transform" style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}>
          <video
            src="/video/viewoftheshop.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
          />
        </div>

        {/* Subtle vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.35) 100%)",
          }}
        />

        {/* Curtain for reveal animation to prevent video clip-path flickering */}
        <div className="video-curtain absolute inset-0 bg-[var(--bg-elevated)] z-[2] origin-bottom" />
      </div>

      {/* ── Gallery ────────────────────────────────────────────────────────── */}
      <div
        ref={galleryRef}
        className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4"
        style={{ perspective: "800px" }}
      >
        {gallery.map((src, i) => {
          const isFourthItem = i === 3;
          const isFifthItem = i === 4;

          return (
            <div
              key={i}
              ref={(el) => { magnetRefs.current[i] = el; }}
              className={`gallery-item relative aspect-square overflow-hidden rounded-[2px] cursor-pointer will-change-transform ${isFifthItem ? "hidden md:block" : ""}`}
              onClick={() => setIndex(i)}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src={src}
                alt={`Workshop View ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="gallery-img object-cover transition-none"
              />

              {/* +1 Overlay on 4th item for mobile only */}
              {isFourthItem && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/65 md:hidden pointer-events-none z-10">
                  <span className="font-display text-2xl text-[var(--text-primary)] leading-none">+{gallery.length - 4}</span>
                  <span className="font-body text-[9px] tracking-[0.18em] uppercase text-[var(--accent)] mt-1.5">More</span>
                </div>
              )}

            {/* Number badge — fades in on hover via CSS */}
            <span
              className="
                absolute bottom-2 right-2 font-body text-[10px] tracking-[0.2em]
                text-white/60 opacity-0 transition-opacity duration-300
                group-hover:opacity-100 pointer-events-none select-none
              "
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              0{i + 1}
            </span>

            {/* Accent overlay */}
            <div
              className="
                absolute inset-0 transition-opacity duration-500
                pointer-events-none
              "
              style={{
                background: `linear-gradient(135deg, var(--accent) 0%, transparent 60%)`,
                opacity: 0,
                mixBlendMode: "multiply",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.opacity = "0.15")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.opacity = "0")
              }
            />
          </div>
          );
        })}
      </div>

      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={gallery.map((src) => ({ src }))}
      />

      {/* ── Collaboration Location ─────────────────────────────────────────── */}
      <div className="collab-block mt-16 md:mt-20 opacity-0">
        {/* Expanding decorative line */}
        <div
          className="collab-line mx-auto mb-8"
          style={{
            height: "1px",
            width: "100%",
            maxWidth: "320px",
            background:
              "linear-gradient(to right, transparent, rgba(240,237,232,0.15), rgba(240,237,232,0.15), transparent)",
          }}
        />

        <div className="flex flex-col items-center text-center px-4">
          <span className="font-body text-[9px] tracking-[0.25em] uppercase text-[var(--accent)] block mb-5">
            Collaboration Location
          </span>

          {/* INNOIR Logo Image */}
          <div className="relative w-[130px] h-[32px] mb-4 select-none">
            <Image
              src="/images/innoir.png"
              alt="Innoir Logo"
              fill
              className="object-contain"
              sizes="130px"
            />
          </div>

          <p className="font-body text-[14px] text-[var(--text-primary)] opacity-80 mb-2">
            D13 An Thượng 34, Đà Nẵng
          </p>

          <p
            className="font-body text-[12px] leading-relaxed text-[var(--text-muted)] max-w-[280px] mb-5"
          >
            Combining handmade jewelry, streetwear culture, and creative expression.
          </p>

          {/* Navigate button to Innoir website */}
          <a
            href="https://innoir.site"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 border border-[rgba(240,237,232,0.08)] hover:border-[var(--accent)] bg-[var(--bg-elevated)] text-[10px] font-body uppercase tracking-[0.15em] text-[var(--text-primary)] hover:text-[var(--accent)] transition-all duration-300 rounded-[2px]"
          >
            Visit Website
            <span className="text-[10px] transform group-hover:translate-x-0.5 transition-transform duration-300">
              &rarr;
            </span>
          </a>

          {/* Bottom micro-rule */}
          <div
            className="collab-line mt-8"
            style={{
              height: "1px",
              width: "40px",
              background: "var(--accent)",
              opacity: 0.3,
            }}
          />
        </div>
      </div>
    </section>
  );
}
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// ── Char-level split helper ───────────────────────────────────────────────────
// Each char-unit uses padding + negative margin instead of overflow-hidden
// so italic overhang and descenders (g, y, j, p) are never clipped.
// The outer span clips via a tall padded box; the inner translates within it.
function CharSplit({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="char-unit inline-block"
          aria-hidden="true"
          style={{
            // Vertical overflow room: 0.25em top for ascenders/caps,
            // 0.35em bottom for descenders, clip only what escapes that room
            paddingTop: "0.25em",
            paddingBottom: "0.35em",
            marginTop: "-0.25em",
            marginBottom: "-0.35em",
            // Horizontal room for italic slant bleed on both sides
            paddingLeft: "0.04em",
            paddingRight: "0.06em",
            marginLeft: "-0.04em",
            marginRight: "-0.06em",
            overflow: "hidden",
            verticalAlign: "bottom",
          }}
        >
          <span
            className="char-inner inline-block"
            style={{ transform: "translateY(110%)", opacity: 0 }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </span>
  );
}

// Marquee words — jeweler's process vocabulary
const MARQUEE_WORDS = [
  "Repurpose",
  "·",
  "Shape",
  "·",
  "Engrave",
  "·",
  "Polish",
  "·",
  "File",
  "·",
  "Bend",
  "·",
  "Anneal",
  "·",
  "Finish",
  "·",
];

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── 1. Image wrapper — clipPath wipe from bottom ──────────────────────
      gsap.fromTo(
        imageWrapperRef.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 72%",
          },
        }
      );

      // ── 2. Image inner — counter-scale so content doesn't zoom in during wipe
      gsap.fromTo(
        imageInnerRef.current,
        { scale: 1.12 },
        {
          scale: 1,
          duration: 1.4,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 72%",
          },
        }
      );

      // ── 3. Scroll-scrubbed parallax on image ─────────────────────────────
      gsap.to(imageInnerRef.current, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: imageWrapperRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.8,
        },
      });

      // ── 4. Char-level headline reveal ─────────────────────────────────────
      gsap.to(".char-inner", {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.022,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".about-headline",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // ── 5. Label line expand + fade ───────────────────────────────────────
      gsap.fromTo(
        ".label-line",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".about-label",
        { opacity: 0, x: 12 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      // ── 6. Body paragraphs — staggered slide up ───────────────────────────
      gsap.fromTo(
        ".about-para",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-body",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── 7. Stat callouts — float up with delay ────────────────────────────
      gsap.fromTo(
        ".stat-callout",
        { opacity: 0, y: 16, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.0,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageWrapperRef.current,
            start: "top 60%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── 8. Marquee — scroll-scrubbed x translate ──────────────────────────
      if (marqueeRef.current) {
        const totalWidth = marqueeRef.current.scrollWidth / 2;
        gsap.to(marqueeRef.current, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: imageWrapperRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="px-[var(--gutter)] py-20 md:py-32 lg:py-40 bg-[var(--bg)] border-b border-[var(--border)] overflow-hidden"
      id="about"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-16 xl:gap-24 items-center">

          {/* ── Text side ─────────────────────────────────────────────────── */}
          <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col justify-center">

            {/* Label row */}
            <div className="flex items-center gap-5 mb-10 md:mb-14">
              <span className="label-line w-16 md:w-20 h-[1px] bg-[var(--text-muted)] opacity-40 block" />
              <span className="about-label font-body text-[10px] tracking-[0.3em] uppercase text-[var(--text-muted)] opacity-0">
                The Founder
              </span>
            </div>

            {/* Headline — char split */}
            <h2
              className="about-headline font-display text-4xl md:text-5xl lg:text-6xl xl:text-[5rem] font-light tracking-tight leading-[1.1] text-[var(--text-primary)] mb-10 md:mb-14"
            >
              <CharSplit text="Crafted with" />
              <br />
              <CharSplit
                text="Intention."
                className="text-[var(--accent)] italic mt-2 inline-block pr-3"
              />
            </h2>

            {/* Body — no vertical rule, replaced with clean left-offset spacing */}
            <div className="about-body flex flex-col gap-6 md:gap-8 max-w-xl">

              {/* Lead — slightly larger, distinct */}
              <p className="about-para font-body text-lg md:text-xl text-[var(--text-primary)] leading-snug font-medium opacity-0">
                Each piece is personally crafted by Quyen — authenticity,
                quality, and individuality are non-negotiable.
              </p>

              <p className="about-para font-body text-base md:text-[17px] text-[var(--text-muted)] leading-relaxed opacity-0">
                At 2Q Nhẫn Thuật, every ring made from a spoon preserves the original 
                patterns of vintage silverware — transforming forgotten objects into 
                unique accessories people reach for every morning.
              </p>

              <p className="about-para font-body text-base md:text-[17px] text-[var(--text-muted)] leading-relaxed opacity-0">
                No two people are the same. No two rings should be either. The
                imperfections of hand-forming are embraced as part of the
                object's identity — not corrected away.
              </p>

              {/* Inline stats row — subtle, data-forward */}
              <div className="about-para flex items-center gap-8 pt-4 opacity-0">
                <div className="border-l border-[rgba(240,237,232,0.12)] pl-5">
                  <p className="font-display text-2xl font-light text-[var(--text-primary)] leading-none mb-1">
                    4+
                  </p>
                  <p className="font-body text-[11px] tracking-[0.15em] uppercase text-[var(--text-muted)] opacity-60">
                    Years making
                  </p>
                </div>
                <div className="border-l border-[rgba(240,237,232,0.12)] pl-5">
                  <p className="font-display text-2xl font-light text-[var(--text-primary)] leading-none mb-1">
                    01
                  </p>
                  <p className="font-body text-[11px] tracking-[0.15em] uppercase text-[var(--text-muted)] opacity-60">
                    Maker. No team.
                  </p>
                </div>
                <div className="border-l border-[rgba(240,237,232,0.12)] pl-5">
                  <p className="font-display text-2xl font-light text-[var(--accent)] leading-none mb-1">
                    ∞
                  </p>
                  <p className="font-body text-[11px] tracking-[0.15em] uppercase text-[var(--text-muted)] opacity-60">
                    Each piece unique
                  </p>
                </div>
              </div>

              {/* Call to action */}
              <div className="about-para mt-4 opacity-0">
                <a
                  href="/appointment"
                  className="group inline-flex h-12 w-fit items-center justify-center gap-3 border border-[rgba(240,237,232,0.15)] px-8 font-body text-[10px] uppercase tracking-[0.2em] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--bg)] hover:bg-[var(--accent)] transition-all duration-500"
                >
                  Book Appointment
                  <span className="transform transition-transform duration-500 group-hover:translate-x-2">&rarr;</span>
                </a>
              </div>
            </div>
          </div>

          {/* ── Image side ────────────────────────────────────────────────── */}
          <div className="order-2 lg:order-1 lg:col-span-5 relative w-full">

            {/* Floating stat — top right of image */}
            <div
              className="stat-callout opacity-0 absolute -top-4 -right-4 md:-right-8 z-20
                bg-[var(--bg-elevated)] border border-[rgba(240,237,232,0.08)]
                px-4 py-3 backdrop-blur-sm"
            >
              <p className="font-body text-[9px] tracking-[0.2em] uppercase text-[var(--accent)] mb-0.5 opacity-70">
                Material
              </p>
              <p className="font-display text-sm font-light text-[var(--text-primary)]">
                Vintage stainless
              </p>
            </div>

            {/* Floating stat — bottom left of image */}
            <div
              className="stat-callout opacity-0 absolute -bottom-4 -left-4 md:-left-8 z-20
                bg-[var(--bg-elevated)] border border-[rgba(240,237,232,0.08)]
                px-4 py-3 backdrop-blur-sm"
            >
              <p className="font-body text-[9px] tracking-[0.2em] uppercase text-[var(--accent)] mb-0.5 opacity-70">
                Origin
              </p>
              <p className="font-display text-sm font-light text-[var(--text-primary)]">
                Đà Nẵng, Vietnam
              </p>
            </div>

            {/* Image wrapper — clip reveal */}
            <div
              ref={imageWrapperRef}
              className="relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden"
              style={{ clipPath: "inset(100% 0% 0% 0%)" }}
            >
              {/* Inner — scale + parallax target */}
              <div ref={imageInnerRef} className="absolute inset-0 will-change-transform">
                <Image
                  src="/images/settingup.jpg"
                  alt="Founder Quyen setting up the 2Q Nhẫn Thuật workshop to handcraft accessories from spoons"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center grayscale-[15%]"
                  priority
                />
              </div>

              {/* Scroll-driven process marquee — rides across the bottom of the image */}
              <div className="absolute bottom-0 left-0 right-0 py-3 overflow-hidden z-10"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
                }}>
                <div
                  ref={marqueeRef}
                  className="flex gap-6 whitespace-nowrap will-change-transform"
                  style={{ width: "max-content" }}
                >
                  {/* Doubled for seamless loop illusion */}
                  {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, i) => (
                    <span
                      key={i}
                      className={`font-body text-[10px] tracking-[0.22em] uppercase ${word === "·"
                          ? "text-[var(--accent)] opacity-50"
                          : "text-white opacity-35"
                        }`}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>

              {/* Corner accent — top left */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[var(--accent)] opacity-40 pointer-events-none z-10" />
              {/* Corner accent — bottom right */}
              <div className="absolute bottom-10 right-0 w-8 h-8 border-b border-r border-[var(--accent)] opacity-40 pointer-events-none z-10" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import DecryptedText from "./DecryptedText";

gsap.registerPlugin(ScrollTrigger);

// Framer variants for the editorial overlay text stack
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.6 },
  },
};

const lineVariants = {
  hidden: { y: "110%", opacity: 0, skewY: 3 },
  visible: {
    y: "0%",
    opacity: 1,
    skewY: 0,
    transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } },
};

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP handles the parallax and full-bleed image reveal only
    const ctx = gsap.context(() => {
      // Cinematic scale-in for the full-bleed image
      gsap.fromTo(
        ".hero-fullbleed-img",
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.8, ease: "power2.out", delay: 0.05 }
      );

      // Subtle parallax scroll
      gsap.to(".hero-fullbleed-img", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.4,
        },
      });

      // Horizontal rule reveal
      gsap.fromTo(
        ".hero-rule",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 1.2, ease: "power3.inOut", delay: 1.4 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="hero-section relative w-full min-h-screen overflow-hidden"
    >
      {/* ── Full-bleed image ── */}
      <div ref={imgRef} className="absolute inset-0 w-full h-full">
        <Image
          src="/images/banner.jpg"
          alt="2Q Nhẫn Thuật — Handcrafted Wearable Stories"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="hero-fullbleed-img object-cover object-center"
          style={{ willChange: "transform, opacity" }}
        />
        {/* Multi-layer gradient vignette — bottom-heavy for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                to top,
                rgba(10,10,10,0.97) 0%,
                rgba(10,10,10,0.72) 28%,
                rgba(10,10,10,0.32) 55%,
                rgba(10,10,10,0.08) 80%,
                transparent 100%
              ),
              linear-gradient(
                to right,
                rgba(10,10,10,0.55) 0%,
                transparent 55%
              )
            `,
          }}
        />
        {/* Subtle grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />
      </div>

      {/* ── Editorial eyebrow — top left ── */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex justify-between items-start px-[var(--gutter)] pt-32 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        <p
          className="font-body text-[var(--label-size)] tracking-[0.2em] uppercase text-[var(--text-muted)]"
          style={{ writingMode: "horizontal-tb" }}
        >
          Da Nang, Vietnam
        </p>
        <p className="font-body text-[var(--label-size)] tracking-[0.2em] uppercase text-[var(--text-muted)]">
          Est. 2024
        </p>
      </motion.div>

      {/* ── Vertical side label ── */}
      <motion.div
        className="absolute right-[var(--gutter)] top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 pointer-events-none hidden md:flex"
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 1.8 }}
      >
        <div className="w-px h-16 bg-[var(--border)]" />
        <p
          className="font-body text-[10px] tracking-[0.25em] uppercase text-[var(--text-muted)]"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          Handcrafted Jewelry
        </p>
        <div className="w-px h-16 bg-[var(--border)]" />
      </motion.div>

      {/* ── Main headline block — bottom left ── */}
      <div className="absolute bottom-0 left-0 right-0 px-[var(--gutter)] pb-[var(--section-py)]">
        
        {/* Divider rule */}
        <hr
          className="hero-rule border-none h-px bg-[rgba(240,237,232,0.15)] mb-10 w-full origin-left"
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 items-end">
          
          {/* LEFT: The headline */}
          <div className="md:col-span-8">
            {/* Eyebrow label */}
            <motion.p
              className="font-body text-[var(--label-size)] tracking-[0.18em] uppercase text-[var(--accent)] mb-6"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: [0.76, 0, 0.24, 1] }}
            >
              Wearable Stories
            </motion.p>

            {/* h1 — line mask reveal via Framer Motion */}
            <h1
              className="font-display font-light text-[var(--text-primary)] leading-[0.88] overflow-hidden"
              style={{ fontSize: "clamp(3.5rem, 10vw, 8.5rem)" }}
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Line 1 */}
                <div className="overflow-hidden">
                  <motion.div variants={lineVariants} className="inline-block">
                    Turn Forgotten
                  </motion.div>
                </div>
                {/* Line 2 */}
                <div className="overflow-hidden">
                  <motion.div variants={lineVariants} className="inline-block">
                    Spoons Into
                  </motion.div>
                </div>
                {/* Line 3 — accent italic with DecryptedText cipher */}
                <div className="overflow-hidden">
                  <motion.div variants={lineVariants} className="inline-block italic text-[var(--accent)] relative">
                    <DecryptedText
                      text="Wearable Stories"
                      animateOn="view"
                      sequential={true}
                      revealDirection="start"
                      speed={45}
                      delay={1200}
                      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
                      className="italic text-[var(--accent)]"
                      encryptedClassName="font-mono not-italic font-medium text-[rgba(200,184,162,0.4)] tracking-[0.1em] text-[0.85em] uppercase"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </h1>
          </div>

          {/* RIGHT: descriptor + CTA */}
          <motion.div
            className="md:col-span-4 md:pl-8 flex flex-col justify-end gap-6"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            <p className="font-body text-[var(--body-size)] text-[var(--text-muted)] leading-relaxed max-w-xs">
              Every piece is individually handcrafted, making each creation truly one-of-one.
            </p>
            <a
              href="https://www.facebook.com/profile.php?id=61577127505025"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-body text-[var(--label-size)] tracking-[0.15em] uppercase text-[var(--accent)] group w-fit"
            >
              <span className="w-8 h-px bg-[var(--accent)] transition-all duration-500 group-hover:w-14" />
              Order Custom
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="flex items-center gap-4 mt-12 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          <motion.div
            className="w-px h-10 bg-[var(--text-muted)] origin-top"
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          <p className="font-body text-[9px] tracking-[0.3em] uppercase text-[var(--text-muted)]">
            Scroll
          </p>
        </motion.div>
      </div>
    </section>
  );
}

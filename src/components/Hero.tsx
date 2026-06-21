"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import DecryptedText from "./DecryptedText";

gsap.registerPlugin(ScrollTrigger);

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.35 },
  },
};

const lineVariants = {
  hidden: { y: "120%", opacity: 0, skewY: 5 },
  visible: {
    y: "0%",
    opacity: 1,
    skewY: 0,
    transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1] as const },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] as const },
  },
};

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const heroImage = containerRef.current?.querySelector(".hero-fullbleed-img");

    if (shouldReduceMotion) {
      if (heroImage) {
        gsap.set(heroImage, { opacity: 1, scale: 1, yPercent: 0 });
      }
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-fullbleed-img",
        { scale: 1.15, opacity: 0, filter: "blur(4px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 2.4, ease: "power3.out", delay: 0.1 }
      );

      gsap.to(".hero-fullbleed-img", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.fromTo(
        ".hero-rule",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 1.2, ease: "power3.inOut", delay: 1.1 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      ref={containerRef}
      className="hero-section relative min-h-[100svh] w-full overflow-hidden md:min-h-screen"
    >
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="/images/banner.jpg"
          alt="Handcrafted rings made from spoons by 2Q Nhẫn Thuật"
          fill
          priority
          fetchPriority="high"
          quality={80}
          sizes="100vw"
          className="hero-fullbleed-img object-cover object-center"
          style={{ willChange: "transform, opacity" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                to top,
                rgba(10,10,10,0.98) 0%,
                rgba(10,10,10,0.82) 32%,
                rgba(10,10,10,0.38) 62%,
                rgba(10,10,10,0.1) 84%,
                transparent 100%
              ),
              linear-gradient(
                to right,
                rgba(10,10,10,0.58) 0%,
                rgba(10,10,10,0.18) 48%,
                transparent 75%
              )
            `,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />
      </div>

      <motion.div
        className="pointer-events-none absolute left-0 right-0 top-0 flex items-start justify-between px-[var(--gutter)] pt-28 sm:pt-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: shouldReduceMotion ? 0 : 1.1 }}
      >
        <p className="max-w-[12rem] font-body text-[var(--label-size)] uppercase tracking-[0.18em] text-[var(--text-muted)]">
          Da Nang, Vietnam
        </p>
        <p className="font-body text-[var(--label-size)] uppercase tracking-[0.18em] text-[var(--text-muted)]">
          Est. 2026
        </p>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute right-[var(--gutter)] top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex"
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.9, delay: shouldReduceMotion ? 0 : 1.2 }}
      >
        <div className="h-16 w-px bg-[var(--border)]" />
        <p
          className="font-body text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)]"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          Handcrafted Jewelry
        </p>
        <div className="h-16 w-px bg-[var(--border)]" />
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 px-[var(--gutter)] pb-[max(2rem,env(safe-area-inset-bottom))] sm:pb-[clamp(3rem,7vw,7rem)]">
        <hr className="hero-rule mb-6 h-px w-full origin-left border-none bg-[rgba(240,237,232,0.15)] sm:mb-10" />

        <div className="grid grid-cols-1 items-end gap-7 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <motion.p
              className="mb-4 font-body text-[var(--label-size)] uppercase tracking-[0.18em] text-[var(--accent)] sm:mb-6"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.7, delay: shouldReduceMotion ? 0 : 0.75, ease: [0.76, 0, 0.24, 1] }}
            >
              Wearable Stories
            </motion.p>

            <h1 className="max-w-[11ch] overflow-hidden font-display font-light tracking-tight leading-[1.1] text-[var(--text-primary)] sm:leading-[1.1] md:max-w-none md:text-[var(--hero-size)]" style={{ fontSize: "var(--hero-size)" }}>
              <span className="sr-only">2Q Nhẫn Thuật - Handcrafted Rings Made From Spoons & Accessories. Turn Forgotten Spoons Into Wearable Stories</span>
              <motion.div aria-hidden="true" variants={containerVariants} initial="hidden" animate="visible">
                <div className="overflow-hidden">
                  <motion.div variants={lineVariants} className="inline-block">
                    {shouldReduceMotion ? (
                      "Turn Forgotten"
                    ) : (
                      <DecryptedText
                        text="Turn Forgotten"
                        animateOn="view"
                        sequential
                        revealDirection="start"
                        speed={50}
                        delay={400}
                        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
                        encryptedClassName="font-mono font-medium uppercase tracking-[0.08em] text-[rgba(200,184,162,0.45)]"
                      />
                    )}
                  </motion.div>
                </div>
                <div className="overflow-hidden">
                  <motion.div variants={lineVariants} className="inline-block">
                    {shouldReduceMotion ? (
                      "Spoons Into"
                    ) : (
                      <DecryptedText
                        text="Spoons Into"
                        animateOn="view"
                        sequential
                        revealDirection="start"
                        speed={50}
                        delay={700}
                        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
                        encryptedClassName="font-mono font-medium uppercase tracking-[0.08em] text-[rgba(200,184,162,0.45)]"
                      />
                    )}
                  </motion.div>
                </div>
                <div className="overflow-hidden">
                  <motion.div variants={lineVariants} className="inline-block break-words italic text-[var(--accent)]">
                    {shouldReduceMotion ? (
                      "Wearable Stories"
                    ) : (
                      <DecryptedText
                        text="Wearable Stories"
                        animateOn="view"
                        sequential
                        revealDirection="start"
                        speed={45}
                        delay={900}
                        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
                        className="italic text-[var(--accent)]"
                        encryptedClassName="font-mono not-italic font-medium uppercase tracking-[0.08em] text-[rgba(200,184,162,0.45)]"
                      />
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </h1>
          </div>

          <motion.div
            className="flex flex-col justify-end gap-5 md:col-span-4 md:pl-8"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <p className="max-w-sm font-body text-[var(--body-size)] leading-relaxed text-[var(--text-muted)] md:max-w-xs">
              Every piece is individually handcrafted, making each creation truly one-of-one.
            </p>
            <div className="flex flex-col gap-4 mt-2">
              <a
                href="/appointment"
                className="group inline-flex min-h-8 w-fit items-center gap-3 font-body text-[var(--label-size)] uppercase tracking-[0.15em] text-[var(--accent)]"
              >
                <span className="h-px w-8 bg-[var(--accent)] transition-all duration-500 group-hover:w-14" />
                Book Appointment
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="pointer-events-none mt-8 hidden items-center gap-4 sm:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: shouldReduceMotion ? 0 : 1.6, duration: shouldReduceMotion ? 0 : 1 }}
        >
          <motion.div
            className="h-10 w-px origin-top bg-[var(--text-muted)]"
            animate={shouldReduceMotion ? undefined : { scaleY: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          <p className="font-body text-[9px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
            Scroll
          </p>
        </motion.div>
      </div>
    </section>
  );
}

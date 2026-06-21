"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Craft SVG icons — drawn as jeweler's objects, not generic UI icons ────────

const IconSpoonRing = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Ring band */}
    <ellipse cx="32" cy="38" rx="16" ry="6" stroke="currentColor" strokeWidth="1.2" />
    <ellipse cx="32" cy="30" rx="16" ry="6" stroke="currentColor" strokeWidth="1.2" />
    <line x1="16" y1="30" x2="16" y2="38" stroke="currentColor" strokeWidth="1.2" />
    <line x1="48" y1="30" x2="48" y2="38" stroke="currentColor" strokeWidth="1.2" />
    {/* Spoon bowl suggestion at top */}
    <ellipse cx="32" cy="22" rx="8" ry="5" stroke="currentColor" strokeWidth="1" strokeDasharray="2 1.5" opacity="0.5" />
    {/* Engraved line detail */}
    <path d="M20 34 Q32 31 44 34" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
  </svg>
);

const IconBracelet = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Oval bracelet form */}
    <ellipse cx="32" cy="34" rx="22" ry="10" stroke="currentColor" strokeWidth="1.2" />
    <ellipse cx="32" cy="28" rx="22" ry="10" stroke="currentColor" strokeWidth="1.2" />
    <line x1="10" y1="28" x2="10" y2="34" stroke="currentColor" strokeWidth="1.2" />
    <line x1="54" y1="28" x2="54" y2="34" stroke="currentColor" strokeWidth="1.2" />
    {/* Hammered texture dots */}
    <circle cx="24" cy="31" r="0.9" fill="currentColor" opacity="0.5" />
    <circle cx="32" cy="29.5" r="0.9" fill="currentColor" opacity="0.5" />
    <circle cx="40" cy="31" r="0.9" fill="currentColor" opacity="0.5" />
    <circle cx="28" cy="32.5" r="0.7" fill="currentColor" opacity="0.3" />
    <circle cx="36" cy="32.5" r="0.7" fill="currentColor" opacity="0.3" />
    {/* Opening gap */}
    <path d="M48 28 Q54 28 54 31 Q54 34 48 34" stroke="var(--bg-elevated)" strokeWidth="3" />
    <path d="M48 29 Q52 29 52 31 Q52 33 48 33" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
  </svg>
);

const IconCustom = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Jeweler's mandrel (cone tool) */}
    <path d="M20 48 L32 16 L44 48 Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    {/* Size lines on mandrel */}
    <line x1="24" y1="40" x2="40" y2="40" stroke="currentColor" strokeWidth="0.7" opacity="0.4" />
    <line x1="26" y1="34" x2="38" y2="34" stroke="currentColor" strokeWidth="0.7" opacity="0.4" />
    <line x1="28" y1="28" x2="36" y2="28" stroke="currentColor" strokeWidth="0.7" opacity="0.4" />
    {/* Ring sitting on mandrel */}
    <ellipse cx="32" cy="22" rx="5" ry="2.2" stroke="currentColor" strokeWidth="1" />
    {/* Engraving tool suggestion */}
    <path d="M46 16 L50 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <circle cx="50.5" cy="11.5" r="1.5" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
  </svg>
);

const IconMaterial = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Steel grain — parallel lines with slight irregularity suggesting brushed metal */}
    <rect x="12" y="18" width="40" height="28" rx="1" stroke="currentColor" strokeWidth="1.2" />
    {/* Brushed grain lines */}
    {[22, 26, 30, 34, 38].map((y) => (
      <line key={y} x1="14" y1={y} x2="50" y2={y + (y % 6 === 0 ? 0.5 : -0.3)} stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
    ))}
    {/* Water droplet — rust resistant */}
    <path d="M32 10 Q34 6 36 10 Q38 14 32 16 Q26 14 28 10 Q30 6 32 10Z" stroke="currentColor" strokeWidth="0.9" opacity="0.6" />
    {/* Shine streak on steel */}
    <path d="M18 22 Q22 20 26 22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
  </svg>
);

const services = [
  {
    icon: IconSpoonRing,
    name: "Handmade Rings From Spoons",
    tag: "Signature",
    desc: "At 2qnhanthuat, each custom ring from spoon is born from a vintage piece — its existing pattern, curvature, and patina carried forward into something worn daily. No two spoon rings are identical.",
    detail: "Vintage spoon stock · Hand-formed · One of a kind",
  },
  {
    icon: IconBracelet,
    name: "Accessories From Spoons",
    tag: "Everyday",
    desc: "Stainless steel spoons hand-shaped into open bangles and accessories. The slight irregularities from forming by hand are left visible — proof of process, not flaw.",
    detail: "Stainless steel · Hammered finish · Adjustable",
  },
  {
    icon: IconCustom,
    name: "Custom Jewelry",
    tag: "Bespoke",
    desc: "Sized to your finger, shaped to your preference, engraved with a name, date, or motif. Bring a reference or arrive with an idea — either works.",
    detail: "Custom sizing · Pattern selection · Engraving",
  },
  {
    icon: IconMaterial,
    name: "Stainless Steel",
    tag: "Material",
    desc: "Chosen for its resistance to rust, salt, and daily friction. The same alloy used in surgical instruments — it wears well and stays honest.",
    detail: "Hypoallergenic · Water-resistant · Lifelong",
  },
];

const ambientParticles = Array.from({ length: 15 }).map((_, i) => ({
  id: i,
  left: `${(i * 13.7 + 5) % 100}%`,
  top: `${(i * 19.3 + 11) % 100}%`,
  duration: 4 + (i % 5),
  delay: (i % 4) * 0.7,
  xOffset: i % 2 === 0 ? 15 : -15,
  size: i % 3 === 0 ? 3 : i % 2 === 0 ? 2 : 1.5,
}));

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // ── Header reveal ──────────────────────────────────────────────────────
      gsap.fromTo(
        ".svc-header",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── Each row — slides in from left with rule extending ─────────────────
      gsap.utils.toArray<HTMLElement>(".svc-row").forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, x: -32 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // ── Icon slow spin on scroll (ambient, barely perceptible) ─────────────
      gsap.utils.toArray<HTMLElement>(".svc-icon-wrap").forEach((el, i) => {
        // Continuous float for icons (enhances mobile feel)
        gsap.to(el, {
          y: -6,
          duration: 2 + (i % 3) * 0.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });

        gsap.to(el, {
          rotate: 12,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest(".svc-row"),
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative px-[var(--gutter)] py-[var(--section-py)] bg-[var(--bg)] overflow-hidden"
      id="services"
    >
      {/* ── Background Ambient Particles ────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {ambientParticles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[var(--accent)]"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              opacity: 0.15,
            }}
            animate={prefersReducedMotion ? {} : {
              y: [0, -40, 0],
              x: [0, p.xOffset, 0],
              opacity: [0.1, 0.35, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="svc-header opacity-0 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 md:mb-28">
        <div>
          <p className="font-body text-[var(--label-size)] tracking-[0.18em] uppercase text-[var(--text-muted)] mb-4">
            What We Create
          </p>
          <h2 className="font-display text-[var(--h2-size)] leading-[1.1] font-light tracking-tight text-[var(--text-primary)]">
            Handcrafted with{" "}
            <em className="text-[var(--accent)] italic">intention</em>.
          </h2>
        </div>
        {/* Right-side pull quote — adds texture without being filler */}
        <p className="font-body text-sm text-[var(--text-muted)] italic max-w-[240px] md:text-right leading-relaxed opacity-60">
          "Every piece begins as something ordinary — a spoon in a drawer."
        </p>
      </div>

      {/* ── Service rows ────────────────────────────────────────────────────── */}
      <div className="flex flex-col divide-y divide-[rgba(240,237,232,0.07)]">
        {services.map((service, idx) => {
          const Icon = service.icon;
          return (
            <div
              key={idx}
              className="svc-row group opacity-0 relative flex flex-col md:flex-row md:items-center py-10 md:py-14 cursor-default"
            >
              {/* Left accent thread — grows on hover */}
              <div
                className="
                  absolute left-0 top-0 bottom-0 w-[2px] md:w-[1.5px] 
                  bg-[var(--accent)] origin-top 
                  max-md:scale-y-100 max-md:opacity-[0.15]
                  md:scale-y-0 md:opacity-50
                  transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                  group-hover:scale-y-100 group-hover:opacity-50
                "
              />

              {/* Mobile grouping: Icon + Title */}
              <div className="flex flex-row items-center w-full md:w-[400px] shrink-0 gap-6 md:gap-0 mb-6 md:mb-0">
                {/* ── Icon ──────────────────────────────────────────────────── */}
                <div className="md:w-[120px] shrink-0 flex items-center justify-start md:justify-center pl-5 md:pl-4">
                  <div
                    className="
                      svc-icon-wrap relative w-12 h-12 md:w-14 md:h-14 
                      text-[var(--accent)] md:text-[var(--text-muted)] 
                      transition-colors duration-500
                      group-hover:text-[var(--accent)]
                      will-change-transform
                    "
                  >
                    <Icon />
                    
                    {/* Floating Sparks (Mobile Enhanced) */}
                    <div className="absolute inset-0 pointer-events-none md:hidden">
                       <motion.div 
                          className="absolute top-[-4px] left-[-4px] w-[3px] h-[3px] bg-[var(--accent)] rounded-full"
                          animate={prefersReducedMotion ? {} : { y: [0, -12], opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.5] }}
                          transition={{ duration: 2.2 + (idx % 2), repeat: Infinity, ease: "easeOut", delay: idx * 0.3 }}
                       />
                       <motion.div 
                          className="absolute bottom-[2px] right-[-2px] w-[2px] h-[2px] bg-[var(--accent)] rounded-full"
                          animate={prefersReducedMotion ? {} : { y: [0, -10], x: [0, 6], opacity: [0, 0.6, 0] }}
                          transition={{ duration: 2.5 + (idx % 3), repeat: Infinity, ease: "easeOut", delay: idx * 0.4 + 1 }}
                       />
                    </div>

                    {/* Faint circle ring that appears on hover */}
                    <div
                      className="
                        absolute inset-[-6px] rounded-full 
                        border border-[var(--accent)] 
                        max-md:opacity-20 max-md:scale-100
                        md:opacity-0 md:scale-75
                        transition-all duration-500 ease-out
                        group-hover:opacity-20 group-hover:scale-100
                      "
                    />
                  </div>
                </div>

                {/* ── Tag + Name ─────────────────────────────────────────────── */}
                <div className="flex-1 md:w-[280px] md:pl-8">
                  <span className="font-body text-[9px] tracking-[0.25em] uppercase text-[var(--accent)] block mb-1 md:mb-2 opacity-80 md:opacity-60 transition-opacity duration-300 group-hover:opacity-100">
                    {service.tag}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl font-light tracking-tight text-[var(--text-primary)] transition-colors duration-300">
                    {service.name}
                  </h3>
                </div>
              </div>

              {/* ── Description ────────────────────────────────────────────── */}
              <div className="flex-1 px-5 md:px-10 mb-6 md:mb-0">
                <p className="font-body text-[14px] md:text-[var(--body-size)] leading-relaxed text-[var(--text-muted)] md:max-w-prose">
                  {service.desc}
                </p>
              </div>

              {/* ── Detail pills ────────────────────────────────────────────── */}
              <div className="md:w-[220px] shrink-0 flex flex-row flex-wrap md:flex-col items-center md:items-end gap-2 md:gap-1.5 px-5 md:px-0 md:pr-4">
                {service.detail.split(" · ").map((d, i) => (
                  <span
                    key={i}
                    className="
                      font-body text-[10px] tracking-[0.12em] uppercase
                      px-3 md:px-2.5 py-1.5 md:py-1
                      border border-[rgba(240,237,232,0.12)] md:border-[rgba(240,237,232,0.08)]
                      text-[var(--text-muted)] opacity-80 md:opacity-50
                      transition-all duration-500
                      group-hover:opacity-100 group-hover:border-[rgba(200,184,162,0.22)]
                      whitespace-nowrap
                    "
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    {d}
                  </span>
                ))}
              </div>

              {/* ── Bottom extending rule (replaces the old gradient bar) ──── */}
              <div
                className="
                  absolute bottom-0 left-0 h-[1px]
                  bg-gradient-to-r from-[var(--accent)] via-[var(--accent)] to-transparent
                  max-md:w-full max-md:opacity-10
                  md:w-0 md:opacity-25
                  transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                  group-hover:w-full group-hover:opacity-25
                "
              />
            </div>
          );
        })}
      </div>

      {/* ── Footer note — workshop invitation ───────────────────────────────── */}
      <motion.div
        className="mt-20 md:mt-28 flex items-center gap-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div
          className="h-[1px] flex-1"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(240,237,232,0.12))",
          }}
        />
        <p className="font-body text-[11px] tracking-[0.2em] uppercase text-[var(--text-muted)] opacity-40 whitespace-nowrap">
          All pieces made at the workshop
        </p>
        <div
          className="h-[1px] flex-1"
          style={{
            background:
              "linear-gradient(to left, transparent, rgba(240,237,232,0.12))",
          }}
        />
      </motion.div>
    </section>
  );
}
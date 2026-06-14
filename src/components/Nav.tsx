"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function Nav() {
  const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1,
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-6 px-[var(--gutter)] bg-gradient-to-b from-[rgba(10,10,10,0.95)] to-transparent"
    >
      <Link
        href="/"
        className="font-display text-xl tracking-widest uppercase text-[var(--text-primary)]"
      >
        2Q Nhẫn Thuật
      </Link>
      <ul className="flex gap-10 list-none">
        <li>
          <Link
            href="#works"
            className="font-body text-[var(--label-size)] tracking-[0.12em] uppercase text-[var(--text-muted)] transition-colors duration-fast ease-cinematic hover:text-[var(--text-primary)]"
          >
            Works
          </Link>
        </li>
        <li>
          <Link
            href="#services"
            className="font-body text-[var(--label-size)] tracking-[0.12em] uppercase text-[var(--text-muted)] transition-colors duration-fast ease-cinematic hover:text-[var(--text-primary)]"
          >
            Services
          </Link>
        </li>
        <li>
          <Link
            href="#about"
            className="font-body text-[var(--label-size)] tracking-[0.12em] uppercase text-[var(--text-muted)] transition-colors duration-fast ease-cinematic hover:text-[var(--text-primary)]"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="#location"
            className="font-body text-[var(--label-size)] tracking-[0.12em] uppercase text-[var(--text-muted)] transition-colors duration-fast ease-cinematic hover:text-[var(--text-primary)]"
          >
            Visit
          </Link>
        </li>
      </ul>
    </nav>
  );
}

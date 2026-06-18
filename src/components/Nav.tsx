"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";

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
      className="fixed top-0 left-0 right-0 z-50 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3 sm:py-5 px-(--gutter) bg-(--bg)/70 backdrop-blur-md border-b border-[rgba(240,237,232,0.06)]"
    >
      <Link
        href="/"
        className="flex min-h-11 items-center gap-3 font-display text-base sm:text-lg md:text-xl font-light tracking-[0.16em] sm:tracking-[0.18em] uppercase text-(--text-primary) hover:opacity-85 transition-opacity"
      >
        <Image
          src="/images/logo.jpg"
          alt="2Q Nhẫn Thuật logo"
          width={40}
          height={40}
          className="h-9 w-9 rounded-full bg-transparent object-cover mix-blend-screen"
          priority
        />
        <span className="hidden min-[420px]:inline">2Q Nhẫn Thuật</span>
      </Link>
      <ul className="flex min-h-11 flex-1 items-center justify-end gap-x-1 overflow-x-auto sm:flex-none sm:gap-x-6 md:gap-x-14 list-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <li>
          <Link
            href="/#works"
            className="flex min-h-11 items-center px-2 font-body text-(length:--label-size) tracking-[0.13em] sm:tracking-[0.15em] uppercase text-(--text-muted) transition-colors duration-fast ease-cinematic hover:text-(--text-primary) whitespace-nowrap"
          >
            Works
          </Link>
        </li>
        <li>
          <Link
            href="/#services"
            className="flex min-h-11 items-center px-2 font-body text-(length:--label-size) tracking-[0.13em] sm:tracking-[0.15em] uppercase text-(--text-muted) transition-colors duration-fast ease-cinematic hover:text-(--text-primary) whitespace-nowrap"
          >
            Services
          </Link>
        </li>
        <li>
          <Link
            href="/#about"
            className="flex min-h-11 items-center px-2 font-body text-(length:--label-size) tracking-[0.13em] sm:tracking-[0.15em] uppercase text-(--text-muted) transition-colors duration-fast ease-cinematic hover:text-(--text-primary) whitespace-nowrap"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/#location"
            className="flex min-h-11 items-center px-2 font-body text-(length:--label-size) tracking-[0.13em] sm:tracking-[0.15em] uppercase text-(--text-muted) transition-colors duration-fast ease-cinematic hover:text-(--text-primary) whitespace-nowrap"
          >
            Visit
          </Link>
        </li>
        <li>
          <Link
            href="/appointment"
            className="flex min-h-11 items-center px-2 font-body text-(length:--label-size) tracking-[0.13em] sm:tracking-[0.15em] uppercase text-(--accent) transition-colors duration-fast ease-cinematic hover:text-(--text-primary) whitespace-nowrap"
          >
            Book
          </Link>
        </li>
      </ul>
    </nav>
  );
}

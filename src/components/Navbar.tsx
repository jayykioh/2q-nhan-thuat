"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useScrolled } from "@/hooks/useScrolled";

const navLinks = [
  { label: "Works", href: "#works" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Location", href: "#location" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const scrolled = useScrolled(20);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  // Close mobile menu on link click
  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-[var(--gutter)] transition-all duration-400 ease-out ${
        scrolled
          ? "bg-[rgba(10,10,10,0.85)] backdrop-blur-[12px] -webkit-backdrop-blur-[12px] border-b border-[rgba(255,255,255,0.10)]"
          : "bg-transparent border-b border-[rgba(255,255,255,0.08)]"
      }`}
    >
      {/* Logo + Brand */}
      <Link
        href="/"
        className="flex items-center gap-3 font-display text-[17px] font-normal text-[var(--text-primary)] tracking-[0.02em] hover:opacity-75 transition-opacity duration-200"
      >
        <Image
          src="/images/logo.jpg"
          alt="2Q Nhẫn Thuật logo"
          width={32}
          height={32}
          loading="eager"
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="hidden sm:inline">2Q Nhẫn Thuật</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-12">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group relative font-body text-[13px] font-normal tracking-[0.12em] uppercase text-[rgba(255,255,255,0.45)] hover:text-[rgba(255,255,255,0.85)] transition-colors duration-200"
          >
            {link.label}
            {/* Underline animation */}
            <span
              className="absolute bottom-0 left-0 h-[0.5px] bg-[rgba(200,184,162,0.7)] w-full scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>

      {/* Mobile Hamburger Menu */}
      <button
        onClick={() => setMobileOpen((isOpen) => !isOpen)}
        className="md:hidden flex flex-col gap-[5px] w-6 h-5 justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2 rounded"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
      >
        <span
          className={`w-[22px] h-px bg-[rgba(255,255,255,0.6)] transition-transform duration-300 ease-out origin-center ${
            mobileOpen ? "rotate-45 translate-y-[11px]" : ""
          }`}
        />
        <span
          className={`w-[22px] h-px bg-[rgba(255,255,255,0.6)] transition-opacity duration-300 ease-out ${
            mobileOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`w-[22px] h-px bg-[rgba(255,255,255,0.6)] transition-transform duration-300 ease-out origin-center ${
            mobileOpen ? "-rotate-45 -translate-y-[11px]" : ""
          }`}
        />
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[rgba(10,10,10,0.97)] border-b border-[rgba(255,255,255,0.08)] px-[var(--gutter)] py-6 md:hidden" style={{ animation: "slideInFromTop 0.25s ease-out" }}>
          <ul className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={handleLinkClick}
                  className="font-body text-[13px] font-normal tracking-[0.12em] uppercase text-[rgba(255,255,255,0.45)] hover:text-[rgba(255,255,255,0.85)] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

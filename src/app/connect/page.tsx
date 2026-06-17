"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, ArrowLeft } from "lucide-react";

const Facebook = ({ size = 20, strokeWidth = 1.25, className = "" }: { size?: number; strokeWidth?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = ({ size = 20, strokeWidth = 1.25, className = "" }: { size?: number; strokeWidth?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const links = [
  {
    name: "Google Maps",
    desc: "27 Nguyễn Cao Luyện, Đà Nẵng",
    href: "https://maps.google.com/?q=27+Nguyễn+Cao+Luyện,+An+Hải,+Đà+Nẵng",
    icon: MapPin,
    external: true,
  },
  {
    name: "Facebook",
    desc: "Join our community",
    href: "https://www.facebook.com/profile.php?id=61577127505025",
    icon: Facebook,
    external: true,
  },
  {
    name: "Instagram",
    desc: "Follow our craft",
    href: "https://www.instagram.com/2qnhanthuat",
    icon: Instagram,
    external: true,
  },
  {
    name: "Phone Number",
    desc: "0896 208 698",
    href: "tel:0896208698",
    icon: Phone,
    external: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function ConnectPage() {
  return (
    <main className="relative min-h-screen bg-[var(--bg)] flex flex-col items-center selection:bg-[var(--accent)] selection:text-[var(--bg)]">
      {/* Banner Image with Fade */}
      <div className="absolute top-0 w-full h-[55vh] z-0 overflow-hidden">
        <Image
          src="/images/workshop.jpg"
          alt="Workshop Banner"
          fill
          className="object-cover opacity-40 mix-blend-luminosity"
          sizes="100vw"
          priority
        />
        {/* Gradient fade to background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg)]/80 to-[var(--bg)]" />
      </div>

      {/* Content Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-xl px-[var(--gutter)] pt-[20vh] pb-16 flex flex-col items-center"
      >
        {/* Profile / Header */}
        <motion.div variants={itemVariants} className="flex flex-col items-center text-center mb-12">
          {/* Logo avatar */}
          <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border border-[rgba(255,255,255,0.08)] shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <Image 
              src="/images/logo.jpg" 
              alt="2Q Nhan Thuat Logo" 
              width={96} 
              height={96}
              className="object-cover w-full h-full"
            />
          </div>
          <h1 className="font-display text-4xl leading-[1.1] font-light tracking-tight text-[var(--text-primary)] mb-3">
            2Q Nhẫn Thuật
          </h1>
          <p className="font-body text-[15px] text-[var(--text-muted)] italic max-w-sm px-4">
            Handcrafted wearable stories from Da Nang.
          </p>
        </motion.div>

        {/* Links Array */}
        <div className="w-full flex flex-col gap-4">
          {links.map((link, i) => (
            <motion.div key={i} variants={itemVariants} className="w-full">
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="group relative flex items-center p-4 md:p-5 bg-[var(--bg-elevated)] border border-[rgba(240,237,232,0.06)] overflow-hidden transition-all duration-500 hover:border-[rgba(200,184,162,0.3)] hover:-translate-y-1 hover:shadow-2xl hover:shadow-[rgba(200,184,162,0.05)] w-full"
              >
                {/* Highlight gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-[0.04] pointer-events-none" />
                
                <div className="w-12 h-12 flex items-center justify-center bg-[var(--bg)] border border-[rgba(255,255,255,0.03)] text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors duration-500 shrink-0">
                  <link.icon strokeWidth={1.25} size={20} />
                </div>
                
                <div className="flex-1 ml-5 text-left">
                  <h2 className="font-display text-xl tracking-tight text-[var(--text-primary)] mb-1">
                    {link.name}
                  </h2>
                  <p className="font-body text-[11px] uppercase tracking-[0.12em] text-[var(--accent)] opacity-70">
                    {link.desc}
                  </p>
                </div>
                
                {/* Small indicator arrow on hover */}
                <div className="text-[var(--text-muted)] opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[var(--accent)]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </a>
            </motion.div>
          ))}

          {/* Back to Home Button */}
          <motion.div variants={itemVariants} className="w-full mt-8 pt-8 border-t border-[rgba(255,255,255,0.05)]">
            <Link
              href="/"
              className="group relative flex items-center justify-center gap-3 p-4 bg-transparent transition-colors duration-500 w-full"
            >
              <ArrowLeft size={16} strokeWidth={1.5} className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors duration-500 group-hover:-translate-x-1" />
              <span className="font-body text-[11px] uppercase tracking-[0.15em] text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors duration-500">
                Back to Website
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}

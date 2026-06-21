"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface LightboxGalleryProps {
  images: string[];
  title: string;
}

export default function LightboxGallery({ images, title }: LightboxGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
    };
    if (selectedIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  return (
    <>
      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {images.map((src, idx) => (
          <div 
            key={idx} 
            className="relative overflow-hidden rounded-[2px] bg-[var(--bg-elevated)] group break-inside-avoid cursor-pointer"
            onClick={() => setSelectedIndex(idx)}
          >
            <div className="relative w-full" style={{ paddingBottom: idx % 2 === 0 ? "125%" : "100%" }}>
              <Image
                src={src}
                alt={`${title} photo ${idx + 1}`}
                fill
                quality={85}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:bg-black/0" />
            </div>
          </div>
        ))}
      </div>

      {/* Full Screen Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 md:top-8 md:right-8 z-[110] text-white/50 hover:text-white transition-colors p-2"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(null);
              }}
              aria-label="Close fullscreen"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Navigation Buttons (Optional, but good for UX) */}
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-[110] text-white/50 hover:text-white transition-colors p-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : (prev || 0) - 1));
                  }}
                  aria-label="Previous image"
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-[110] text-white/50 hover:text-white transition-colors p-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : (prev || 0) + 1));
                  }}
                  aria-label="Next image"
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </>
            )}

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-full h-full max-w-6xl max-h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} // Prevent clicks on image from closing
            >
              <Image
                src={images[selectedIndex]}
                alt={`${title} fullscreen`}
                fill
                quality={100}
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

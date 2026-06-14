"use client";

import Image from "next/image";

export default function FeedbackGallery() {
  const images = Array.from({ length: 23 }, (_, i) => `/images/feedback/${i + 1}.jpg`);

  const renderImages = () => (
    <>
      {images.map((src, i) => (
        <div key={i} className="relative h-[400px] w-[300px] flex-shrink-0 mx-2 overflow-hidden rounded-[2px]">
          <Image
            src={src}
            alt={`Customer Feedback ${i + 1}`}
            fill
            sizes="300px"
            className="object-cover"
          />
        </div>
      ))}
    </>
  );

  return (
    <section className="py-24 bg-[var(--bg)] overflow-hidden">
      <div className="px-[var(--gutter)] mb-12 text-center">
        <p className="font-body text-[var(--label-size)] tracking-[0.15em] uppercase text-[var(--text-muted)] mb-4">
          Customer Feedback
        </p>
        <h2 className="font-display text-[var(--h3-size)] font-light text-[var(--text-primary)]">
          Stories from our <em className="text-[var(--accent)] italic">community</em>.
        </h2>
      </div>
      
      {/* 
        We use the same marquee animation but override duration to be slower 
        because there are 23 images. We pause on hover so users can read.
      */}
      <div 
        className="marquee-track flex" 
        style={{ animationDuration: '60s' }}
        aria-hidden="true"
      >
        {renderImages()}
        {renderImages()}
      </div>
    </section>
  );
}

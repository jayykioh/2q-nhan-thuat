import Image from "next/image";

const feedbackImages = Array.from(
  { length: 23 },
  (_, i) => `/images/feedback/${i + 1}.jpg`
);

export default function FeedbackGallery() {
  const renderImages = () => (
    <>
      {feedbackImages.map((src, i) => (
        <div key={i} className="relative h-[min(70vh,400px)] w-[min(78vw,300px)] flex-shrink-0 mx-2 overflow-hidden rounded-[2px]">
          <Image
            src={src}
            alt={`2qnhanthuat customer feedback wearing ring from spoon ${i + 1}`}
            fill
            sizes="(max-width: 480px) 78vw, 300px"
            className="object-cover"
          />
        </div>
      ))}
    </>
  );

  return (
    <section className="py-[var(--section-py)] bg-[var(--bg)] overflow-hidden">
      <div className="px-[var(--gutter)] mb-12 text-center">
        <p className="font-body text-[var(--label-size)] tracking-[0.15em] uppercase text-[var(--text-muted)] mb-4">
          Customer Feedback
        </p>
        <h2 className="font-display text-[var(--h3-size)] font-light text-[var(--text-primary)]">
          Stories from our <em className="text-[var(--accent)] italic">2qnhanthuat community</em> wearing custom rings from spoons.
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

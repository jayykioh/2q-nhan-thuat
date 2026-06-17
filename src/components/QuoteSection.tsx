import ScrollReveal from "./ScrollReveal";

const quoteText =
  "Forged from forgotten silver, each piece carries a unique narrative. We handcraft vintage spoons into timeless wearable art, ensuring that no two stories are ever exactly the same.";

export default function QuoteSection() {
  return (
    <section
      className="relative flex h-[150vh] md:h-[200vh] items-center justify-center overflow-hidden bg-[var(--bg)] border-b border-[var(--border)]"
    >
      {/* Scroll Down Indicator */}
      <div className="absolute top-16 md:top-24 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-6 text-center">
        <span className="relative max-w-[12ch] font-body text-[10px] tracking-[0.2em] uppercase leading-tight text-[var(--text-muted)] after:absolute after:left-1/2 after:top-full after:mt-4 after:h-16 md:after:h-24 after:w-px after:bg-gradient-to-b after:from-[var(--text-muted)] after:to-transparent after:content-['']">
          Scroll down
        </span>
      </div>

      <div
        className="w-full max-w-5xl px-[var(--gutter)] text-center text-[var(--accent)]"
      >
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
          textClassName="font-display text-2xl leading-relaxed md:text-3xl md:leading-relaxed lg:text-5xl lg:leading-relaxed font-light tracking-tight"
          rotationEnd="center center"
          wordAnimationEnd="center center"
        >
          {quoteText}
        </ScrollReveal>
        <div className="mt-8 md:mt-12 opacity-60">
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={3}
            blurStrength={8}
            textClassName="font-body text-[var(--label-size)] uppercase tracking-[0.2em] text-[var(--text-primary)]"
            rotationEnd="center center"
            wordAnimationEnd="center center"
          >
            Mr Quyen . 2Q Nhan Thuat
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

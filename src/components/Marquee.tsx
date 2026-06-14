"use client";

export default function Marquee() {
  const items = [
    "TRULY ONE-OF-ONE",
    "HANDMADE CRAFTSMANSHIP",
    "DURABLE STAINLESS STEEL",
    "SUSTAINABLE DESIGN",
    "PERSONAL STORY",
  ];

  const renderItems = () => (
    <>
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="font-display text-4xl md:text-5xl italic font-light px-8 text-[var(--accent)] whitespace-nowrap">
            {item}
          </span>
          <span className="text-[var(--text-muted)] opacity-50">—</span>
        </span>
      ))}
    </>
  );

  return (
    <section className="py-20 border-y border-[var(--border)] bg-[var(--bg-elevated)] overflow-hidden">
      <div className="marquee-track" aria-hidden="true">
        {renderItems()}
        {renderItems()}
      </div>
    </section>
  );
}

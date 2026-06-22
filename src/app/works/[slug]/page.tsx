import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import LightboxGallery from "@/components/LightboxGallery";

// Define the content and image mappings for each collection
const collections: Record<
  string,
  {
    title: string;
    category: string;
    description: string;
    heroImage: string;
    images: string[];
  }
> = {
  "handmade-spoon-rings": {
    title: "Handmade Spoon Rings",
    category: "Signature Collection",
    description:
      "Our signature collection features vintage spoons meticulously heated, bent, and polished into stunning, one-of-a-kind rings. Each piece carries the history of its past life, transformed into a wearable story.",
    heroImage: "/images/lookbooks/solo-cinematic-rings.JPG",
    images: [
      "/images/lookbooks/solo-cinematic-rings.JPG",
      "/images/lookbooks/solo-cinematic-rings2.JPG",
      "/images/lookbooks/solo-cinematic-rings3.JPG",
      "/images/lookbooks/solo-cinematic-rings4.JPG",
      "/images/lookbooks/solo-cinematic-rings5.JPG",
      "/images/lookbooks/solo-cinematic-rings6.JPG",
    ],
  },
  "unique-patterns": {
    title: "Unique Patterns",
    category: "Custom Designs",
    description:
      "Explore the intricate details and unique floral patterns preserved from classic silverware. No two patterns are exactly alike, ensuring your ring is exclusively yours.",
    heroImage: "/images/lookbooks/knife-spoon.JPG",
    images: [
      "/images/lookbooks/knife-spoon.JPG",
      "/images/lookbooks/knife-spoon2.JPG",
      "/images/lookbooks/knife-spoon3.JPG",
      "/images/lookbooks/knife-spoon4.JPG",
    ],
  },
  "choosing-the-story": {
    title: "Choosing the Story",
    category: "The Experience",
    description:
      "The journey begins with you. Visit our workshop to browse our collection of raw, vintage silverware and select the exact piece that resonates with your personal style.",
    heroImage: "/images/lookbooks/cinematic-rings.JPG",
    images: [
      "/images/lookbooks/cinematic-rings.JPG",
      "/images/lookbooks/cinematic-rings1.JPG",
      "/images/lookbooks/cinematic-rings2.JPG",
      "/images/lookbooks/cinematic-rings3.JPG",
      "/images/lookbooks/cinematic-rings4.JPG",
      "/images/lookbooks/cinematic-rings5.JPG",
    ],
  },
  "customer-moments": {
    title: "Customer Moments",
    category: "Community",
    description:
      "See how our community wears their stories. From casual daily wear to special occasions, our handcrafted rings are designed to complement every individual's unique aesthetic.",
    heroImage: "/images/lookbooks/girl-pose-with-bracklet.jpg",
    images: [
      "/images/lookbooks/girl-pose-with-bracklet.jpg",
      "/images/lookbooks/girl-pose-with-bracklet2.jpg",
      "/images/lookbooks/girl-pose-with-bracklet3.jpg",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(collections).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = collections[slug];

  if (!collection) {
    return { title: "Collection Not Found | 2Q Nhan Thuat" };
  }

  return {
    title: `${collection.title} - ${collection.category} | 2Q Nhan Thuat`,
    description: collection.description,
    openGraph: {
      title: `${collection.title} | 2Q Nhan Thuat`,
      description: collection.description,
      images: [
        {
          url: `https://2qnhanthuat.com${collection.heroImage}`,
          width: 1200,
          height: 800,
          alt: collection.title,
        },
      ],
    },
    alternates: {
      canonical: `/works/${slug}`,
    },
  };
}

export default async function WorksDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = collections[slug];

  if (!collection) {
    notFound();
  }

  return (
    <main className="w-full relative min-h-screen bg-[var(--bg-default)] flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-[var(--gutter)] md:pt-48 md:pb-24 border-b border-[var(--border)]">
        <div className="absolute top-28 left-[var(--gutter)] md:top-36 md:left-[var(--gutter)] z-10">
          <Link
            href="/#works"
            className="group inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-300"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              &larr;
            </span>{" "}
            back
          </Link>
        </div>
        <div className="max-w-4xl mx-auto text-center mt-6 md:mt-0">
          <p className="font-body text-[10px] md:text-xs tracking-[0.2em] uppercase text-[var(--accent)] mb-4 md:mb-6">
            {collection.category}
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-[var(--text-primary)] mb-6 md:mb-8 leading-tight">
            {collection.title}
          </h1>
          <p className="font-body text-base md:text-lg leading-relaxed text-[var(--text-muted)] max-w-2xl mx-auto">
            {collection.description}
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-24 px-[var(--gutter)] lg:px-12">
        <div className="max-w-7xl mx-auto">
          <LightboxGallery images={collection.images} title={collection.title} />
        </div>
      </section>

      {/* Embedded CTA specific to detail pages */}
      <section className="py-20 md:py-32 px-[var(--gutter)] bg-[var(--bg-elevated)] text-center border-t border-[var(--border)]">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <h2 className="font-display text-3xl md:text-5xl font-light text-[var(--text-primary)] mb-6">
            Start Your Story
          </h2>
          <p className="font-body text-base md:text-lg text-[var(--text-muted)] mb-10 leading-relaxed">
            Inspired by this collection? Visit our workshop in Da Nang to choose
            your vintage spoon and watch it transform into a piece of wearable
            art.
          </p>
          <Link
            href="/appointment"
            className="group relative inline-flex items-center justify-center h-14 px-10 border border-[var(--border)] overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-[var(--text-primary)] transform origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-y-100" />
            <span className="relative font-body text-xs uppercase tracking-[0.2em] text-[var(--text-primary)] transition-colors duration-500 group-hover:text-[var(--bg-default)]">
              Book Appointment
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import QuoteSection from "@/components/QuoteSection";
import WorksGrid from "@/components/WorksGrid";
import About from "@/components/About";
import Services from "@/components/Services";
import Location from "@/components/Location";
import Contact from "@/components/Contact";
import FeedbackGallery from "@/components/FeedbackGallery";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full relative">
      <Navbar />
      <Hero />
      <Marquee />
      <QuoteSection />
      <WorksGrid />
      <About />
      <Services />
      <Location />
      <Contact />
      <FeedbackGallery />
      <CTA />
      <Footer />
    </main>
  );
}

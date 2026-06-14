"use client";

import { AnimatePresence, motion } from "framer-motion";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import WorksGrid from "@/components/WorksGrid";
import About from "@/components/About";
import Services from "@/components/Services";
import Location from "@/components/Location";
import FeedbackGallery from "@/components/FeedbackGallery";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full relative">
      <Nav />
      <Hero />
      <Marquee />
      <WorksGrid />
      <About />
      <Services />
      <Location />
      <FeedbackGallery />
      <CTA />
      <Footer />
    </main>
  );
}

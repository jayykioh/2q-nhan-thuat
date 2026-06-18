"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AppointmentPage() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    type: "Ring",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi 2Q Nhẫn Thuật,\nI would like to book an appointment.\n\nName: ${formData.name || "A customer"}\nDate: ${formData.date}\nTime: ${formData.time}\nItem: ${formData.type}\nMessage: ${formData.message}`;
    const encoded = encodeURIComponent(text);
    // WhatsApp intent
    window.open(`https://wa.me/84896208698?text=${encoded}`, "_blank");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <main className="w-full relative min-h-screen bg-[var(--bg)] flex flex-col selection:bg-[var(--accent)] selection:text-black overflow-hidden">
      
      {/* Background Image with Fade Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image
          src="/images/images.jpg"
          alt="Workshop background"
          fill
          className="object-cover opacity-30 sm:opacity-50 object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg)]/95 via-[var(--bg)]/65 to-[var(--bg)]/95" />
      </div>

      <div className="relative z-20">
        <Navbar />
      </div>

      <div className="relative z-10 flex-grow pt-32 pb-24 px-[var(--gutter)] flex justify-center">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Context & Info */}
          <div className="flex flex-col justify-center">
            <p className="font-body text-[var(--label-size)] uppercase tracking-[0.15em] text-[var(--accent)] mb-6">
              Experience the Craft
            </p>
            <h1 className="font-display text-[var(--h2-size)] leading-[1.1] font-light tracking-tight text-[var(--text-primary)] mb-8">
              Book your <br />
              <em className="italic text-[var(--text-muted)]">session.</em>
            </h1>

            <div className="space-y-4 font-body text-base sm:text-lg leading-relaxed text-[var(--text-muted)] border-l-[3px] border-[var(--accent)] pl-6 mb-12">
              <p>
                Transforming vintage spoons into one-of-a-kind jewelry. Handcrafted precisely to your style, every piece tells a unique story.
              </p>
            </div>

            <div className="mt-4">
              <h3 className="font-display text-xl text-[var(--text-primary)] mb-6 tracking-wide">Estimated Crafting Times</h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
                <div className="backdrop-blur-lg bg-[var(--bg-elevated)]/40 border border-[rgba(240,237,232,0.1)] p-3 sm:p-5 rounded-xl sm:rounded-2xl flex flex-col justify-center transition-transform hover:-translate-y-1 shadow-lg text-center sm:text-left">
                  <span className="font-body uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[8px] sm:text-[10px] text-[var(--text-muted)] mb-1 sm:mb-2 truncate">Rings</span>
                  <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-0 sm:gap-1">
                    <span className="font-display text-xl sm:text-3xl text-[var(--accent)]">10-15</span>
                    <span className="font-body text-[10px] sm:text-xs text-[var(--text-primary)] uppercase tracking-wider">min</span>
                  </div>
                </div>
                
                <div className="backdrop-blur-lg bg-[var(--bg-elevated)]/40 border border-[rgba(240,237,232,0.1)] p-3 sm:p-5 rounded-xl sm:rounded-2xl flex flex-col justify-center transition-transform hover:-translate-y-1 shadow-lg text-center sm:text-left">
                  <span className="font-body uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[8px] sm:text-[10px] text-[var(--text-muted)] mb-1 sm:mb-2 truncate">Bracelets</span>
                  <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-0 sm:gap-1">
                    <span className="font-display text-xl sm:text-3xl text-[var(--accent)]">20</span>
                    <span className="font-body text-[10px] sm:text-xs text-[var(--text-primary)] uppercase tracking-wider">min</span>
                  </div>
                </div>

                <div className="backdrop-blur-lg bg-[var(--bg-elevated)]/40 border border-[rgba(240,237,232,0.1)] p-3 sm:p-5 rounded-xl sm:rounded-2xl flex flex-col justify-center transition-transform hover:-translate-y-1 shadow-lg text-center sm:text-left">
                  <span className="font-body uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[8px] sm:text-[10px] text-[var(--text-muted)] mb-1 sm:mb-2 truncate">Necklaces</span>
                  <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-0 sm:gap-1">
                    <span className="font-display text-xl sm:text-3xl text-[var(--accent)]">30</span>
                    <span className="font-body text-[10px] sm:text-xs text-[var(--text-primary)] uppercase tracking-wider">min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Appointment Form */}
          <div className="flex flex-col justify-center">
            <div className="backdrop-blur-xl bg-[var(--bg-elevated)]/40 border border-[rgba(240,237,232,0.1)] p-8 sm:p-12 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-body text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] ml-1">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-[rgba(0,0,0,0.2)] border-b-2 border-[rgba(240,237,232,0.1)] px-4 py-3 font-body text-base text-[var(--text-primary)] placeholder:text-[rgba(240,237,232,0.2)] focus:outline-none focus:border-[var(--accent)] focus:bg-[rgba(0,0,0,0.4)] transition-all rounded-t-md"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Date */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="date" className="font-body text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] ml-1">Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="bg-[rgba(0,0,0,0.2)] border-b-2 border-[rgba(240,237,232,0.1)] px-4 py-3 font-body text-base text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] focus:bg-[rgba(0,0,0,0.4)] transition-all rounded-t-md w-full"
                      required
                      style={{ colorScheme: "dark" }}
                    />
                  </div>

                  {/* Time */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="time" className="font-body text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] ml-1">Time</label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="bg-[rgba(0,0,0,0.2)] border-b-2 border-[rgba(240,237,232,0.1)] px-4 py-3 font-body text-base text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] focus:bg-[rgba(0,0,0,0.4)] transition-all rounded-t-md w-full"
                      required
                      style={{ colorScheme: "dark" }}
                    />
                  </div>
                </div>

                {/* Type */}
                <div className="flex flex-col gap-2 mt-2">
                  <label htmlFor="type" className="font-body text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] ml-1">Accessory Type</label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="bg-[rgba(0,0,0,0.2)] border-b-2 border-[rgba(240,237,232,0.1)] px-4 py-3 font-body text-base text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] focus:bg-[rgba(0,0,0,0.4)] transition-all rounded-t-md cursor-pointer"
                    required
                  >
                    <option value="Ring" className="bg-[var(--bg-elevated)] text-[var(--text-primary)]">Ring</option>
                    <option value="Bracelet" className="bg-[var(--bg-elevated)] text-[var(--text-primary)]">Bracelet</option>
                    <option value="Earrings" className="bg-[var(--bg-elevated)] text-[var(--text-primary)]">Earrings</option>
                    <option value="Necklace" className="bg-[var(--bg-elevated)] text-[var(--text-primary)]">Necklace</option>
                    <option value="Other" className="bg-[var(--bg-elevated)] text-[var(--text-primary)]">Other / Multiple</option>
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2 mt-2">
                  <label htmlFor="message" className="font-body text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] ml-1">Message for owner (Optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="bg-[rgba(0,0,0,0.2)] border-b-2 border-[rgba(240,237,232,0.1)] px-4 py-3 font-body text-base text-[var(--text-primary)] placeholder:text-[rgba(240,237,232,0.2)] focus:outline-none focus:border-[var(--accent)] focus:bg-[rgba(0,0,0,0.4)] transition-all resize-none rounded-t-md"
                    placeholder="Any specific requests or ideas?"
                  ></textarea>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="group relative mt-6 w-full inline-flex justify-center items-center gap-3 px-6 py-4 bg-[var(--text-primary)] text-[var(--bg)] font-body text-[11px] uppercase tracking-[0.2em] hover:bg-[#25D366] hover:text-white transition-all duration-300 rounded-md shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Send via WhatsApp
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                </button>
                
                <p className="text-center font-body text-[10px] text-[var(--text-muted)] uppercase tracking-widest mt-2">
                  Phone: 0896 208 698
                </p>

              </form>
            </div>
          </div>

        </div>
      </div>

      <div className="relative z-20">
        <Footer />
      </div>
    </main>
  );
}

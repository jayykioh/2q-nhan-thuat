import type { Metadata } from "next";
import AppointmentForm from "./AppointmentForm";

export const metadata: Metadata = {
  title: "Book an Appointment | 2Q Nhan Thuat – Handmade Spoon Rings in Da Nang",
  description:
    "Book an appointment for handcrafted spoon rings at 2Q Nhan Thuat. Meet us at Musky Slow Bar & Bakery or Innoir in Da Nang, or book online. Each ring is crafted in about 10 to 15 minutes.",
  keywords:
    "book spoon ring appointment, handmade spoon rings da nang, custom ring appointment, handcrafted jewelry booking, 2q nhan thuat appointment",
  openGraph: {
    title: "Book an Appointment – 2Q Nhan Thuat | Handmade Spoon Rings",
    description:
      "Book a handcrafted spoon ring appointment in Da Nang. Meet us at Musky Slow Bar & Bakery or Innoir, or book online.",
    url: "https://2qnhanthuat.com/appointment",
    siteName: "2Q Nhan Thuat",
    locale: "en_US",
    images: [
      {
        url: "https://2qnhanthuat.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Book a handcrafted spoon ring appointment at 2Q Nhan Thuat in Da Nang",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book an Appointment | 2Q Nhan Thuat",
    description:
      "Book a handcrafted spoon ring appointment in Da Nang or online.",
    images: ["https://2qnhanthuat.com/images/og-image.jpg"],
  },
  alternates: {
    canonical: "/appointment",
  },
};

export default function AppointmentPage() {
  return <AppointmentForm />;
}

import type { Metadata } from "next";
import AppointmentForm from "./AppointmentForm";

export const metadata: Metadata = {
  title: "Book Appointment | 2Q Nhẫn Thuật – Handcrafted Rings From Spoons in Da Nang",
  description: "Book an appointment for handcrafted spoon rings at 2Q Nhẫn Thuật. Meet us at Musky Slow Bar & Bakery or Innoir (Da Nang), or book online. Crafted in just 10-15 minutes.",
  openGraph: {
    title: "Book Appointment – 2Q Nhẫn Thuật | Handcrafted Rings From Spoons",
    description: "Book an appointment for handcrafted spoon rings in Da Nang. Meet us at Musky Slow Bar & Bakery or Innoir, or book online.",
    url: "https://2qnhanthuat.com/appointment",
    images: [
      {
        url: "https://2qnhanthuat.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Book handcrafted ring appointment at 2Q Nhẫn Thuật Da Nang",
      },
    ],
  },
};

export default function AppointmentPage() {
  return <AppointmentForm />;
}

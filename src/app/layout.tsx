import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "2Q Nhẫn Thuật | Handcrafted Rings Made From Spoons",
  description: "Discover 2Q Nhẫn Thuật (2Q). We craft unique rings made from spoons and custom accessories from vintage silverware in Da Nang, Vietnam. Turn forgotten spoons into wearable stories.",
  keywords: "2qnhanthuat, 2q nhan thuat, ring from spoon, accessories from spoon, spoon rings, custom rings",
  openGraph: {
    title: "2Q Nhẫn Thuật | Handcrafted Rings Made From Spoons",
    description: "Discover 2Q Nhẫn Thuật (2Q). We craft unique rings made from spoons and custom accessories from vintage silverware in Da Nang, Vietnam.",
    url: "https://2qnhanthuat.com",
    siteName: "2Q Nhẫn Thuật",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    "name": "2Q Nhẫn Thuật",
    "alternateName": "2Q",
    "description": "Handcrafted rings made from spoons and vintage silverware accessories.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Da Nang",
      "addressCountry": "VN"
    },
    "keywords": "ring made from spoon, 2q nhan thuat, 2q, accessories from spoon"
  };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

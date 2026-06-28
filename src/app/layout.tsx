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
  title: "2Q Nhan Thuat | Handmade Spoon Rings in Da Nang",
  description:
    "2Q Nhan Thuat creates handcrafted spoon rings and custom silverware jewelry in Da Nang, Vietnam. Each piece is made by hand from vintage spoons and designed as a one-of-a-kind wearable story.",
  keywords:
    "handmade spoon rings, spoon rings da nang, custom silver rings, handcrafted jewelry vietnam, vintage silverware jewelry, one of a kind rings, custom rings, handmade jewelry da nang, 2q nhan thuat, 2qnhanthuat",
  openGraph: {
    title: "2Q Nhan Thuat | Handmade Spoon Rings in Da Nang",
    description:
      "Handcrafted spoon rings and custom silverware jewelry made in Da Nang, Vietnam. Explore one-of-a-kind rings shaped from vintage spoons and finished by hand.",
    url: "https://2qnhanthuat.com",
    siteName: "2Q Nhan Thuat",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://2qnhanthuat.com/images/logo.jpg",
        width: 500,
        height: 500,
        alt: "2Q Nhan Thuat logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "2Q Nhan Thuat | Handmade Spoon Rings in Da Nang",
    description:
      "Handcrafted spoon rings and custom silverware jewelry made in Da Nang, Vietnam.",
    images: ["https://2qnhanthuat.com/images/logo.jpg"],
  },
  metadataBase: new URL("https://2qnhanthuat.com"),
  verification: {
    google: "4HIDEbw3B4nxIT0B4n2tvVpNdW1exN-TvgEQWIUSlI0",
  },
  alternates: {
    canonical: "/",
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
    name: "2Q Nhan Thuat",
    alternateName: ["2Q", "2qnhanthuat"],
    description:
      "Handcrafted spoon rings and vintage silverware accessories made in Da Nang, Vietnam.",
    url: "https://2qnhanthuat.com",
    telephone: "+84896208698",
    image: "https://2qnhanthuat.com/images/logo.jpg",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "27 Nguyen Cao Luyen, An Hai Bac",
      addressLocality: "Son Tra, Da Nang",
      addressCountry: "VN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 16.0799,
      longitude: 108.2322,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/profile.php?id=61577127505025",
      "https://www.instagram.com/2qnhanthuat",
    ],
    hasMap:
      "https://maps.google.com/?q=27+Nguyen+Cao+Luyen,+An+Hai+Bac,+Son+Tra,+Da+Nang",
    currenciesAccepted: "VND",
    paymentAccepted: "Cash, Bank Transfer",
    areaServed: {
      "@type": "City",
      name: "Da Nang",
    },
    keywords:
      "handmade spoon rings, spoon rings da nang, custom rings, vintage silverware jewelry, 2q nhan thuat, accessories from spoon",
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

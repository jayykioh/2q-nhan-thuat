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
  title: "2Q Nhẫn Thuật | Nhẫn Handmade Từ Muỗng – Đà Nẵng",
  description: "2Q Nhẫn Thuật – Chuyên làm nhẫn handmade từ muỗng cổ và phụ kiện thủ công tại Đà Nẵng. Mỗi chiếc nhẫn là một câu chuyện riêng, được chế tác tỉ mỉ từ thìa bạc cổ điển. Handcrafted spoon rings & accessories in Da Nang, Vietnam.",
  keywords: "nhẫn từ muỗng, nhẫn handmade đà nẵng, phụ kiện từ thìa, 2q nhẫn thuật, 2qnhanthuat, nhẫn bạc thủ công, spoon rings da nang, handmade jewelry vietnam, ring from spoon, custom rings",
  openGraph: {
    title: "2Q Nhẫn Thuật | Nhẫn Handmade Từ Muỗng – Đà Nẵng",
    description: "2Q Nhẫn Thuật – Chuyên làm nhẫn handmade từ muỗng cổ và phụ kiện thủ công tại Đà Nẵng. Mỗi chiếc nhẫn là một câu chuyện riêng. Handcrafted spoon rings in Da Nang, Vietnam.",
    url: "https://2qnhanthuat.com",
    siteName: "2Q Nhẫn Thuật",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "https://2qnhanthuat.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "2Q Nhẫn Thuật – Nhẫn Handmade Từ Muỗng Cổ tại Đà Nẵng",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "2Q Nhẫn Thuật | Nhẫn Handmade Từ Muỗng – Đà Nẵng",
    description: "Chuyên làm nhẫn handmade từ muỗng cổ và phụ kiện thủ công tại Đà Nẵng.",
    images: ["https://2qnhanthuat.com/images/og-image.jpg"],
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
    "name": "2Q Nhẫn Thuật",
    "alternateName": ["2Q", "2qnhanthuat"],
    "description": "Chuyên làm nhẫn handmade từ muỗng cổ và phụ kiện thủ công tại Đà Nẵng. Handcrafted spoon rings and vintage silverware accessories in Da Nang, Vietnam.",
    "url": "https://2qnhanthuat.com",
    "telephone": "+84896208698",
    "image": "https://2qnhanthuat.com/images/og-image.jpg",
    "priceRange": "₫₫",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "27 Nguyễn Cao Luyện, An Hải Bắc",
      "addressLocality": "Sơn Trà, Đà Nẵng",
      "addressCountry": "VN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 16.0799,
      "longitude": 108.2322
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "09:00",
        "closes": "21:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61577127505025",
      "https://www.instagram.com/2qnhanthuat"
    ],
    "hasMap": "https://maps.google.com/?q=27+Nguyễn+Cao+Luyện,+An+Hải+Bắc,+Sơn+Trà,+Đà+Nẵng",
    "currenciesAccepted": "VND",
    "paymentAccepted": "Cash, Bank Transfer",
    "areaServed": {
      "@type": "City",
      "name": "Đà Nẵng"
    },
    "keywords": "nhẫn từ muỗng, nhẫn handmade đà nẵng, ring made from spoon, 2q nhan thuat, 2q, accessories from spoon"
  };

  return (
    <html
      lang="vi"
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

import type { Metadata } from "next";
import "./globals.css";
import { MotionProvider } from "@/components/MotionProvider";

export const metadata: Metadata = {
  title: "הייטקידס - קייטנת טכנולוגיה לילדים | קיץ 2026",
  description: "קייטנת טכנולוגיה לילדים בגילאי 8-15: סדנאות AI, קוד, רובוטיקה וכתיבה יצירתית. קבוצות קטנות, מדריכים מקצועיים, מגדל העמק, קיץ 2026.",
  keywords: "קייטנת קוד, קייטנת טכנולוגיה, AI לילדים, רובוטיקה, קידוד לילדים, קייטנת קיץ 2026, הייטקידס",
  metadataBase: new URL("https://hitechkids.eladjak.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "הייטקידס - קייטנת טכנולוגיה לילדים",
    description: "הקייטנה הכי כיפית לילדים - AI, קוד, רובוטים ויצירה! קיץ 2026",
    locale: "he_IL",
    type: "website",
    url: "https://hitechkids.eladjak.com",
    siteName: "הייטקידס",
    images: [
      {
        url: "/images/hitechkids-hero-wide.jpg",
        width: 1200,
        height: 630,
        alt: "קייטנת הייטקידס - סדנאות טכנולוגיה לילדים",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "הייטקידס - קייטנת טכנולוגיה לילדים",
    description: "AI, קוד, רובוטיקה וכתיבה יצירתית - קיץ 2026!",
    images: ["/images/hitechkids-hero-wide.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:z-[100] focus:bg-[#00d4ff] focus:text-black focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold">
          דלג לתוכן הראשי
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}

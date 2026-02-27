import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "הייטקידס - קייטנת טכנולוגיה לילדים",
  description: "קייטנת הייטקידס - סדנאות AI, קוד, כתיבה יצירתית ורובוטיקה לילדים בגילאי 8-15. קיץ 2025.",
  keywords: "קייטנת קוד, קייטנת טכנולוגיה, AI לילדים, רובוטיקה, קידוד לילדים",
  openGraph: {
    title: "הייטקידס - קייטנת טכנולוגיה לילדים",
    description: "הקייטנה הכי כיפית לילדים - AI, קוד, רובוטים ויצירה!",
    locale: "he_IL",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Oswald, Work_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminBanner from "@/components/AdminBanner";

const worksans = Work_Sans({
  variable: "--font-worksans",
  subsets: ["latin", "latin-ext"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin", "latin-ext"],
});

const SITE_URL = "https://loka-salon-demo.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "LOKA - Studio Fryzjerskie",
    template: "%s | LOKA",
  },
  description:
    "LOKA - studio fryzjerskie w centrum miasta. Strzyżenie, koloryzacja i stylizacja. Rezerwuj wizytę online w 2 minuty.",
  keywords: ["fryzjer", "salon fryzjerski", "koloryzacja", "balayage", "rezerwacja online", "LOKA"],
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: "LOKA",
    title: "LOKA - Studio Fryzjerskie",
    description: "Strzyżenie, koloryzacja i stylizacja. Rezerwuj wizytę online w 2 minuty.",
    url: SITE_URL,
    images: [
      {
        url: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "LOKA - Studio Fryzjerskie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LOKA - Studio Fryzjerskie",
    description: "Strzyżenie, koloryzacja i stylizacja. Rezerwuj wizytę online w 2 minuty.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${worksans.variable} ${oswald.variable} antialiased`}>
        <AdminBanner />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import { SavedProvider } from "@/lib/saved-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Charlotte Office Eats | Uptown Charlotte",
  description:
    "A curated Uptown Charlotte dining guide for colleagues and clients. Find breakfast, lunch, dinner, and dessert spots with distance and private-room details.",
  applicationName: "Charlotte Office Eats",
  keywords: [
    "Charlotte",
    "Uptown",
    "restaurants",
    "dining guide",
    "client dinner",
    "rooftop",
  ],
  openGraph: {
    title: "Charlotte Office Eats",
    description: "Uptown Charlotte recommendations for colleagues and clients.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#051c2c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body className="min-h-dvh">
        <SavedProvider>
          <AppHeader />
          <main className="mx-auto min-h-[calc(100dvh-4rem)] max-w-6xl px-5 pb-28 pt-6 sm:px-8">
            {children}
          </main>
          <BottomNav />
        </SavedProvider>
      </body>
    </html>
  );
}

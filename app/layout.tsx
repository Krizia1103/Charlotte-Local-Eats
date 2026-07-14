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
  title: "CLT Dining Guide | Uptown Charlotte",
  description:
    "A curated dining guide for traveling colleagues in Uptown Charlotte. Find restaurants and bars by occasion: brunch, client dinners, rooftop drinks, and more.",
  applicationName: "CLT Dining Guide",
  keywords: [
    "Charlotte",
    "Uptown",
    "restaurants",
    "dining guide",
    "client dinner",
    "rooftop",
  ],
  openGraph: {
    title: "CLT Dining Guide",
    description: "Uptown Charlotte recommendations for traveling colleagues.",
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
          <main className="mx-auto min-h-[calc(100dvh-4rem)] max-w-3xl px-4 pb-28 pt-5">
            {children}
          </main>
          <BottomNav />
        </SavedProvider>
      </body>
    </html>
  );
}

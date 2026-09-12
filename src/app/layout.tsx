import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aura-motion.com"),
  title: "AURA | A New Perspective on Motion",
  description:
    "An immersive, cinematic showcase of AURA: Next-generation high-performance hybrid supercar. Experience engineering deconstruction, active aerodynamics, and pure form in motion.",
  keywords: [
    "AURA",
    "Supercar",
    "Automotive Design",
    "Carbon Monocoque",
    "Hybrid Powertrain",
    "360 Car Showcase",
  ],
  openGraph: {
    title: "AURA | A New Perspective on Motion",
    description:
      "An immersive, cinematic showcase of AURA: Next-generation high-performance hybrid supercar.",
    images: ["/car/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`}>
      <body className="min-h-screen bg-[#040507] text-slate-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}

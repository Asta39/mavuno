import type { Metadata } from "next";
import { Anton, Caveat, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Mavuno Pantry",
  description: "Small-batch olives, pestos and spreads from Nairobi. Concept project.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${caveat.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

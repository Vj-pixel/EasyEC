import type { Metadata } from "next";
import { Geist, Fraunces, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700", "900"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "EasyEC – Discover Your Extracurricular Opportunity",
    template: "%s | EasyEC",
  },
  description:
    "EasyEC helps high school students discover internships, research programs, competitions, and extracurricular opportunities that match their interests and goals.",
  keywords: ["extracurricular", "high school", "internship", "research", "competition", "student opportunities"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${fraunces.variable} ${newsreader.variable} ${jetbrainsMono.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-slate-50 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { themeScript } from "@/context/ThemeContext";
import { Providers } from "@/components/Providers";
import { TopNav } from "@/components/TopNav";
import { MobileNav } from "@/components/MobileNav";
import { Footer } from "@/components/Footer";
import { MediaPlayer } from "@/components/MediaPlayer";
import { Toaster } from "@/components/ui/Toaster";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "New Jerusalem · Hasten the Gathering and Unity in Zion",
    template: "%s · New Jerusalem",
  },
  description:
    "A private, faith-centered community for Latter-day Saints and searching friends — praying, serving, testifying, and gathering together in Zion.",
};

export const viewport: Viewport = {
  themeColor: "#17162b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-bg">
        <Providers>
          <TopNav />
          <main className="flex-1">{children}</main>
          <Footer />
          <MediaPlayer />
          <MobileNav />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

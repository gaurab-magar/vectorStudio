import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Vector Studio — Photographer Berlin",
  description:
    "Editorial and lifestyle photography by Vector. New York-born, Berlin-based. Available worldwide.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Vector Studio — Photographer Berlin",
    description: "Editorial and lifestyle photography by Vector.",
    type: "website",
    locale: "en_EU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-[#0a0a0a] dark:text-zinc-100">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

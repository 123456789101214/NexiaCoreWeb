import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/ui/SmoothScroll"; 
import { SmoothCursor } from '@/components/ui/SmoothCursor';

// Load Vercel's signature fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Unicorn-Level SEO Metadata (Sri Lankan Context)
export const metadata: Metadata = {
  title: "NexiaCore — Smart POS SaaS for Sri Lanka | Cloud POS System",
  description: "Cloud-based Point of Sale system for supermarkets, pharmacies, and retail shops in Sri Lanka. Real-time analytics, multi-tenant, free 14-day trial. Trusted by 1,500+ businesses.",
  keywords: [
    "POS system Sri Lanka", 
    "supermarket software", 
    "pharmacy POS", 
    "retail management", 
    "NexiaCore", 
    "cloud POS", 
    "inventory management Sri Lanka",
    "digital naya potha"
  ],
  authors: [{ name: "NexiaCore" }],
  creator: "NexiaCore Inc.",
  metadataBase: new URL("https://nexiacore.shop"),
  openGraph: {
    type: "website",
    locale: "en_LK",
    url: "https://nexiacore.shop",
    title: "NexiaCore — Smart POS SaaS for Sri Lanka",
    description: "Cloud-based Point of Sale system for supermarkets, pharmacies, and retail shops in Sri Lanka. Free 14-day trial.",
    siteName: "NexiaCore",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexiaCore — Smart POS SaaS for Sri Lanka",
    description: "The enterprise-grade POS platform built for modern Sri Lankan retail.",
  },
  alternates: {
    canonical: "https://nexiacore.shop",
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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} relative antialiased bg-white text-slate-900`}>
        {/* Mount SmoothCursor here to apply global magnification */}
        <SmoothCursor />
        <SmoothScroll>
        {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
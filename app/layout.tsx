import type { Metadata } from "next";
import Analytics from "@/components/Analytics";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://geobase.online"),
  title: {
    template: "%s | GeoBase",
    default: "Generative Engine Optimization Software for AI Search Visibility",
  },
  description:
    "GeoBase is generative engine optimization and answer engine optimization software for brands that need AI citation tracking, citable-page diagnostics, competitor AI visibility, and AI search attribution.",
  keywords: [
    "generative engine optimization",
    "answer engine optimization",
    "AI search visibility",
    "AI citation tracking",
    "GEO software",
    "AEO tools",
  ],
  robots: { index: true, follow: true },
  icons: { icon: "/site-icon.svg" },
  openGraph: {
    title: "GeoBase Generative Engine Optimization Software",
    description:
      "Track how often AI answer engines cite your brand, compare competitors, and turn citable content gaps into revenue-focused improvements.",
    url: "https://geobase.online",
    siteName: "GeoBase",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GeoBase AI citation tracking dashboard",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GeoBase Generative Engine Optimization Software",
    description: "AI citation tracking, answer engine optimization diagnostics, competitor visibility, and AI search attribution.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: "https://geobase.online" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Analytics />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

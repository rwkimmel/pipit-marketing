import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const siteMetadata: Metadata = {
  title: "Pipit | Salon Software That Actually Makes Sense",
  description:
    "Simple, capable salon management software built by salon owners. Pipit is preparing for its first salons.",
  metadataBase: new URL(siteConfig.productionDomain),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pipit | Salon Software That Actually Makes Sense",
    description:
      "Simple, capable salon management software built by salon owners. Pipit is preparing for its first salons.",
    type: "website",
    siteName: "Pipit",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pipit | Salon Software That Actually Makes Sense",
    description:
      "Simple, capable salon management software built by salon owners. Pipit is preparing for its first salons.",
  },
  icons: {
    icon: [
      {
        url: "/brand/Pipit square app favicon logo.png",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/brand/Pipit square app favicon logo.png",
        type: "image/png",
      },
    ],
  },
};

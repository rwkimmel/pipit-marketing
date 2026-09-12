import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  title: "Pipit | Salon Software That Actually Makes Sense",
  description:
    "Simple, capable salon management software built by salon owners. Pipit is preparing for its first salons.",
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  openGraph: {
    title: "Pipit | Salon Software That Actually Makes Sense",
    description:
      "Simple, capable salon management software built by salon owners. Pipit is preparing for its first salons.",
    type: "website",
    siteName: "Pipit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pipit | Salon Software That Actually Makes Sense",
    description:
      "Simple, capable salon management software built by salon owners. Pipit is preparing for its first salons.",
  },
};

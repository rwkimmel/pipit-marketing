import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.productionDomain.replace(/\/$/, "");
  const lastModified = new Date();

  return [
    { path: "", priority: 1 },
    { path: "/privacy", priority: 0.4 },
    { path: "/contact", priority: 0.4 },
  ].map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}

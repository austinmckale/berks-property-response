import type { MetadataRoute } from "next";
import { cities } from "@/lib/cities";
import { services } from "@/lib/services";
import { SITE_URL } from "@/lib/siteConfig";

const staticPages = [
  "",
  "/how-it-works",
  "/local-partners",
  "/request-help",
  "/contact",
  "/disclosure",
  "/privacy-policy",
  "/terms",
  "/service-areas",
  "/property-repairs-berks-county-pa",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = staticPages.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceEntries = services
    .filter((s) => !s.noindex)
    .map((s) => ({
      url: `${SITE_URL}/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const cityEntries = cities.map((c) => ({
    url: `${SITE_URL}/service-areas/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...serviceEntries, ...cityEntries];
}

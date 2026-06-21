import type { MetadataRoute } from "next";
import { cities } from "@/lib/cities";
import { services } from "@/lib/services";
import {
  SITEMAP_FALLBACK_DATE,
  STATIC_SITEMAP_PATHS,
} from "@/lib/sitemapRoutes";
import { SITE_URL } from "@/lib/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_SITEMAP_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: SITEMAP_FALLBACK_DATE,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceEntries = services
    .filter((s) => !s.noindex)
    .map((s) => ({
      url: `${SITE_URL}/${s.slug}`,
      lastModified: s.updatedAt ? new Date(s.updatedAt) : SITEMAP_FALLBACK_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const cityEntries = cities.map((c) => ({
    url: `${SITE_URL}/service-areas/${c.slug}`,
    lastModified: c.updatedAt ? new Date(c.updatedAt) : SITEMAP_FALLBACK_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...serviceEntries, ...cityEntries];
}

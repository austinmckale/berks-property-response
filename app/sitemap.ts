import type { MetadataRoute } from "next";
import { cities } from "@/lib/cities";
import { getPublishedGuides } from "@/lib/guides";
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

  const publishedGuides = getPublishedGuides().filter((g) => g.index);
  const guideEntries = publishedGuides.map((g) => ({
    url: `${SITE_URL}/guides/${g.slug}`,
    lastModified: new Date(g.updatedDate),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  const guidesIndex =
    publishedGuides.length > 0
      ? [
          {
            url: `${SITE_URL}/guides`,
            lastModified: new Date(
              publishedGuides.reduce((latest, g) =>
                g.updatedDate > latest ? g.updatedDate : latest,
              publishedGuides[0]!.updatedDate)
            ),
            changeFrequency: "weekly" as const,
            priority: 0.7,
          },
        ]
      : [];

  return [...staticEntries, ...serviceEntries, ...cityEntries, ...guidesIndex, ...guideEntries];
}

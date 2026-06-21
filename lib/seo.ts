import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./siteConfig";

export const DEFAULT_OG_IMAGE = "/opengraph-image";

export interface PageSEO {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  ogImage?: string;
}

export function buildMetadata(seo: PageSEO): Metadata {
  const canonical = `${SITE_URL}${seo.path}`;
  const ogImage = seo.ogImage ?? DEFAULT_OG_IMAGE;
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [ogImage],
    },
    robots: seo.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function homeMetadata(): Metadata {
  return buildMetadata({
    title: "Drain, Plumbing & Water Damage Help",
    description:
      "Sewer backup, plumbing leak, or water damage in Berks County? Call now or send a quick request for local help.",
    path: "/",
  });
}

export function breadcrumbItems(
  items: { name: string; path: string }[]
): { name: string; path: string }[] {
  return [{ name: "Home", path: "/" }, ...items];
}

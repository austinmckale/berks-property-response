import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./siteConfig";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-home-v2`;

export interface PageSEO {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  ogImage?: string;
  socialTitle?: string;
}

export function buildMetadata(seo: PageSEO): Metadata {
  const canonical = `${SITE_URL}${seo.path}`;
  const ogImage = seo.ogImage
    ? new URL(seo.ogImage, SITE_URL).toString()
    : DEFAULT_OG_IMAGE;
  const socialTitle = seo.socialTitle ?? seo.title;
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical },
    openGraph: {
      title: socialTitle,
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
      title: socialTitle,
      description: seo.description,
      images: [ogImage],
    },
    robots: seo.noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}

export function homeMetadata(): Metadata {
  return buildMetadata({
    title: "Drain, Plumbing & Water Damage Help in Berks County, PA",
    description:
      "Local help routing drain backups, fixture leaks, and water-damage repair across Berks County. Choose the closest problem and send details for coordination with the appropriate provider.",
    path: "/",
    socialTitle:
      "Drain, Plumbing & Water Damage Help in Berks County, PA | Berks Property Response",
  });
}

export function breadcrumbItems(
  items: { name: string; path: string }[]
): { name: string; path: string }[] {
  return [{ name: "Home", path: "/" }, ...items];
}

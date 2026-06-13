import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, TAGLINE } from "./siteConfig";

export interface PageSEO {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  ogImage?: string;
}

export function buildMetadata(seo: PageSEO): Metadata {
  const canonical = `${SITE_URL}${seo.path}`;
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
      images: seo.ogImage ? [{ url: seo.ogImage }] : undefined,
    },
    robots: seo.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function homeMetadata(): Metadata {
  return buildMetadata({
    title: `${SITE_NAME} | ${TAGLINE}`,
    description:
      "Need plumbing, drain, water damage, or repair help in Berks County? Tell us what happened and we will connect you with the right local help.",
    path: "/",
  });
}

export function breadcrumbItems(
  items: { name: string; path: string }[]
): { name: string; path: string }[] {
  return [{ name: "Home", path: "/" }, ...items];
}

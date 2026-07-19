export type GuideCategory =
  | "drain-and-sewer"
  | "plumbing"
  | "after-a-leak"
  | "property-decisions";

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface GuideMetadata {
  slug: string;
  title: string;
  metaDescription: string;
  summary: string;
  author: string;
  reviewer: string;
  publishedDate: string;
  updatedDate: string;
  category: GuideCategory;
  relatedServices: string[];
  relatedCities: string[];
  heroImage: string;
  sections: GuideSection[];
  index: boolean;
  status: "draft" | "published";
}

/**
 * Add a guide only after its complete article body, editorial review, dates,
 * image, and internal links are ready. Draft metadata is never exposed.
 */
export const guides: GuideMetadata[] = [];

export const FIRST_PLANNED_GUIDE_TITLE =
  "One Clogged Drain vs. a Main Sewer-Line Clog";

export function getPublishedGuides(): GuideMetadata[] {
  return guides.filter((guide) => guide.status === "published");
}

export function getGuideBySlug(slug: string): GuideMetadata | undefined {
  return getPublishedGuides().find((guide) => guide.slug === slug);
}

import { SITE_NAME, SITE_URL } from "./siteConfig";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Independent local referral and intake website for plumbing, drains, water damage, and property repairs in Berks County, PA.",
  };
}

export function webPageSchema(params: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: params.title,
    description: params.description,
    url: `${SITE_URL}${params.path}`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function serviceSchema(params: {
  name: string;
  description: string;
  path: string;
  areaServed?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: params.name,
    description: params.description,
    url: `${SITE_URL}${params.path}`,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      description: "Referral and intake service—not the direct service provider.",
    },
    areaServed: params.areaServed ?? "Berks County, PA",
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  if (faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function combineSchemas(
  ...schemas: (Record<string, unknown> | null)[]
): Record<string, unknown>[] {
  return schemas.filter(Boolean) as Record<string, unknown>[];
}

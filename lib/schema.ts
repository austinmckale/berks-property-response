import { SITE_NAME, SITE_URL } from "./siteConfig";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

function absoluteUrl(pathOrUrl: string): string {
  return new URL(pathOrUrl, SITE_URL).toString();
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Local property-response coordination for drain, plumbing, and water-damage problems in Berks County, Pennsylvania.",
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
    "@id": `${SITE_URL}${params.path}#webpage`,
    name: params.title,
    description: params.description,
    url: `${SITE_URL}${params.path}`,
    isPartOf: { "@id": WEBSITE_ID },
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
  serviceName: string;
  serviceDescription: string;
  serviceUrl: string;
  areaServed?: string;
  providerName: string;
  providerUrl?: string;
  providerTelephone?: string;
  coordinatorOrganization?: boolean;
}) {
  const provider: Record<string, string> = {
    "@type": "Organization",
    name: params.providerName,
  };
  if (params.providerUrl) provider.url = absoluteUrl(params.providerUrl);
  if (params.providerTelephone) provider.telephone = params.providerTelephone;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(params.serviceUrl)}#service`,
    name: params.serviceName,
    description: params.serviceDescription,
    url: absoluteUrl(params.serviceUrl),
    provider,
    areaServed: {
      "@type": "AdministrativeArea",
      name: params.areaServed ?? "Berks County, PA",
    },
    ...(params.coordinatorOrganization
      ? { broker: { "@id": ORGANIZATION_ID } }
      : {}),
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

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Local help connecting Berks County homeowners with plumbing, drain, water damage, and property repair specialists.",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function articleSchema(params: {
  headline: string;
  description: string;
  path: string;
  author: string;
  reviewer?: string;
  publishedDate: string;
  updatedDate: string;
  heroImage?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}${params.path}#article`,
    headline: params.headline,
    description: params.description,
    mainEntityOfPage: { "@id": `${SITE_URL}${params.path}#webpage` },
    author: { "@type": "Person", name: params.author },
    ...(params.reviewer
      ? { reviewedBy: { "@type": "Person", name: params.reviewer } }
      : {}),
    datePublished: params.publishedDate,
    dateModified: params.updatedDate,
    ...(params.heroImage
      ? { image: absoluteUrl(params.heroImage) }
      : {}),
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function combineSchemas(
  ...schemas: (Record<string, unknown> | null)[]
): Record<string, unknown>[] {
  return schemas.filter(Boolean) as Record<string, unknown>[];
}

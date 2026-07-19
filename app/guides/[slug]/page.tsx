import { notFound } from "next/navigation";
import {
  GuidePageTemplate,
  generateGuideMetadata,
} from "@/components/GuidePageTemplate";
import { getGuideBySlug, getPublishedGuides } from "@/lib/guides";

export function generateStaticParams() {
  return getPublishedGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return generateGuideMetadata(guide);
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();
  return <GuidePageTemplate guide={guide} />;
}

import { notFound } from "next/navigation";
import {
  ServicePageTemplate,
  generateServiceMetadata,
} from "@/components/ServicePageTemplate";
import { getServiceBySlug } from "@/lib/services";

const SLUG = "water-damage-repair-after-leak-berks-county-pa";
const service = getServiceBySlug(SLUG);
if (!service) throw new Error(`Service not found: ${SLUG}`);

export const metadata = generateServiceMetadata(service);

export default function Page() {
  if (!service) notFound();
  return <ServicePageTemplate service={service} />;
}

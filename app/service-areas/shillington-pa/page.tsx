import { notFound } from "next/navigation";
import { CityPageTemplate, generateCityMetadata } from "@/components/CityPageTemplate";
import { getCityBySlug } from "@/lib/cities";

const SLUG = "shillington-pa";
const city = getCityBySlug(SLUG);
if (!city) throw new Error(`City not found: ${SLUG}`);

export const metadata = generateCityMetadata(city);

export default function Page() {
  if (!city) notFound();
  return <CityPageTemplate city={city} />;
}

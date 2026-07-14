"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { CityPage } from "@/lib/cities";
import { FormSymptomPicker } from "@/components/FormSymptomPicker";
import { LeadForm } from "@/components/LeadForm";
import { isProblemTypeId } from "@/lib/intakeLinks";
import type { ProblemTypeId } from "@/lib/problemTypes";

const citySymptoms = [
  { label: "Sewer backup or multiple drains", problem: "drain-emergency" as const },
  { label: "Slow or clogged drain", problem: "drain-clog" as const },
  { label: "Leak at one fixture", problem: "plumbing-leak" as const },
  { label: "Damage after a leak or backup", problem: "water-damage" as const },
  { label: "Storm, fire, mold, or serious damage", problem: "major-property" as const },
];

export function CityIntakeSection({ city }: { city: CityPage }) {
  const searchParams = useSearchParams();
  const problemParam = searchParams.get("problem");
  const problemFromUrl =
    problemParam && isProblemTypeId(problemParam) ? problemParam : undefined;
  const [selectedProblem, setSelectedProblem] = useState<ProblemTypeId | undefined>();

  useEffect(() => {
    const frame = requestAnimationFrame(() => setSelectedProblem(problemFromUrl));
    return () => cancelAnimationFrame(frame);
  }, [problemFromUrl]);

  return (
    <>
      <div className="mt-8">
        <FormSymptomPicker title="Choose the closest problem" options={citySymptoms} />
      </div>
      {selectedProblem && (
        <div id="get-help" className="mt-10 scroll-mt-24 border-t border-stone-200 pt-8">
          <h2 className="text-lg font-semibold text-stone-900">Send a request</h2>
          <div className="mt-4">
            <Suspense fallback={<div className="h-80 animate-pulse rounded-2xl bg-stone-100" />}>
              <LeadForm
                pageType="city"
                serviceCategory="general"
                defaultService={`Help in ${city.name}, PA`}
                defaultCity={city.name}
                initialProblemType={selectedProblem}
              />
            </Suspense>
          </div>
        </div>
      )}
    </>
  );
}

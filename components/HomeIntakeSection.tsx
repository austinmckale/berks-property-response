"use client";

import { Suspense, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LeadForm } from "@/components/LeadForm";
import { TriageCards } from "@/components/TriageCards";
import { trackEvent } from "@/lib/analytics";
import { isProblemTypeId } from "@/lib/intakeLinks";
import type { ProblemTypeId } from "@/lib/problemTypes";

/**
 * Homepage intake: problem cards + form in one #get-help section.
 * Choosing a category reveals contact fields in-place (no scroll-backward dead end).
 */
export function HomeIntakeSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const problemParam = searchParams.get("problem");
  const selectedProblem =
    problemParam && isProblemTypeId(problemParam) ? problemParam : undefined;

  const onSelect = useCallback(
    (id: ProblemTypeId) => {
      trackEvent("select_problem_category", {
        problem_type: id,
        page_type: "home",
      });
      const params = new URLSearchParams(searchParams.toString());
      params.set("problem", id);
      router.replace(`/?${params.toString()}#get-help`, { scroll: false });
      if (typeof window !== "undefined") {
        const prefersReduced =
          window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
        requestAnimationFrame(() => {
          document.getElementById("intake-fields")?.scrollIntoView({
            behavior: prefersReduced ? "auto" : "smooth",
            block: "nearest",
          });
        });
      }
    },
    [router, searchParams]
  );

  const onClear = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("problem");
    const qs = params.toString();
    router.replace(qs ? `/?${qs}#get-help` : "/#get-help", { scroll: false });
  }, [router, searchParams]);

  return (
    <section
      id="get-help"
      className="section-pad scroll-mt-6 border-y border-stone-200 bg-brand-subtle px-4"
    >
      <div className="page-container-wide md:max-w-6xl">
        <p className="eyebrow text-center md:text-left">Request help</p>
        <h2 className="font-display mt-2 text-center text-2xl font-semibold tracking-tight text-stone-900 md:text-left md:text-3xl">
          Tell us what&apos;s going on
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-stone-600 md:mx-0 md:text-left md:text-base">
          Pick the closest match, then send a short request — or call if water or sewage is active
          now.
        </p>

        <div className="mt-6">
          <TriageCards
            selected={selectedProblem}
            onSelect={onSelect}
            heading={null}
          />
        </div>

        {selectedProblem && (
          <div id="intake-fields" className="mx-auto mt-6 max-w-xl scroll-mt-24">
            <Suspense fallback={<div className="h-72 animate-pulse rounded-2xl bg-stone-100" />}>
              <LeadForm
                key={selectedProblem}
                pageType="home"
                initialProblemType={selectedProblem}
                showCategoryChange
                onChangeCategory={onClear}
              />
            </Suspense>
          </div>
        )}
      </div>
    </section>
  );
}

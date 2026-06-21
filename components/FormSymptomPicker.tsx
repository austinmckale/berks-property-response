"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ProblemTypeId } from "@/lib/problemTypes";
import { getHelpHref } from "@/lib/intakeLinks";

export interface FormSymptomOption {
  label: string;
  problem: ProblemTypeId;
}

interface FormSymptomPickerProps {
  title?: string;
  options: FormSymptomOption[];
}

/** Symptom taps that prefill the inline form — no detour through SEO pages */
export function FormSymptomPicker({
  title = "What's going on?",
  options,
}: FormSymptomPickerProps) {
  const pathname = usePathname();

  return (
    <div>
      <h2 className="text-lg font-semibold text-stone-900">{title}</h2>
      <ul className="mt-3 space-y-2">
        {options.map((option) => (
          <li key={option.label}>
            <Link
              href={getHelpHref(pathname, option.problem)}
              data-analytics-event="click_symptom"
              data-analytics-source="form_symptom_picker"
              className="btn-touch block rounded-xl border-2 border-stone-900 bg-white px-4 py-4 text-center text-base font-semibold text-stone-900 active:bg-stone-50"
            >
              {option.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

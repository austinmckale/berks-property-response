import type { urgencyLevels } from "./formSchema";

export type UrgencyLevel = (typeof urgencyLevels)[number];
export type WaterSewageAnswer = "yes" | "no" | "unknown";

/** Category provides a default; active water/sewage can elevate to emergency. */
export function resolveUrgency(params: {
  categoryDefault: UrgencyLevel;
  waterOrSewagePresent?: WaterSewageAnswer | "" | null;
}): UrgencyLevel {
  if (params.waterOrSewagePresent === "yes") return "emergency";
  return params.categoryDefault;
}

/** Success-state / UI: treat explicit active answer or emergency urgency as urgent. */
export function isActiveProblem(params: {
  waterOrSewagePresent?: string | null;
  urgency?: string | null;
}): boolean {
  return (
    params.waterOrSewagePresent === "yes" || params.urgency === "emergency"
  );
}

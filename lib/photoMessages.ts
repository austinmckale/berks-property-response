import { getProblemType, type ProblemTypeId } from "@/lib/problemTypes";

export const STICKY_PHOTO_MESSAGE =
  "Hi Berks Property Response — I need help with a property issue. I'm sending photos now.";

export function getFormPhotoMessage(problemType?: ProblemTypeId): string {
  const problemLabel = problemType ? getProblemType(problemType).title : "a property issue";
  return `Hi Berks Property Response — I need help with ${problemLabel}. I’m sending photos now.`;
}

export function getCompletedFormPhotoMessage({
  problemType,
  name,
  city,
  problemDescription,
}: {
  problemType?: ProblemTypeId;
  name?: string;
  city?: string;
  problemDescription?: string;
}): string {
  const problemLabel = problemType ? getProblemType(problemType).title : "a property issue";
  const details = [
    `Hi Berks Property Response - I need help with ${problemLabel}.`,
    name?.trim() ? `Name: ${name.trim()}` : "",
    city?.trim() ? `City: ${city.trim()}` : "",
    problemDescription?.trim() ? `What is happening: ${problemDescription.trim()}` : "",
    "I can attach photos here.",
  ].filter(Boolean);

  return details.join("\n");
}

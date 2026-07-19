import { getProblemType, type ProblemTypeId } from "@/lib/problemTypes";

export const STICKY_PHOTO_MESSAGE =
  "Hi Berks Property Response — I need help with a property issue. I'm sending photos now.";

export function getFormPhotoMessage(problemType?: ProblemTypeId): string {
  const problemLabel = problemType ? getProblemType(problemType).title : "a property issue";
  return `Hi Berks Property Response — I need help with ${problemLabel}. I’m sending photos now.`;
}

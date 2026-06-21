/** Strip internal routing / provider names from user-facing FAQ copy */
export function forConsumerDisplay(text: string): string {
  return text
    .replace(/\broutes? to Apex Drain Services\b/gi, "we connect you with local drain help")
    .replace(/\broute to Apex Drain Services\b/gi, "connect you with local drain help")
    .replace(/\broutes? to Ridge Line Plumbing\b/gi, "we connect you with a local plumber")
    .replace(/\broute to Ridge Line Plumbing\b/gi, "connect you with a local plumber")
    .replace(/\bRidge Line Plumbing\b/g, "a local plumber")
    .replace(/\broutes? to RHI Pros\b/gi, "we connect you with local repair help")
    .replace(/\broute to RHI Pros\b/gi, "connect you with local repair help")
    .replace(/\bRHI Pros\b/g, "local repair specialists")
    .replace(/\broutes? to Apex\b/gi, "we connect you with local drain help")
    .replace(/\broute to Apex\b/gi, "connect you with local drain help");
}

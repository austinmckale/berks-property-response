type AnalyticsParams = Record<string, string | number | boolean>;

/** Public, non-PII event names used throughout the conversion funnel. */
export const ANALYTICS_EVENT_NAMES = [
  "phone_click",
  "text_click",
  "click_request_help",
  "select_problem_category",
  "form_started",
  "form_submitted",
  "form_error",
  "generate_lead",
] as const;

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: AnalyticsParams) => void;
  }
}

export function trackEvent(eventName: string, params?: AnalyticsParams) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params);
}

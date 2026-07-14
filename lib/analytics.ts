export type AnalyticsParams = Record<string, string | number | boolean>;

/** Public, non-PII event names used throughout the conversion funnel. */
export const ANALYTICS_EVENT_NAMES = [
  "phone_click",
  "text_click",
  "click_request_help",
  "partner_click",
  "select_problem_category",
  "click_symptom",
  "form_started",
  "form_submitted",
  "form_error",
  "generate_lead",
] as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENT_NAMES)[number];

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: AnalyticsParams) => void;
  }
}

export function trackEvent(eventName: AnalyticsEventName, params?: AnalyticsParams) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params);
}

"use client";

import { useEffect } from "react";
import {
  ANALYTICS_EVENT_NAMES,
  trackEvent,
  type AnalyticsEventName,
  type AnalyticsParams,
} from "@/lib/analytics";

function linkLocation(link: HTMLAnchorElement): string {
  return (
    link.dataset.analyticsSource ||
    link.getAttribute("aria-label") ||
    link.textContent?.trim().replace(/\s+/g, " ").slice(0, 80) ||
    "unknown"
  );
}

export function AnalyticsListener() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const tracked = target.closest("[data-analytics-event]");
      const link = target.closest("a[href]");
      const href = link instanceof HTMLAnchorElement ? link.href : "";
      const declaredEvent = tracked instanceof HTMLElement ? tracked.dataset.analyticsEvent : undefined;
      const eventName =
        declaredEvent && ANALYTICS_EVENT_NAMES.includes(declaredEvent as AnalyticsEventName)
          ? (declaredEvent as AnalyticsEventName)
          : href.startsWith("tel:")
            ? "phone_click"
            : href.startsWith("sms:")
              ? "text_click"
              : undefined;

      if (!eventName) return;

      const params: AnalyticsParams = {};
      if (tracked instanceof HTMLElement && tracked.dataset.analyticsSource) {
        params.source = tracked.dataset.analyticsSource;
      }
      if (tracked instanceof HTMLElement && tracked.dataset.analyticsProvider) {
        params.provider = tracked.dataset.analyticsProvider;
      }
      if (tracked instanceof HTMLElement && tracked.dataset.analyticsCtaVariant) {
        params.cta_variant = tracked.dataset.analyticsCtaVariant;
      }
      if (eventName === "phone_click" || eventName === "text_click") {
        params.link_location =
          link instanceof HTMLAnchorElement ? linkLocation(link) : "unknown";
        params.page_path = window.location.pathname;
      }
      if (eventName === "partner_click") {
        params.partner_name =
          tracked instanceof HTMLElement
            ? tracked.dataset.analyticsPartnerName || tracked.dataset.analyticsProvider || "unknown"
            : "unknown";
        params.page_path = window.location.pathname;
      }

      trackEvent(eventName, params);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}

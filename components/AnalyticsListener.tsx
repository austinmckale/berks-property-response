"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function AnalyticsListener() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const tracked = target.closest("[data-analytics-event]");
      if (!(tracked instanceof HTMLElement)) return;

      const eventName = tracked.dataset.analyticsEvent;
      if (!eventName) return;

      const params: Record<string, string> = {};
      if (tracked.dataset.analyticsSource) {
        params.source = tracked.dataset.analyticsSource;
      }
      if (tracked.dataset.analyticsProvider) {
        params.provider = tracked.dataset.analyticsProvider;
      }

      trackEvent(eventName, params);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}

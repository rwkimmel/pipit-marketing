"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef } from "react";
import {
  gaMeasurementId,
  mapPipitEventToGa4,
  type AnalyticsEventName,
  type AnalyticsPayload,
} from "@/lib/analytics";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (
      command: "config" | "event" | "js",
      targetIdOrDate: string | Date,
      config?: AnalyticsPayload,
    ) => void;
  }
}

type PipitAnalyticsEvent = CustomEvent<{
  eventName: AnalyticsEventName;
  payload?: AnalyticsPayload;
}>;

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPageViewRef = useRef<string | null>(null);

  useEffect(() => {
    if (!window.gtag) {
      return;
    }

    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    if (lastPageViewRef.current === pagePath) {
      return;
    }

    lastPageViewRef.current = pagePath;
    window.gtag("event", "page_view", {
      page_location: window.location.href,
      page_path: pagePath,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  useEffect(() => {
    function handlePipitAnalyticsEvent(event: Event) {
      if (!window.gtag || !isPipitAnalyticsEvent(event)) {
        return;
      }

      const { name, parameters } = mapPipitEventToGa4(
        event.detail.eventName,
        event.detail.payload,
      );

      window.gtag("event", name, parameters);
    }

    window.addEventListener("pipit:analytics", handlePipitAnalyticsEvent);

    return () => {
      window.removeEventListener("pipit:analytics", handlePipitAnalyticsEvent);
    };
  }, []);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
        strategy="afterInteractive"
      />
      <Script id="pipit-ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${gaMeasurementId}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}

function isPipitAnalyticsEvent(event: Event): event is PipitAnalyticsEvent {
  const detail = (event as CustomEvent<unknown>).detail;

  return (
    typeof detail === "object" &&
    detail !== null &&
    "eventName" in detail &&
    typeof (detail as { eventName?: unknown }).eventName === "string"
  );
}

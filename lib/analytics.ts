export type AnalyticsEventName =
  | "hero_get_early_access_click"
  | "hero_secondary_cta_click"
  | "nav_get_early_access_click"
  | "pricing_get_early_access_click"
  | "qualification_get_early_access_click"
  | "final_get_early_access_click"
  | "early_access_form_started"
  | "early_access_form_submit_attempted"
  | "early_access_form_submit_success"
  | "early_access_form_validation_error"
  | "faq_opened";

export type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

export function trackEvent(eventName: AnalyticsEventName, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent("pipit:analytics", {
      detail: {
        eventName,
        payload,
      },
    }),
  );

  if (process.env.NODE_ENV === "development") {
    console.info("[analytics stub]", eventName, payload);
  }
}

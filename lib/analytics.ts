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
  | "early_access_form_submit_failed"
  | "faq_opened";

export type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

export const gaMeasurementId = "G-PQW8PDN5YN";

export type Ga4Event = {
  name: string;
  parameters: AnalyticsPayload;
};

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

export function mapPipitEventToGa4(
  eventName: AnalyticsEventName,
  payload: AnalyticsPayload = {},
): Ga4Event {
  if (isEarlyAccessCtaEvent(eventName)) {
    return {
      name: "select_content",
      parameters: {
        content_type: "early_access_cta",
        content_id: ctaLocations[eventName],
        ...payload,
      },
    };
  }

  switch (eventName) {
    case "faq_opened":
      return {
        name: "faq_open",
        parameters: payload,
      };
    case "early_access_form_started":
      return {
        name: "form_start",
        parameters: {
          form_id: "early_access",
          ...payload,
        },
      };
    case "early_access_form_submit_attempted":
      return {
        name: "form_submit_attempt",
        parameters: {
          form_id: "early_access",
          ...payload,
        },
      };
    case "early_access_form_validation_error":
      return {
        name: "form_validation_error",
        parameters: {
          form_id: "early_access",
          ...payload,
        },
      };
    case "early_access_form_submit_failed":
      return {
        name: "form_submit_error",
        parameters: {
          form_id: "early_access",
          ...payload,
        },
      };
    case "early_access_form_submit_success":
      return {
        name: "generate_lead",
        parameters: {
          form_id: "early_access",
          ...payload,
        },
      };
  }
}

const ctaLocations = {
  hero_get_early_access_click: "hero",
  hero_secondary_cta_click: "hero_secondary",
  nav_get_early_access_click: "nav",
  pricing_get_early_access_click: "pricing",
  qualification_get_early_access_click: "qualification",
  final_get_early_access_click: "final",
} satisfies Partial<Record<AnalyticsEventName, string>>;

function isEarlyAccessCtaEvent(
  eventName: AnalyticsEventName,
): eventName is keyof typeof ctaLocations {
  return eventName in ctaLocations;
}

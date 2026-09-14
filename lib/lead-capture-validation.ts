import { siteContent } from "@/content/site";

export const LEAD_STATUS_VALUES = [
  "new",
  "research_candidate",
  "interviewed",
  "design_partner_candidate",
  "founding_salon",
  "customer",
  "not_a_fit",
] as const;

export type LeadStatus = (typeof LEAD_STATUS_VALUES)[number];

export type LeadCaptureInput = {
  firstName: unknown;
  lastName: unknown;
  email: unknown;
  businessName: unknown;
  businessType: unknown;
  locations: unknown;
  providers: unknown;
  currentSoftware: unknown;
  wish?: unknown;
  spend: unknown;
  testingInterest?: unknown;
  consentEmailUpdates?: unknown;
  pageUrl?: unknown;
  referrer?: unknown;
  utmSource?: unknown;
  utmMedium?: unknown;
  utmCampaign?: unknown;
  utmContent?: unknown;
  utmTerm?: unknown;
  website?: unknown;
};

export type NormalizedLeadCapture = {
  first_name: string;
  last_name: string;
  email: string;
  business_name: string;
  business_type: string;
  location_count_band: string;
  provider_count_band: string;
  current_software: string;
  monthly_software_spend_band: string;
  software_frustration: string | null;
  interested_in_testing: boolean;
  consent_email_updates: boolean;
  consent_timestamp: string | null;
  landing_page_version: "v2.1";
  page_url: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  submission_source: "pipit_marketing_early_access_form";
  spam_check: {
    honeypot_clear: boolean;
  };
};

export type LeadCaptureValidationResult =
  | {
      ok: true;
      value: NormalizedLeadCapture;
    }
  | {
      ok: false;
      errors: Record<string, string>;
      spam?: true;
    };

const allowedKeys = new Set<keyof LeadCaptureInput>([
  "firstName",
  "lastName",
  "email",
  "businessName",
  "businessType",
  "locations",
  "providers",
  "currentSoftware",
  "wish",
  "spend",
  "testingInterest",
  "consentEmailUpdates",
  "pageUrl",
  "referrer",
  "utmSource",
  "utmMedium",
  "utmCampaign",
  "utmContent",
  "utmTerm",
  "website",
]);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const htmlPattern = /<[^>]*>/;

export function validateLeadCaptureInput(input: unknown): LeadCaptureValidationResult {
  if (!isRecord(input)) {
    return {
      ok: false,
      errors: {
        form: "Please check the form and try again.",
      },
    };
  }

  const unexpectedKeys = Object.keys(input).filter(
    (key) => !allowedKeys.has(key as keyof LeadCaptureInput),
  );

  if (unexpectedKeys.length > 0) {
    return {
      ok: false,
      errors: {
        form: "Please check the form and try again.",
      },
    };
  }

  const honeypot = normalizeOptionalString(input.website, 200);
  if (honeypot) {
    return {
      ok: false,
      errors: {
        form: "We could not accept that submission.",
      },
      spam: true,
    };
  }

  const errors: Record<string, string> = {};
  const firstName = requireString(input.firstName, "firstName", "First name", errors, 80);
  const lastName = requireString(input.lastName, "lastName", "Last name", errors, 80);
  const email = normalizeEmail(input.email, errors);
  const businessName = requireString(
    input.businessName,
    "businessName",
    "Salon / Business name",
    errors,
    140,
  );
  const businessType = requireEnum(
    input.businessType,
    "businessType",
    "Business type",
    siteContent.earlyAccess.businessTypes,
    errors,
  );
  const locations = requireEnum(
    input.locations,
    "locations",
    "Number of locations",
    siteContent.earlyAccess.locations,
    errors,
  );
  const providers = requireEnum(
    input.providers,
    "providers",
    "Number of service providers",
    siteContent.earlyAccess.providers,
    errors,
  );
  const currentSoftware = requireEnum(
    input.currentSoftware,
    "currentSoftware",
    "Current salon software",
    siteContent.earlyAccess.software,
    errors,
  );
  const spend = requireEnum(
    input.spend,
    "spend",
    "Approximate monthly software spend",
    siteContent.earlyAccess.spend,
    errors,
  );
  const wish = normalizeOptionalString(input.wish, 2000);
  const consentEmailUpdates = normalizeBoolean(input.consentEmailUpdates);

  if (wish && htmlPattern.test(wish)) {
    errors.wish = "Please remove HTML or markup from this field.";
  }

  if (!consentEmailUpdates) {
    errors.consentEmailUpdates = "Please confirm email updates so we can contact you about Pipit early access.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      errors,
    };
  }

  return {
    ok: true,
    value: {
      first_name: firstName,
      last_name: lastName,
      email,
      business_name: businessName,
      business_type: businessType,
      location_count_band: locations,
      provider_count_band: providers,
      current_software: currentSoftware,
      monthly_software_spend_band: spend,
      software_frustration: wish || null,
      interested_in_testing: normalizeBoolean(input.testingInterest),
      consent_email_updates: consentEmailUpdates,
      consent_timestamp: new Date().toISOString(),
      landing_page_version: "v2.1",
      page_url: normalizeUrlString(input.pageUrl),
      referrer: normalizeUrlString(input.referrer),
      utm_source: normalizeOptionalString(input.utmSource, 120),
      utm_medium: normalizeOptionalString(input.utmMedium, 120),
      utm_campaign: normalizeOptionalString(input.utmCampaign, 160),
      utm_content: normalizeOptionalString(input.utmContent, 160),
      utm_term: normalizeOptionalString(input.utmTerm, 160),
      submission_source: "pipit_marketing_early_access_form",
      spam_check: {
        honeypot_clear: true,
      },
    },
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requireString(
  value: unknown,
  key: string,
  label: string,
  errors: Record<string, string>,
  maxLength: number,
) {
  const normalized = normalizeOptionalString(value, maxLength);

  if (!normalized) {
    errors[key] = `${label} is required.`;
  }

  return normalized;
}

function requireEnum<T extends readonly string[]>(
  value: unknown,
  key: string,
  label: string,
  allowedValues: T,
  errors: Record<string, string>,
): T[number] {
  const normalized = normalizeOptionalString(value, 120);

  if (!normalized) {
    errors[key] = `${label} is required.`;
    return "" as T[number];
  }

  if (!allowedValues.includes(normalized)) {
    errors[key] = `${label} must use an approved option.`;
    return "" as T[number];
  }

  return normalized;
}

function normalizeEmail(value: unknown, errors: Record<string, string>) {
  const email = normalizeOptionalString(value, 254).toLowerCase();

  if (!email) {
    errors.email = "Email is required.";
    return "";
  }

  if (!emailPattern.test(email)) {
    errors.email = "Enter a valid email address.";
    return "";
  }

  return email;
}

function normalizeOptionalString(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function normalizeUrlString(value: unknown) {
  const normalized = normalizeOptionalString(value, 500);
  if (!normalized) {
    return null;
  }

  try {
    const url = new URL(normalized);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }
    return url.toString();
  } catch {
    return null;
  }
}

function normalizeBoolean(value: unknown) {
  return value === true;
}

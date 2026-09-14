"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { siteContent } from "@/content/site";
import type { EarlyAccessSubmission } from "@/lib/lead-capture";
import { submitEarlyAccessLead } from "@/lib/lead-capture";
import { trackEvent } from "@/lib/analytics";

type FormState = EarlyAccessSubmission;
type Errors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  businessName: "",
  businessType: "",
  locations: "",
  providers: "",
  currentSoftware: "",
  wish: "",
  spend: "",
  testingInterest: false,
  consentEmailUpdates: false,
  website: "",
};

const requiredFields: Array<keyof FormState> = [
  "firstName",
  "lastName",
  "email",
  "businessName",
  "businessType",
  "locations",
  "providers",
  "currentSoftware",
  "spend",
  "consentEmailUpdates",
];

const attributionStorageKey = "pipit_attribution_v1";

export function EarlyAccessForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [hasStarted, setHasStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [failureMessage, setFailureMessage] = useState<string | null>(null);
  const attributionRef = useRef<Partial<FormState>>({});

  const fieldIds = useMemo(
    () => ({
      firstName: "first-name",
      lastName: "last-name",
      email: "email",
      businessName: "business-name",
      businessType: "business-type",
      locations: "locations",
      providers: "providers",
      currentSoftware: "current-software",
      wish: "wish",
      spend: "spend",
      consentEmailUpdates: "consent-email-updates",
      website: "website",
    }),
    [],
  );

  useEffect(() => {
    attributionRef.current = getAttribution();
  }, []);

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    if (!hasStarted) {
      trackEvent("early_access_form_started");
      setHasStarted(true);
    }

    setForm((current) => ({
      ...current,
      [field]: value,
    }));
    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccessMessage(null);
    setFailureMessage(null);
    trackEvent("early_access_form_submit_attempted");

    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      trackEvent("early_access_form_validation_error", {
        fields: Object.keys(nextErrors).join(","),
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitEarlyAccessLead({
        ...form,
        ...attributionRef.current,
      });

      if (!result.persisted) {
        setErrors((current) => ({
          ...current,
          ...result.errors,
        }));
        setFailureMessage(result.message);
        trackEvent("early_access_form_submit_failed", {
          reason: result.errors ? "server_validation" : "service_error",
        });
        return;
      }

      trackEvent("early_access_form_submit_success", {
        persisted: true,
      });
      setSuccessMessage(siteContent.earlyAccess.successBody);
      setForm(initialState);
      setHasStarted(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="early-access-form" noValidate onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="field visually-hidden" aria-hidden="true">
          <label htmlFor={fieldIds.website}>Website</label>
          <input
            autoComplete="off"
            id={fieldIds.website}
            onChange={(event) => updateField("website", event.target.value)}
            tabIndex={-1}
            type="text"
            value={form.website}
          />
        </div>
        <TextField
          error={errors.firstName}
          id={fieldIds.firstName}
          label="First Name"
          onChange={(value) => updateField("firstName", value)}
          required
          value={form.firstName}
        />
        <TextField
          error={errors.lastName}
          id={fieldIds.lastName}
          label="Last Name"
          onChange={(value) => updateField("lastName", value)}
          required
          value={form.lastName}
        />
        <TextField
          error={errors.email}
          id={fieldIds.email}
          label="Email"
          onChange={(value) => updateField("email", value)}
          required
          type="email"
          value={form.email}
        />
        <TextField
          error={errors.businessName}
          id={fieldIds.businessName}
          label="Salon / Business Name"
          onChange={(value) => updateField("businessName", value)}
          required
          value={form.businessName}
        />
        <SelectField
          error={errors.businessType}
          id={fieldIds.businessType}
          label="Business Type"
          onChange={(value) => updateField("businessType", value)}
          options={siteContent.earlyAccess.businessTypes}
          required
          value={form.businessType}
        />
        <SelectField
          error={errors.locations}
          id={fieldIds.locations}
          label="Number of Locations"
          onChange={(value) => updateField("locations", value)}
          options={siteContent.earlyAccess.locations}
          required
          value={form.locations}
        />
        <SelectField
          error={errors.providers}
          id={fieldIds.providers}
          label="Number of Service Providers"
          onChange={(value) => updateField("providers", value)}
          options={siteContent.earlyAccess.providers}
          required
          value={form.providers}
        />
        <SelectField
          error={errors.currentSoftware}
          id={fieldIds.currentSoftware}
          label="Current Salon Software"
          onChange={(value) => updateField("currentSoftware", value)}
          options={siteContent.earlyAccess.software}
          required
          value={form.currentSoftware}
        />
        <div className="field full">
          <label htmlFor={fieldIds.wish}>
            What do you wish your current salon software did better?
          </label>
          <textarea
            id={fieldIds.wish}
            onChange={(event) => updateField("wish", event.target.value)}
            value={form.wish}
          />
        </div>
        <SelectField
          error={errors.spend}
          id={fieldIds.spend}
          label="Approximate monthly software spend"
          onChange={(value) => updateField("spend", value)}
          options={siteContent.earlyAccess.spend}
          required
          value={form.spend}
        />
        <label className="checkbox-field">
          <input
            checked={form.testingInterest}
            onChange={(event) => updateField("testingInterest", event.target.checked)}
            type="checkbox"
          />
          <span>I&apos;d be interested in helping test Pipit before launch.</span>
        </label>
        <label className="checkbox-field">
          <input
            aria-describedby={errors.consentEmailUpdates ? `${fieldIds.consentEmailUpdates}-error` : undefined}
            aria-invalid={Boolean(errors.consentEmailUpdates)}
            checked={form.consentEmailUpdates}
            id={fieldIds.consentEmailUpdates}
            onChange={(event) => updateField("consentEmailUpdates", event.target.checked)}
            required
            type="checkbox"
          />
          <span>{siteContent.earlyAccess.consent}</span>
        </label>
        {errors.consentEmailUpdates ? (
          <p className="error-text" id={`${fieldIds.consentEmailUpdates}-error`}>
            {errors.consentEmailUpdates}
          </p>
        ) : null}
        <p className="privacy-placeholder">{siteContent.earlyAccess.privacyPlaceholder}</p>
        {failureMessage ? (
          <p className="form-error" role="alert">
            {failureMessage}
          </p>
        ) : null}
        {successMessage ? (
          <div className="success-card" role="status">
            <h3>{siteContent.earlyAccess.successHeadline}</h3>
            <p>{successMessage}</p>
          </div>
        ) : null}
        <div className="form-actions">
          <button className="button button-primary" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Joining..." : siteContent.earlyAccess.submit}
          </button>
        </div>
      </div>
    </form>
  );
}

function validateForm(form: FormState): Errors {
  const errors: Errors = {};

  for (const field of requiredFields) {
    if (typeof form[field] === "string" && form[field].trim() === "") {
      errors[field] = "This field is required.";
    }

    if (field === "consentEmailUpdates" && form.consentEmailUpdates !== true) {
      errors.consentEmailUpdates =
        "Please confirm email updates so we can contact you about Pipit early access.";
    }
  }

  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address.";
  }

  return errors;
}

function getAttribution(): Partial<FormState> {
  if (typeof window === "undefined") {
    return {};
  }

  const currentUrl = new URL(window.location.href);
  const currentAttribution: Partial<FormState> = {
    pageUrl: currentUrl.toString(),
    referrer: document.referrer || "",
    utmSource: currentUrl.searchParams.get("utm_source") || "",
    utmMedium: currentUrl.searchParams.get("utm_medium") || "",
    utmCampaign: currentUrl.searchParams.get("utm_campaign") || "",
    utmContent: currentUrl.searchParams.get("utm_content") || "",
    utmTerm: currentUrl.searchParams.get("utm_term") || "",
  };

  const hasUtm = [
    currentAttribution.utmSource,
    currentAttribution.utmMedium,
    currentAttribution.utmCampaign,
    currentAttribution.utmContent,
    currentAttribution.utmTerm,
  ].some(Boolean);

  if (hasUtm) {
    window.sessionStorage.setItem(attributionStorageKey, JSON.stringify(currentAttribution));
    return currentAttribution;
  }

  const storedAttribution = window.sessionStorage.getItem(attributionStorageKey);
  if (!storedAttribution) {
    return currentAttribution;
  }

  try {
    return {
      ...currentAttribution,
      ...JSON.parse(storedAttribution),
      pageUrl: currentAttribution.pageUrl,
    };
  } catch {
    return currentAttribution;
  }
}

function TextField({
  error,
  id,
  label,
  onChange,
  required,
  type = "text",
  value,
}: {
  error?: string;
  id: string;
  label: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: "email" | "text";
  value: string;
}) {
  const errorId = `${id}-error`;

  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {required ? " *" : ""}
      </label>
      <input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        id={id}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        type={type}
        value={value}
      />
      {error ? (
        <p className="error-text" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({
  error,
  id,
  label,
  onChange,
  options,
  required,
  value,
}: {
  error?: string;
  id: string;
  label: string;
  onChange: (value: string) => void;
  options: readonly string[];
  required?: boolean;
  value: string;
}) {
  const errorId = `${id}-error`;

  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {required ? " *" : ""}
      </label>
      <select
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        id={id}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        value={value}
      >
        <option value="">Select one</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? (
        <p className="error-text" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

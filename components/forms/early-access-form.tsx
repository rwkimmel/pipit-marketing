"use client";

import { FormEvent, useMemo, useState } from "react";
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
];

export function EarlyAccessForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [hasStarted, setHasStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
    }),
    [],
  );

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
      const result = await submitEarlyAccessLead(form);
      trackEvent("early_access_form_submit_success", {
        persisted: result.persisted,
      });
      setSuccessMessage(result.message);
      setForm(initialState);
      setHasStarted(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="early-access-form" noValidate onSubmit={handleSubmit}>
      {process.env.NODE_ENV !== "production" ? (
        <p className="form-note">
          This form is wired to a local submission stub for now. It does not persist data
          until a real backend or CRM is connected.
        </p>
      ) : null}
      <div className="form-grid">
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
        {successMessage ? (
          <div className="success-card" role="status">
            <h3>{siteContent.earlyAccess.successHeadline}</h3>
            <p>{siteContent.earlyAccess.successBody}</p>
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
  }

  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address.";
  }

  return errors;
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

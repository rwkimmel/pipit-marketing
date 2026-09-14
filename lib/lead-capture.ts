export type EarlyAccessSubmission = {
  firstName: string;
  lastName: string;
  email: string;
  businessName: string;
  businessType: string;
  locations: string;
  providers: string;
  currentSoftware: string;
  wish: string;
  spend: string;
  testingInterest: boolean;
  consentEmailUpdates: boolean;
  pageUrl?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  website?: string;
};

export type LeadCaptureResult = {
  persisted: boolean;
  message: string;
  errors?: Record<string, string>;
};

export async function submitEarlyAccessLead(
  submission: EarlyAccessSubmission,
): Promise<LeadCaptureResult> {
  const response = await fetch("/api/early-access", {
    body: JSON.stringify(submission),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const result = (await response.json().catch(() => null)) as
    | { message?: string; ok?: boolean; persisted?: boolean; errors?: Record<string, string> }
    | null;

  if (!response.ok || !result?.ok) {
    return {
      errors: result?.errors,
      persisted: false,
      message:
        result?.message || "Something went wrong while joining the list. Please try again.",
    };
  }

  return {
    persisted: Boolean(result.persisted),
    message: result.message || "You're in.",
  };
}

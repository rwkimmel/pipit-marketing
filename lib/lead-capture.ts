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
};

export type LeadCaptureResult = {
  persisted: false;
  message: string;
};

export async function submitEarlyAccessLead(
  submission: EarlyAccessSubmission,
): Promise<LeadCaptureResult> {
  await new Promise((resolve) => window.setTimeout(resolve, 450));

  if (process.env.NODE_ENV === "development") {
    console.info("[lead capture stub] Submission was not persisted.", submission);
  }

  return {
    persisted: false,
    message:
      "Demo submission received locally. No CRM, database, or production persistence is connected yet.",
  };
}

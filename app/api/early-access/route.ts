import { NextResponse } from "next/server";
import { sendEarlyAccessEmails } from "@/lib/early-access-email";
import { validateLeadCaptureInput } from "@/lib/lead-capture-validation";
import { upsertMarketingLead } from "@/lib/marketing-leads";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Please check the form and try again.",
      },
      { status: 400 },
    );
  }

  const result = validateLeadCaptureInput(payload);

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        errors: result.errors,
        message: result.spam
          ? "We could not accept that submission."
          : "Please check the highlighted fields and try again.",
      },
      { status: result.spam ? 400 : 422 },
    );
  }

  try {
    const userAgent = sanitizeUserAgent(request.headers.get("user-agent"));
    const persistedLead = await upsertMarketingLead(result.value, userAgent);

    try {
      const emailResults = await sendEarlyAccessEmails({
        lead: result.value,
        persistedLead,
      });

      console.info("Pipit early access email attempts completed", {
        results: emailResults,
      });
    } catch (error) {
      console.error("Pipit early access email attempts failed unexpectedly", {
        errorType: error instanceof Error ? error.name : "UnknownEmailError",
      });
    }

    return NextResponse.json({
      ok: true,
      persisted: true,
      message: "You're in.",
    });
  } catch (error) {
    console.error("Pipit lead capture is unavailable", {
      errorType: error instanceof Error ? error.name : "UnknownError",
    });

    return NextResponse.json(
      {
        ok: false,
        message: "Something went wrong while joining the list. Please try again.",
      },
      { status: 503 },
    );
  }
}

function sanitizeUserAgent(userAgent: string | null) {
  if (!userAgent) {
    return null;
  }

  return userAgent.trim().slice(0, 500);
}

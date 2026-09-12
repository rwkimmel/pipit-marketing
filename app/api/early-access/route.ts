import { NextResponse } from "next/server";
import { validateLeadCaptureInput } from "@/lib/lead-capture-validation";

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

  return NextResponse.json(
    {
      ok: false,
      message:
        "Lead capture is not connected yet. Please add the approved Supabase environment variables before enabling persistence.",
    },
    { status: 503 },
  );
}

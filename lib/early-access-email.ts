import "server-only";

import { ServerClient } from "postmark";
import type { MessageSendingResponse } from "postmark/dist/client/models/message/Message";
import { LinkTrackingOptions } from "postmark/dist/client/models/message/SupportingTypes";

import type { NormalizedLeadCapture } from "@/lib/lead-capture-validation";
import type { MarketingLeadRow } from "@/lib/marketing-leads";

const postmarkToken = process.env.POSTMARK_SERVER_TOKEN;
const postmarkClient = postmarkToken ? new ServerClient(postmarkToken) : null;

type EmailKind = "internal" | "confirmation";

type EarlyAccessEmailInput = {
  lead: NormalizedLeadCapture;
  persistedLead: MarketingLeadRow;
};

type EmailClient = {
  sendEmail: ServerClient["sendEmail"];
};

type EmailSendSuccess = {
  kind: EmailKind;
  ok: true;
  messageId: string;
  submittedAt: string;
};

type EmailSendFailure = {
  kind: EmailKind;
  ok: false;
  errorType: string;
  postmarkErrorCode?: number;
  statusCode?: number;
};

export type EarlyAccessEmailResult = EmailSendSuccess | EmailSendFailure;

export async function sendEarlyAccessEmails({
  lead,
  persistedLead,
}: EarlyAccessEmailInput): Promise<EarlyAccessEmailResult[]> {
  if (!postmarkClient) {
    console.warn("Pipit early access email skipped: missing POSTMARK_SERVER_TOKEN");
    return [
      {
        kind: "internal",
        ok: false,
        errorType: "MissingPostmarkToken",
      },
      {
        kind: "confirmation",
        ok: false,
        errorType: "MissingPostmarkToken",
      },
    ];
  }

  return sendEarlyAccessEmailsWithClient({ lead, persistedLead }, postmarkClient);
}

export async function sendEarlyAccessEmailsWithClient(
  { lead, persistedLead }: EarlyAccessEmailInput,
  emailClient: EmailClient,
): Promise<EarlyAccessEmailResult[]> {
  const jobs: Array<Promise<EmailSendSuccess>> = [
    sendInternalLeadNotification(emailClient, lead, persistedLead),
    sendSubmitterConfirmation(emailClient, lead),
  ];

  const results = await Promise.allSettled(jobs);

  return results.map((result, index) => {
    const kind: EmailKind = index === 0 ? "internal" : "confirmation";

    if (result.status === "fulfilled") {
      return result.value;
    }

    return normalizeEmailFailure(kind, result.reason);
  });
}

async function sendInternalLeadNotification(
  emailClient: EmailClient,
  lead: NormalizedLeadCapture,
  persistedLead: MarketingLeadRow,
): Promise<EmailSendSuccess> {
  const response = await emailClient.sendEmail({
    From: "Pipit Website <hello@pipitperch.com>",
    To: "hello@pipitperch.com",
    ReplyTo: lead.email,
    Subject: `New Pipit Early Access Lead \u2014 ${lead.business_name}`,
    HtmlBody: renderInternalLeadHtml(lead, persistedLead),
    TextBody: renderInternalLeadText(lead, persistedLead),
    MessageStream: "outbound",
    Tag: "early-access-internal",
    TrackOpens: false,
    TrackLinks: LinkTrackingOptions.None,
  });

  return toSuccess("internal", response);
}

async function sendSubmitterConfirmation(
  emailClient: EmailClient,
  lead: NormalizedLeadCapture,
): Promise<EmailSendSuccess> {
  const response = await emailClient.sendEmail({
    From: "Pipit <hello@pipitperch.com>",
    To: lead.email,
    ReplyTo: "hello@pipitperch.com",
    Subject: "You're on the Pipit early access list \u2728",
    HtmlBody: renderSubmitterConfirmationHtml(lead),
    TextBody: renderSubmitterConfirmationText(lead),
    MessageStream: "outbound",
    Tag: "early-access-confirmation",
    TrackOpens: false,
    TrackLinks: LinkTrackingOptions.None,
  });

  return toSuccess("confirmation", response);
}

function toSuccess(
  kind: EmailKind,
  response: MessageSendingResponse,
): EmailSendSuccess {
  return {
    kind,
    ok: true,
    messageId: response.MessageID,
    submittedAt: response.SubmittedAt,
  };
}

function normalizeEmailFailure(kind: EmailKind, error: unknown): EmailSendFailure {
  const maybePostmarkError = error as {
    code?: unknown;
    name?: unknown;
    statusCode?: unknown;
  };

  return {
    kind,
    ok: false,
    errorType:
      typeof maybePostmarkError.name === "string"
        ? maybePostmarkError.name
        : error instanceof Error
          ? error.name
          : "UnknownEmailError",
    postmarkErrorCode:
      typeof maybePostmarkError.code === "number" ? maybePostmarkError.code : undefined,
    statusCode:
      typeof maybePostmarkError.statusCode === "number"
        ? maybePostmarkError.statusCode
        : undefined,
  };
}

function renderInternalLeadHtml(
  lead: NormalizedLeadCapture,
  persistedLead: MarketingLeadRow,
) {
  const resubmission =
    persistedLead.last_duplicate_action === "updated_existing_email"
      ? `Yes (${persistedLead.duplicate_submission_count} total resubmission${persistedLead.duplicate_submission_count === 1 ? "" : "s"})`
      : "No";

  const fields = [
    ["First name", lead.first_name],
    ["Last name", lead.last_name],
    ["Email", lead.email],
    ["Business / salon name", lead.business_name],
    ["Business type", lead.business_type],
    ["Number of locations", lead.location_count_band],
    ["Number of service providers", lead.provider_count_band],
    ["Current salon software", lead.current_software],
    ["What they wish their software did better", lead.software_frustration],
    ["Approximate monthly software spend", lead.monthly_software_spend_band],
    ["Interested in helping test Pipit", lead.interested_in_testing ? "Yes" : "No"],
    ["Email consent", lead.consent_email_updates ? "Yes" : "No"],
    ["Consent timestamp", lead.consent_timestamp],
    ["Submission timestamp", persistedLead.updated_at],
    ["Resubmission", resubmission],
    ["Page URL", lead.page_url],
    ["Referrer", lead.referrer],
    ["UTM source", lead.utm_source],
    ["UTM medium", lead.utm_medium],
    ["UTM campaign", lead.utm_campaign],
    ["UTM content", lead.utm_content],
    ["UTM term", lead.utm_term],
  ] as const;

  return renderEmailShell(
    "New early access lead",
    `<p style="margin:0 0 20px;color:#415654;">A salon owner just submitted the Pipit early access form.</p>
    <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;">
      ${fields
        .map(
          ([label, value]) => `<tr>
            <th align="left" style="width:38%;padding:10px 12px;border-top:1px solid #e4ece8;color:#264441;font-size:13px;vertical-align:top;">${escapeHtml(label)}</th>
            <td style="padding:10px 12px;border-top:1px solid #e4ece8;color:#20312f;font-size:14px;vertical-align:top;">${escapeHtml(value || "-")}</td>
          </tr>`,
        )
        .join("")}
    </table>`,
  );
}

function renderInternalLeadText(
  lead: NormalizedLeadCapture,
  persistedLead: MarketingLeadRow,
) {
  const resubmission =
    persistedLead.last_duplicate_action === "updated_existing_email"
      ? `Yes (${persistedLead.duplicate_submission_count} total resubmission${persistedLead.duplicate_submission_count === 1 ? "" : "s"})`
      : "No";

  return [
    "New Pipit early access lead",
    "",
    `First name: ${lead.first_name}`,
    `Last name: ${lead.last_name}`,
    `Email: ${lead.email}`,
    `Business / salon name: ${lead.business_name}`,
    `Business type: ${lead.business_type}`,
    `Number of locations: ${lead.location_count_band}`,
    `Number of service providers: ${lead.provider_count_band}`,
    `Current salon software: ${lead.current_software}`,
    `What they wish their software did better: ${lead.software_frustration || "-"}`,
    `Approximate monthly software spend: ${lead.monthly_software_spend_band}`,
    `Interested in helping test Pipit: ${lead.interested_in_testing ? "Yes" : "No"}`,
    `Email consent: ${lead.consent_email_updates ? "Yes" : "No"}`,
    `Consent timestamp: ${lead.consent_timestamp || "-"}`,
    `Submission timestamp: ${persistedLead.updated_at}`,
    `Resubmission: ${resubmission}`,
    `Page URL: ${lead.page_url || "-"}`,
    `Referrer: ${lead.referrer || "-"}`,
    `UTM source: ${lead.utm_source || "-"}`,
    `UTM medium: ${lead.utm_medium || "-"}`,
    `UTM campaign: ${lead.utm_campaign || "-"}`,
    `UTM content: ${lead.utm_content || "-"}`,
    `UTM term: ${lead.utm_term || "-"}`,
  ].join("\n");
}

function renderSubmitterConfirmationHtml(lead: NormalizedLeadCapture) {
  return renderEmailShell(
    "You're on the list",
    `<p>Hi ${escapeHtml(lead.first_name)},</p>
    <p>Thanks for joining the Pipit early access list.</p>
    <p>We're building salon software that actually makes sense &mdash; simple to learn, capable enough to run your salon, and priced without punishing you for growing your team.</p>
    <p>We're starting small and working closely with our first salons. We'll keep you posted as Pipit gets closer to opening up.</p>
    <p>If you have questions in the meantime, just reply to this email. We'd love to hear from you.</p>
    <p style="margin-bottom:0;">The Pipit Team<br /><a href="https://pipitperch.com" style="color:#2f7f77;">pipitperch.com</a></p>`,
  );
}

function renderSubmitterConfirmationText(lead: NormalizedLeadCapture) {
  return [
    `Hi ${lead.first_name},`,
    "",
    "Thanks for joining the Pipit early access list.",
    "",
    "We're building salon software that actually makes sense - simple to learn, capable enough to run your salon, and priced without punishing you for growing your team.",
    "",
    "We're starting small and working closely with our first salons. We'll keep you posted as Pipit gets closer to opening up.",
    "",
    "If you have questions in the meantime, just reply to this email. We'd love to hear from you.",
    "",
    "The Pipit Team",
    "pipitperch.com",
  ].join("\n");
}

function renderEmailShell(title: string, body: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${escapeHtml(title)} | Pipit</title>
  </head>
  <body style="margin:0;background:#f7fbf8;color:#20312f;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;">${escapeHtml(title)} from Pipit</div>
    <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;background:#f7fbf8;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;max-width:640px;background:#ffffff;border:1px solid #dbe8e4;border-radius:8px;overflow:hidden;">
            <tr>
              <td style="padding:24px 28px;border-top:6px solid #3f9f99;">
                <div style="font-size:22px;font-weight:700;color:#22756f;letter-spacing:.01em;">Pipit</div>
                <div style="width:72px;height:4px;background:#f6c453;margin:14px 0 22px;border-radius:4px;"></div>
                <h1 style="margin:0 0 16px;font-size:24px;line-height:1.2;color:#20312f;">${escapeHtml(title)}</h1>
                <div style="font-size:16px;line-height:1.55;color:#20312f;">
                  ${body}
                </div>
              </td>
            </tr>
          </table>
          <p style="margin:16px 0 0;font-size:12px;color:#6d7e7b;">Pipit | Salon software that actually makes sense.</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function escapeHtml(value: string | number | boolean | null | undefined) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

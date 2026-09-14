# Pipit Lead Capture v1 Phase 2

## Runtime Flow

Browser form -> `/api/early-access` -> server validation -> honeypot check -> server-only Supabase client -> `marketing_leads` insert/update -> success response.

The browser never receives Supabase service credentials and never writes directly to Supabase.

## Consent

Email-update consent is required because joining the early-access list requires Pipit to contact the lead about early access, product updates, and occasional research opportunities.

No SMS consent is collected.

## Deduplication

Email is trimmed, lowercased, and used as the deduplication key.

For a new email, the server inserts a lead with `lead_status = new`.

For an existing email, the server updates the current form/profile fields, preserves the existing `lead_status`, preserves the original `created_at`, updates `updated_at`, sets `last_duplicate_action = updated_existing_email`, and increments `duplicate_submission_count`.

## Attribution

The form captures `page_url`, `document.referrer`, and the current session's `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, and `utm_term`.

Attribution stays simple for v1 and is preserved in `sessionStorage` during the visit.

## Operational Notes

- Review leads directly in Supabase Table Editor under `public.marketing_leads`.
- Keep `.env.local` uncommitted.
- Add the same server-only environment variables in Vercel only when deployment is approved.
- Stronger rate limiting is still deferred until public-scale launch planning.
- A real Privacy Policy remains required before public launch.

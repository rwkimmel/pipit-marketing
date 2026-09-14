# Pipit Lead Capture v1 Phase 1

Historical note: Phase 2 has since wired real server-side Supabase persistence. See `docs/lead-capture-phase-2.md` for the current runtime behavior.

## Scope

This phase prepares the lead-capture architecture only. It does not create a Supabase project, apply migrations, connect credentials, or enable production persistence.

## Table Name

Use `marketing_leads`.

This is broader and more durable than `early_access_leads` because the form is the beginning of Pipit's commercial prospect database, not only a launch waitlist.

## Data Flow

Browser form -> `/api/early-access` -> server-side validation -> honeypot check -> Supabase upsert in Phase 2 -> success response.

The route currently validates input and returns `503` for otherwise valid submissions until Supabase credentials and persistence are approved.

## Deduplication

Normalize email by trimming and lowercasing. Use `email` as the primary deduplication key.

Phase 2 upsert behavior should:

- Insert a new row for a new normalized email.
- Update profile, attribution, consent, and form fields for an existing email.
- Preserve `created_at`.
- Update `updated_at`.
- Preserve existing `lead_status` so a resubmission never downgrades a manually managed lifecycle state.
- Increment `duplicate_submission_count`.
- Set `last_duplicate_action` to `inserted` or `updated_existing_email`.

Recommended Phase 2 upsert shape:

```sql
insert into public.marketing_leads (...)
values (...)
on conflict (email) do update set
  first_name = excluded.first_name,
  last_name = excluded.last_name,
  business_name = excluded.business_name,
  business_type = excluded.business_type,
  location_count_band = excluded.location_count_band,
  provider_count_band = excluded.provider_count_band,
  current_software = excluded.current_software,
  monthly_software_spend_band = excluded.monthly_software_spend_band,
  software_frustration = excluded.software_frustration,
  interested_in_testing = excluded.interested_in_testing,
  consent_email_updates = excluded.consent_email_updates,
  consent_timestamp = excluded.consent_timestamp,
  landing_page_version = excluded.landing_page_version,
  page_url = excluded.page_url,
  referrer = excluded.referrer,
  utm_source = excluded.utm_source,
  utm_medium = excluded.utm_medium,
  utm_campaign = excluded.utm_campaign,
  utm_content = excluded.utm_content,
  utm_term = excluded.utm_term,
  submission_source = excluded.submission_source,
  user_agent = excluded.user_agent,
  last_duplicate_action = 'updated_existing_email',
  duplicate_submission_count = public.marketing_leads.duplicate_submission_count + 1;
```

Do not set `lead_status = excluded.lead_status` during updates.

## Consent

Current visible form copy does not make early-access/product-update email consent explicit enough for a durable commercial prospect database.

Smallest recommended Phase 2 copy change for CMO/legal approval:

> Email me about Pipit early access, product updates, and occasional research opportunities. I understand I can opt out later.

Do not create SMS consent. Do not imply promotional texting consent.

## Attribution

Capture current landing-page URL, referrer, and these query-string parameters:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`

For v1, keep attribution simple. Read query parameters in the browser, preserve them in component state/session storage during the visit, and send them with the form payload. Avoid multi-touch attribution.

## Security Model

- Browser never receives service-role credentials.
- `.env.local` remains uncommitted.
- Server-only variables use no `NEXT_PUBLIC_` prefix.
- Supabase table has RLS enabled and no public read/write policy in Phase 1.
- Public form submissions go through server-side validation before any future database write.
- Analytics events must not include PII such as name, email, or business name.
- `user_agent` is available in the schema for privacy-conscious server-side capture in Phase 2.
- Durable rate limiting is deferred until infrastructure is selected. The Phase 1 route includes validation, unexpected-field rejection, and honeypot handling; a future rate limiter should be added at the server route or platform edge before broad launch.

## Manual Supabase Setup

After approval:

1. Create a dedicated Supabase project for Pipit marketing/commercial leads.
2. In that project, open SQL Editor.
3. Run `supabase/migrations/0001_create_marketing_leads.sql`.
4. Confirm `public.marketing_leads` exists.
5. Confirm Row Level Security is enabled and no anonymous read/write policies exist.
6. Add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to `.env.local` locally and to Vercel project environment variables when deployment is approved.
7. Do not add these secrets to Git.
8. Return for Phase 2 wiring approval.

## Reviewing Leads

For v1, review leads directly in Supabase Table Editor under `public.marketing_leads`. A lightweight admin or CRM integration can be added later.

## Production Gate

Do not approve production deployment until:

- Supabase project exists.
- Migration has been applied.
- Consent wording is approved.
- Server-side persistence is wired and verified.
- Privacy Policy destination/content is approved.

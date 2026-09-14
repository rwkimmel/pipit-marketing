import "server-only";

import type { NormalizedLeadCapture } from "@/lib/lead-capture-validation";
import { createSupabaseServiceClient } from "@/lib/supabase-server";

export type MarketingLeadRow = {
  id: string;
  email: string;
  business_name: string;
  current_software: string;
  lead_status: string;
  created_at: string;
  updated_at: string;
  duplicate_submission_count: number;
  last_duplicate_action: "inserted" | "updated_existing_email" | null;
  consent_email_updates: boolean;
  consent_timestamp: string | null;
  utm_source: string | null;
  referrer: string | null;
};

export async function upsertMarketingLead(
  lead: NormalizedLeadCapture,
  userAgent: string | null,
) {
  const supabase = createSupabaseServiceClient();
  const payload = {
    first_name: lead.first_name,
    last_name: lead.last_name,
    email: lead.email,
    business_name: lead.business_name,
    business_type: lead.business_type,
    location_count_band: lead.location_count_band,
    provider_count_band: lead.provider_count_band,
    current_software: lead.current_software,
    monthly_software_spend_band: lead.monthly_software_spend_band,
    software_frustration: lead.software_frustration,
    interested_in_testing: lead.interested_in_testing,
    consent_email_updates: lead.consent_email_updates,
    consent_timestamp: lead.consent_timestamp,
    landing_page_version: lead.landing_page_version,
    page_url: lead.page_url,
    referrer: lead.referrer,
    utm_source: lead.utm_source,
    utm_medium: lead.utm_medium,
    utm_campaign: lead.utm_campaign,
    utm_content: lead.utm_content,
    utm_term: lead.utm_term,
    submission_source: lead.submission_source,
    user_agent: userAgent,
  };

  const { data: existingLead, error: existingError } = await supabase
    .from("marketing_leads")
    .select("id, duplicate_submission_count")
    .eq("email", lead.email)
    .maybeSingle();

  if (existingError) {
    throw existingError;
  }

  if (existingLead) {
    const { data, error } = await supabase
      .from("marketing_leads")
      .update({
        ...payload,
        duplicate_submission_count: (existingLead.duplicate_submission_count ?? 0) + 1,
        last_duplicate_action: "updated_existing_email",
      })
      .eq("id", existingLead.id)
      .select(
        "id, email, business_name, current_software, lead_status, created_at, updated_at, duplicate_submission_count, last_duplicate_action, consent_email_updates, consent_timestamp, utm_source, referrer",
      )
      .single<MarketingLeadRow>();

    if (error) {
      throw error;
    }

    return data;
  }

  const { data, error } = await supabase
    .from("marketing_leads")
    .insert({
      ...payload,
      duplicate_submission_count: 0,
      last_duplicate_action: "inserted",
    })
    .select(
      "id, email, business_name, current_software, lead_status, created_at, updated_at, duplicate_submission_count, last_duplicate_action, consent_email_updates, consent_timestamp, utm_source, referrer",
    )
    .single<MarketingLeadRow>();

  if (error) {
    throw error;
  }

  return data;
}

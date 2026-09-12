create extension if not exists pgcrypto;

create table if not exists public.marketing_leads (
  id uuid primary key default gen_random_uuid(),

  first_name text not null check (char_length(first_name) between 1 and 80),
  last_name text not null check (char_length(last_name) between 1 and 80),
  email text not null check (
    char_length(email) between 3 and 254
    and email = lower(trim(email))
    and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  ),
  business_name text not null check (char_length(business_name) between 1 and 140),

  business_type text not null check (
    business_type in ('Hair Salon', 'Nail Salon', 'Waxing', 'Lashes / Brows', 'Spa', 'Other')
  ),
  location_count_band text not null check (
    location_count_band in ('1', '2', '3-5', '6+')
  ),
  provider_count_band text not null check (
    provider_count_band in ('1-3', '4-7', '8-15', '16-25', '26-40', '41+')
  ),
  current_software text not null check (
    current_software in (
      'Vagaro',
      'Zenoti',
      'Boulevard',
      'Mangomint',
      'GlossGenius',
      'Fresha',
      'Square',
      'Phorest',
      'Meevo',
      'Mindbody',
      'Other',
      'None'
    )
  ),
  monthly_software_spend_band text not null check (
    monthly_software_spend_band in (
      'Under $50',
      '$50-99',
      '$100-199',
      '$200-399',
      '$400-699',
      '$700+',
      'Not sure / Prefer not to say'
    )
  ),
  software_frustration text check (
    software_frustration is null or char_length(software_frustration) <= 2000
  ),
  interested_in_testing boolean not null default false,

  lead_status text not null default 'new' check (
    lead_status in (
      'new',
      'research_candidate',
      'interviewed',
      'design_partner_candidate',
      'founding_salon',
      'customer',
      'not_a_fit'
    )
  ),

  consent_email_updates boolean not null default false,
  consent_timestamp timestamptz,

  landing_page_version text not null default 'v2.1',
  page_url text check (page_url is null or char_length(page_url) <= 500),
  referrer text check (referrer is null or char_length(referrer) <= 500),
  utm_source text check (utm_source is null or char_length(utm_source) <= 120),
  utm_medium text check (utm_medium is null or char_length(utm_medium) <= 120),
  utm_campaign text check (utm_campaign is null or char_length(utm_campaign) <= 160),
  utm_content text check (utm_content is null or char_length(utm_content) <= 160),
  utm_term text check (utm_term is null or char_length(utm_term) <= 160),

  submission_source text not null default 'pipit_marketing_early_access_form',
  user_agent text check (user_agent is null or char_length(user_agent) <= 500),
  last_duplicate_action text check (
    last_duplicate_action is null
    or last_duplicate_action in ('inserted', 'updated_existing_email')
  ),
  duplicate_submission_count integer not null default 0 check (duplicate_submission_count >= 0),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint marketing_leads_consent_timestamp_check check (
    (consent_email_updates = true and consent_timestamp is not null)
    or (consent_email_updates = false)
  )
);

create unique index if not exists marketing_leads_email_unique_idx
  on public.marketing_leads (email);

create index if not exists marketing_leads_lead_status_idx
  on public.marketing_leads (lead_status);

create index if not exists marketing_leads_created_at_idx
  on public.marketing_leads (created_at desc);

create index if not exists marketing_leads_utm_campaign_idx
  on public.marketing_leads (utm_campaign)
  where utm_campaign is not null;

create or replace function public.set_marketing_leads_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_marketing_leads_updated_at on public.marketing_leads;

create trigger set_marketing_leads_updated_at
before update on public.marketing_leads
for each row
execute function public.set_marketing_leads_updated_at();

alter table public.marketing_leads enable row level security;

comment on table public.marketing_leads is
  'Pipit public marketing/commercial leads. Writes should go through server-side application code only.';

comment on column public.marketing_leads.lead_status is
  'Internal commercial lifecycle status. Never exposed in the public lead form.';

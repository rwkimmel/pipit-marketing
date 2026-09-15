export const siteConfig = {
  productionDomain: process.env.NEXT_PUBLIC_SITE_URL || "https://pipitperch.com",
  contactEmail: process.env.PIPIT_CONTACT_EMAIL || "hello@pipitperch.com",
  privacyEmail: process.env.PIPIT_PRIVACY_EMAIL || "privacy@pipitperch.com",
} as const;

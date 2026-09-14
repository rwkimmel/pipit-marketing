export const siteConfig = {
  productionDomain: process.env.NEXT_PUBLIC_SITE_URL || "",
  contactEmail: process.env.PIPIT_CONTACT_EMAIL || "",
  privacyEmail: process.env.PIPIT_PRIVACY_EMAIL || "",
} as const;

export function hasConfiguredEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

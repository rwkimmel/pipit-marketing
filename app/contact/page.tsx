import { AnalyticsLink } from "@/components/analytics/analytics-link";
import { Footer } from "@/components/marketing/footer";
import { MarketingNav } from "@/components/marketing/nav";
import { siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Pipit",
  description:
    "Contact Pipit about early access and pre-launch questions for salon owners.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Pipit",
    description:
      "Contact Pipit about early access and pre-launch questions for salon owners.",
    url: "/contact",
  },
  twitter: {
    title: "Contact | Pipit",
    description:
      "Contact Pipit about early access and pre-launch questions for salon owners.",
  },
};

export default function ContactPage() {
  return (
    <>
      <MarketingNav />
      <main className="contact-page">
        <section className="section-shell contact-section" aria-labelledby="contact-title">
          <div className="contact-copy">
            <p className="eyebrow">GET IN TOUCH</p>
            <h1 id="contact-title">We&apos;d love to hear from you.</h1>
            <p>
              Have a question about Pipit, early access, or whether it might be a fit for your
              salon? Get in touch.
            </p>
          </div>

          <div className="contact-panel" aria-label="Pipit contact email">
            <h2>Contact Email</h2>
            <a className="contact-email" href={`mailto:${siteConfig.contactEmail}`}>
              {siteConfig.contactEmail}
            </a>
          </div>

          <div className="early-access-callout">
            <h2>Looking for early access?</h2>
            <p>
              If you&apos;re interested in being one of the first salons on Pipit, the best place to
              start is our early-access form.
            </p>
            <AnalyticsLink
              className="button button-primary"
              eventName="final_get_early_access_click"
              href="/#early-access"
            >
              Get Early Access
            </AnalyticsLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

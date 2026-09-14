import { Footer } from "@/components/marketing/footer";
import { MarketingNav } from "@/components/marketing/nav";
import { hasConfiguredEmail, siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Pipit",
  description:
    "Pipit's working Privacy Policy for the website and early-access program.",
};

const informationCollected = [
  "your first and last name;",
  "email address;",
  "salon or business name;",
  "type of beauty business;",
  "number of locations;",
  "number of service providers;",
  "salon software you currently use;",
  "approximate monthly software spend;",
  "feedback you choose to provide about your current salon software; and",
  "whether you are interested in helping test Pipit before launch.",
];

const useCases = [
  "manage the Pipit early-access program;",
  "communicate with you about Pipit early access and product updates when you have agreed to receive those communications;",
  "invite appropriate salons to participate in research, testing, design-partner, or founding-salon programs;",
  "understand the needs of salons considering Pipit;",
  "improve Pipit's product, positioning, website, and launch plans;",
  "understand how people discover Pipit; and",
  "protect the website and early-access program from misuse.",
];

const choices = [
  "ask what personal information we have about you;",
  "request that we correct inaccurate information;",
  "request deletion of information you provided to us; or",
  "unsubscribe from Pipit email communications.",
];

export default function PrivacyPage() {
  const hasPrivacyEmail = hasConfiguredEmail(siteConfig.privacyEmail);

  return (
    <>
      <MarketingNav />
      <main className="legal-page">
        <article className="legal-document">
          <p className="eyebrow">Effective date: September 14, 2026</p>
          <h1>Privacy Policy</h1>

          <p>
            Pipit is salon management software built by salon owners. This Privacy Policy explains
            how we collect, use, and protect information you provide through the Pipit website and
            early-access program.
          </p>

          <h2>Information We Collect</h2>
          <p>
            When you join the Pipit early-access list, we may collect information you provide to us,
            including:
          </p>
          <ul>
            {informationCollected.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            We also collect limited information about how you arrived at our website, such as the
            page you visited, referring website, and campaign information contained in UTM
            parameters.
          </p>

          <h2>How We Use Your Information</h2>
          <p>We use this information to:</p>
          <ul>
            {useCases.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            We do not use early-access form submissions to enroll you in SMS or text-message
            marketing.
          </p>

          <h2>Email Communications</h2>
          <p>
            If you choose to receive Pipit early-access, product-update, and research emails, we may
            contact you at the email address you provide.
          </p>
          <p>
            You may unsubscribe from these communications at any time using the unsubscribe option
            provided in our emails or by contacting us.
          </p>

          <h2>How We Store and Protect Information</h2>
          <p>
            Early-access information is stored using third-party technology providers that help us
            operate Pipit&apos;s website and commercial systems.
          </p>
          <p>
            We use reasonable administrative and technical measures designed to protect the
            information we collect. However, no method of electronic storage or transmission is
            completely secure.
          </p>

          <h2>Service Providers</h2>
          <p>
            We may use service providers to operate Pipit&apos;s website, host data, send communications,
            analyze website performance, and provide other services necessary to operate Pipit.
          </p>
          <p>These providers may process information on our behalf for those purposes.</p>
          <p>We do not sell your personal information.</p>

          <h2>Cookies and Website Analytics</h2>
          <p>
            Pipit may use cookies, session storage, or similar technologies necessary to operate the
            website, remember campaign attribution, understand website usage, and improve the
            visitor experience.
          </p>
          <p>
            As we add analytics or other website technologies, we will update this Privacy Policy as
            appropriate.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain information for as long as reasonably necessary to operate the early-access
            program, conduct legitimate product and customer research, prepare for Pipit&apos;s commercial
            launch, comply with applicable obligations, and maintain appropriate business records.
          </p>
          <p>We may delete or anonymize information when it is no longer reasonably needed.</p>

          <h2>Your Choices</h2>
          <p>You may contact us to:</p>
          <ul>
            {choices.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            Some information may be retained where reasonably necessary for legal, security,
            fraud-prevention, or legitimate recordkeeping purposes.
          </p>

          <h2>Children&apos;s Privacy</h2>
          <p>
            Pipit&apos;s website and early-access program are intended for business owners and
            professionals and are not directed to children under 13. We do not knowingly collect
            personal information from children under 13 through the early-access program.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy as Pipit develops and our website, services, or data
            practices change.
          </p>
          <p>
            When we make material changes, we will update the effective date displayed above and
            take other steps where required.
          </p>

          <h2>Contact Us</h2>
          <p>If you have questions about this Privacy Policy or your information, contact us at:</p>
          {hasPrivacyEmail ? (
            <p>
              <a href={`mailto:${siteConfig.privacyEmail}`}>{siteConfig.privacyEmail}</a>
            </p>
          ) : (
            <p className="pending-config-note">
              Privacy contact email pending. Configure PIPIT_PRIVACY_EMAIL before public
              deployment.
            </p>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}

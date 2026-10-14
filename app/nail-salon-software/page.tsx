import type { Metadata } from "next";
import Link from "next/link";
import { AnalyticsLink } from "@/components/analytics/analytics-link";
import { Faq } from "@/components/marketing/faq";
import { Footer } from "@/components/marketing/footer";
import { MarketingNav } from "@/components/marketing/nav";
import { BrandLogo } from "@/components/ui/brand-logo";

const title = "Nail Salon Software That Actually Makes Sense | Pipit";
const description =
  "Pipit is nail salon software designed to be easy to learn and easy to use—so salon owners can spend less time managing software and more time running their salon.";
const canonical = "https://pipitperch.com/nail-salon-software";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, type: "website", siteName: "Pipit", url: canonical },
  twitter: { card: "summary_large_image", title, description },
};

const faq = [
  {
    question: "Is Pipit only for nail salons?",
    answer:
      "No. Pipit is being built for salons and beauty businesses more broadly, but nail salons are an important early focus because that is where our own operating experience comes from.",
  },
  {
    question: "Is Pipit available now?",
    answer: "Pipit is currently in Early Access. We’re still building and refining the product.",
  },
  {
    question: "Is this just simple scheduling software?",
    answer:
      "No. The goal is not to strip salon software down to a calendar. The goal is to make capable salon software easier to understand and use.",
  },
  {
    question: "Why is Pipit different?",
    answer:
      "Pipit is being built from the perspective of people who actually run a salon and use salon software in day-to-day operations.",
  },
] as const;

export default function NailSalonSoftwarePage() {
  return (
    <>
      <MarketingNav />
      <main className="nail-salon-page">
        <section className="section-shell nail-salon-hero" aria-labelledby="nail-salon-title">
          <div className="hero-copy">
            <h1 id="nail-salon-title">Nail salon software that actually makes sense</h1>
            <p className="hero-subhead">
              You should spend your time running your salon—not figuring out your software.
            </p>
            <div className="cta-row">
              <AnalyticsLink className="button button-primary" href="/#early-access"
                eventName="hero_get_early_access_click" payload={{ page: "nail_salon_software" }}>
                Join Early Access
              </AnalyticsLink>
            </div>
          </div>
          <div className="article-body">
            <p>Salon owners already have enough to manage: clients, staff, schedules, services, checkout, inventory, payroll, and the hundred little things that happen every day.</p>
            <p>Your salon software should make those things easier.</p>
            <div className="article-question-list">
              <p>Not require hours of training.</p>
              <p>Not bury simple tasks behind complicated menus.</p>
              <p>Not make you learn how the software company thinks before you can do your job.</p>
            </div>
            <p>Pipit is being built around a simple idea:</p>
            <p className="article-pullquote">Powerful salon software should still be easy to use.</p>
          </div>
        </section>

        <section className="value-strip" aria-labelledby="easy-title">
          <div className="section-shell split-section">
            <div><h2 id="easy-title">Easy shouldn&apos;t mean limited</h2></div>
            <div className="article-body">
              <p>Salon owners need real functionality.</p>
              <p>Scheduling. Checkout. Client history. Staff management. Reporting. Payments. Rebooking. Operations.</p>
              <p>The answer isn&apos;t stripped-down software that can&apos;t handle a growing salon.</p>
              <p>It&apos;s software that can do what you need without making you work for it.</p>
              <p>The best software should feel obvious.</p>
              <p>You should be able to look at the screen and understand what to do next.</p>
            </div>
          </div>
        </section>

        <section className="story-band" aria-labelledby="salon-story-title">
          <div className="section-shell split-section">
            <div>
              <h2 id="salon-story-title">We learned this by running a salon</h2>
              <p>We didn&apos;t start out intending to build salon software.</p>
              <p>We were running a nail salon and using powerful software that often felt harder to use than it needed to be.</p>
              <p>We kept asking the same kinds of questions:</p>
            </div>
            <div className="article-body">
              <div className="article-question-list">
                <p>Why does this take so many clicks?</p>
                <p>Why is this setting so hard to find?</p>
                <p>Why do I need training to do something this basic?</p>
              </div>
              <p>Eventually, instead of working around those frustrations, we started fixing them.</p>
              <p className="closing-line">That became Pipit.</p>
              <p><Link className="inline-link" href="/why-we-built-pipit">Read the founder note.</Link></p>
            </div>
          </div>
        </section>

        <section className="section-shell split-section" aria-labelledby="operators-title">
          <div><h2 id="operators-title">Built for people who have salons to run</h2></div>
          <div className="article-body">
            <p>Salon owners shouldn&apos;t have to become software experts.</p>
            <p>Your team shouldn&apos;t need a manual for every routine task.</p>
            <p>And adding capability shouldn&apos;t automatically mean adding complexity.</p>
            <p>Pipit is being built for salon owners who want software that helps them run the business—and then gets out of the way.</p>
          </div>
        </section>

        <section className="qualification-band" aria-labelledby="nail-focus-title">
          <div className="section-shell compact">
            <h2 id="nail-focus-title">Especially for nail salons</h2>
            <p>Our own experience comes from running a working nail salon, so nail salons are an important early focus for Pipit.</p>
            <p>That means we&apos;re thinking about the realities of:</p>
            <ul className="nail-salon-realities">
              {[
                "multiple technicians", "different services and appointment lengths", "busy calendars",
                "staff schedules", "checkout", "client history", "rebooking", "front-desk workflows",
                "the constant changes that happen during a real salon day",
              ].map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p>But the principle underneath all of it is simple:</p>
            <p className="closing-line">The salon should be the complicated part. The software shouldn&apos;t be.</p>
          </div>
        </section>

        <section className="section-shell compact" aria-labelledby="nail-faq-title">
          <h2 id="nail-faq-title">FAQ</h2>
          <Faq items={faq} />
        </section>

        <section className="final-cta" aria-labelledby="nail-final-title">
          <div className="section-shell compact">
            <BrandLogo className="final-logo" variant="cta" />
            <h2 id="nail-final-title">Salon software that actually makes sense.</h2>
            <p className="section-lede">Pipit is currently in Early Access.</p>
            <p>If you run a salon and want software that is capable without being unnecessarily complicated, we&apos;d love to have you follow along.</p>
            <AnalyticsLink className="button button-primary" href="/#early-access"
              eventName="final_get_early_access_click" payload={{ page: "nail_salon_software" }}>
              Join Early Access
            </AnalyticsLink>
          </div>
        </section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "WebPage", name: title, description,
          url: canonical, publisher: { "@type": "Organization", name: "Pipit", url: "https://pipitperch.com" },
        }) }} />
      </main>
      <Footer />
    </>
  );
}

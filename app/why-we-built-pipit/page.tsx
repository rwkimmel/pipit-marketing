import { AnalyticsLink } from "@/components/analytics/analytics-link";
import { Footer } from "@/components/marketing/footer";
import { MarketingNav } from "@/components/marketing/nav";
import { BrandLogo } from "@/components/ui/brand-logo";
import { siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";
import Link from "next/link";

const articleHeadline =
  "We built Pipit because salon software was more complicated than it needed to be.";
const title =
  "Why We Built Pipit | Salon Software Was More Complicated Than It Needed To Be";
const description =
  "Why we started building Pipit after experiencing salon software that felt unnecessarily complex and unintuitive in a real working salon.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/why-we-built-pipit",
  },
  openGraph: {
    title,
    description,
    type: "article",
    siteName: "Pipit",
    url: "/why-we-built-pipit",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function WhyWeBuiltPipitPage() {
  return (
    <>
      <MarketingNav />
      <main className="article-page">
        <article className="founder-article">
          <header className="article-header">
            <p className="eyebrow">Founder Note</p>
            <h1>{articleHeadline}</h1>
            <p className="article-deck">
              A note from inside a working salon about why capable software should not have to
              feel complicated.
            </p>
          </header>

          <div className="article-body">
            <p>We didn&apos;t start with the idea of building a software company.</p>

            <p>We started with a salon.</p>

            <p>
              Running a salon means juggling a lot at once: appointments, staff schedules,
              services, checkout, client information, commissions, reporting, and the dozens of
              little operational details that have to work correctly every day.
            </p>

            <p>The software is supposed to make that easier.</p>

            <p>For us, too often, it didn&apos;t.</p>

            <p>
              The issue wasn&apos;t that salon software lacked features. If anything, the opposite
              was true. The system we were using could do a lot. But from the beginning, it often
              felt more complicated than it needed to be. Ordinary tasks were not always intuitive.
              Important workflows could take too many steps. Learning the system sometimes meant
              learning how the software wanted us to think, rather than simply doing what made
              sense for the salon.
            </p>

            <p>That distinction became more important to us over time.</p>

            <p>
              There is a big difference between software being <strong>capable</strong> and
              software being <strong>complicated</strong>.
            </p>

            <p>We do not believe salons should have to choose between the two.</p>

            <p>
              A system can support the real operational needs of a team-based salon—scheduling,
              checkout, staff management, client history, reporting, commissions, and more—without
              making every interaction feel like a training exercise.
            </p>

            <p>That sounds obvious. But after operating a salon ourselves, it stopped feeling obvious at all.</p>

            <p>We found ourselves asking questions like:</p>

            <div className="article-question-list">
              <p>Why should this take so many clicks?</p>
              <p>Why is this information buried here?</p>
              <p>Why does a simple task require knowing how the system was designed behind the scenes?</p>
              <p>Why does adding capability so often seem to add friction too?</p>
            </div>

            <p>Eventually, those questions stopped being complaints and started becoming design requirements.</p>

            <p>That is where Pipit came from.</p>

            <p>
              We began building the kind of salon software we wished we had been using: software
              designed around the way a salon actually operates, with enough capability to run a
              real team without making the experience unnecessarily difficult.
            </p>

            <p>That is what we mean when we say:</p>

            <p className="article-pullquote">Salon software that actually makes sense.</p>

            <p>It does not mean &quot;simple&quot; in the sense of bare-bones.</p>

            <p>It means understandable.</p>

            <p>It means the next step should usually be obvious.</p>

            <p>It means common tasks should feel natural.</p>

            <p>
              It means the software should help your team do its work instead of forcing your team
              to become experts in the software.
            </p>

            <p>And it means complexity should have to earn its place.</p>

            <p>
              We are still building Pipit, and we are still learning. We are not claiming to have
              every answer.
            </p>

            <p>
              But we do have one advantage we care deeply about: we are building it from the
              perspective of people who actually have to use salon software to run a salon.
            </p>

            <p>That changes the questions we ask.</p>

            <p>Instead of asking, &quot;How many features can we add?&quot;</p>

            <p>We are more interested in asking:</p>

            <p className="article-pullquote">Does this make the salon easier to run?</p>

            <p>That is the standard we are trying to build around.</p>

            <p>And, for us, that is where salon software starts making sense again.</p>
          </div>

          <footer className="article-footer">
            <BrandLogo className="article-logo" variant="footer" />
            <div>
              <h2>Be one of the first salons on Pipit.</h2>
              <p>
                Read the homepage for more about what we are building, or join the early access
                list if this sounds like the kind of salon software you have been waiting for.
              </p>
            </div>
            <div className="cta-row">
              <AnalyticsLink
                className="button button-primary"
                eventName="article_get_early_access_click"
                href="/#early-access"
              >
                Join the Pipit List
              </AnalyticsLink>
              <Link className="button button-secondary" href="/">
                Back to homepage
              </Link>
            </div>
          </footer>
        </article>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: articleHeadline,
              description,
              url: `${siteConfig.productionDomain.replace(/\/$/, "")}/why-we-built-pipit`,
              publisher: {
                "@type": "Organization",
                name: "Pipit",
                url: siteConfig.productionDomain,
              },
              mainEntityOfPage: `${siteConfig.productionDomain.replace(/\/$/, "")}/why-we-built-pipit`,
            }),
          }}
        />
      </main>
      <Footer />
    </>
  );
}

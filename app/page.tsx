import { BrandLogo } from "@/components/ui/brand-logo";
import { AnalyticsLink } from "@/components/analytics/analytics-link";
import { EarlyAccessForm } from "@/components/forms/early-access-form";
import { Faq } from "@/components/marketing/faq";
import { Footer } from "@/components/marketing/footer";
import { MarketingNav } from "@/components/marketing/nav";
import { siteContent } from "@/content/site";

export default function Home() {
  return (
    <>
      <MarketingNav />
      <main>
        <section className="hero section-shell" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">{siteContent.hero.eyebrow}</p>
            <h1 id="hero-title">{siteContent.hero.headline}</h1>
            <p className="hero-subhead">{siteContent.hero.subhead}</p>
            <p className="hero-support">{siteContent.hero.supportingCopy}</p>
            <div className="cta-row">
              <AnalyticsLink
                className="button button-primary"
                href="#early-access"
                eventName="hero_get_early_access_click"
              >
                {siteContent.ctas.primary}
              </AnalyticsLink>
              <AnalyticsLink
                className="button button-secondary"
                href="#our-story"
                eventName="hero_secondary_cta_click"
              >
                {siteContent.ctas.secondary}
              </AnalyticsLink>
            </div>
            <p className="microcopy">{siteContent.hero.smallLine}</p>
          </div>
          <div className="hero-visual" aria-label="Pipit brand and product preview">
            <div className="hero-logo-frame">
              <BrandLogo priority />
            </div>
            <ProductPreview />
          </div>
        </section>

        <section className="value-strip" aria-labelledby="value-title">
          <div className="section-shell compact">
            <h2 id="value-title">{siteContent.valueStrip.headline}</h2>
            <div className="three-grid">
              {siteContent.valueStrip.items.map((item) => (
                <article className={`mini-card ${item.title.toLowerCase()}`} key={item.title}>
                  <span className="dot" aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell split-section" id="why-pipit" aria-labelledby="problem-title">
          <div>
            <p className="eyebrow">{siteContent.problem.eyebrow}</p>
            <h2 id="problem-title">{siteContent.problem.headline}</h2>
            <p className="section-lede">{siteContent.problem.supportingLine}</p>
            {siteContent.problem.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="closing-line">{siteContent.problem.closingLine}</p>
          </div>
          <div className="stacked-cards">
            {siteContent.problem.cards.map((card) => (
              <article className="rounded-card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="story-band" id="our-story" aria-labelledby="story-title">
          <div className="section-shell split-section">
            <div>
              <p className="eyebrow">{siteContent.origin.eyebrow}</p>
              <h2 id="story-title">{siteContent.origin.headline}</h2>
              {siteContent.origin.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <blockquote>{siteContent.origin.quote}</blockquote>
          </div>
        </section>

        <section className="section-shell" id="how-it-works" aria-labelledby="proof-title">
          <p className="eyebrow">{siteContent.productProof.eyebrow}</p>
          <h2 id="proof-title">{siteContent.productProof.headline}</h2>
          <div className="proof-grid">
            {siteContent.productProof.cards.map((card) => (
              <article className="screenshot-card" key={card.title}>
                <div className="placeholder-ui" aria-label="Illustrative product preview placeholder">
                  <span />
                  <span />
                  <span />
                </div>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell" aria-labelledby="pillars-title">
          <h2 id="pillars-title">{siteContent.pillars.headline}</h2>
          <div className="pillar-grid">
            {siteContent.pillars.items.map((item) => (
              <article className="pillar" key={item.title}>
                <p className="pillar-kicker">{item.title}</p>
                <h3>{item.headline}</h3>
                {item.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </article>
            ))}
          </div>
        </section>

        <section className="pricing-band" aria-labelledby="pricing-title">
          <div className="section-shell split-section">
            <div>
              <p className="eyebrow">{siteContent.pricing.eyebrow}</p>
              <h2 id="pricing-title">{siteContent.pricing.headline}</h2>
              {siteContent.pricing.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="callout">{siteContent.pricing.callout}</p>
              <AnalyticsLink
                className="button button-primary"
                href="#early-access"
                eventName="pricing_get_early_access_click"
              >
                {siteContent.ctas.primary}
              </AnalyticsLink>
            </div>
            <CommunicationsCard />
          </div>
        </section>

        <section className="section-shell split-section" aria-labelledby="switching-title">
          <div>
            <p className="eyebrow">{siteContent.switching.eyebrow}</p>
            <h2 id="switching-title">{siteContent.switching.headline}</h2>
            {siteContent.switching.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <aside className="support-card">
            <p>{siteContent.switching.callout}</p>
            <small>{siteContent.switching.qualifier}</small>
          </aside>
        </section>

        <section className="qualification-band" aria-labelledby="qualification-title">
          <div className="section-shell compact">
            <h2 id="qualification-title">{siteContent.qualification.headline}</h2>
            <ul className="checklist">
              {siteContent.qualification.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="closing-line">{siteContent.qualification.closingLine}</p>
            <AnalyticsLink
              className="button button-primary"
              href="#early-access"
              eventName="qualification_get_early_access_click"
            >
              {siteContent.ctas.primary}
            </AnalyticsLink>
          </div>
        </section>

        <section className="section-shell form-section" id="early-access" aria-labelledby="early-access-title">
          <div className="form-intro">
            <h2 id="early-access-title">{siteContent.earlyAccess.headline}</h2>
            {siteContent.earlyAccess.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <EarlyAccessForm />
        </section>

        <section className="section-shell" id="faq" aria-labelledby="faq-title">
          <h2 id="faq-title">FAQ</h2>
          <Faq items={siteContent.faq} />
        </section>

        <section className="final-cta" aria-labelledby="final-cta-title">
          <div className="section-shell compact">
            <BrandLogo className="final-logo" variant="cta" />
            <h2 id="final-cta-title">{siteContent.finalCta.headline}</h2>
            <p className="section-lede">{siteContent.finalCta.subhead}</p>
            <p>{siteContent.finalCta.body}</p>
            <AnalyticsLink
              className="button button-primary"
              href="#early-access"
              eventName="final_get_early_access_click"
            >
              {siteContent.ctas.primary}
            </AnalyticsLink>
            <p className="microcopy">{siteContent.finalCta.smallLine}</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ProductPreview() {
  return (
    <aside className="product-preview" aria-label="Illustrative Pipit product preview placeholder">
      <div className="preview-topbar">
        <span />
        <strong>Today</strong>
        <span />
      </div>
      <div className="preview-grid">
        <div className="preview-times">
          <span>9a</span>
          <span>11a</span>
          <span>1p</span>
          <span>3p</span>
        </div>
        <div className="preview-schedule">
          <div className="appointment pink">
            <strong>Color refresh</strong>
            <span>Marisol - Chair 2</span>
          </div>
          <div className="appointment yellow">
            <strong>Gel manicure</strong>
            <span>Front room</span>
          </div>
          <div className="appointment teal">
            <strong>New client cut</strong>
            <span>Ready for checkout</span>
          </div>
        </div>
      </div>
      <p>Product-preview placeholder. Approved screenshots will replace this area.</p>
    </aside>
  );
}

function CommunicationsCard() {
  return (
    <aside className="usage-card" aria-labelledby="usage-title">
      <p className="eyebrow">{siteContent.communications.eyebrow}</p>
      <h3 id="usage-title">{siteContent.communications.headline}</h3>
      {siteContent.communications.body.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="meter-card" aria-label="Illustrative text message usage">
        <div className="meter-header">
          <strong>Text Messages</strong>
          <span>742 / 1,000 included</span>
        </div>
        <div className="meter" aria-hidden="true">
          <span style={{ width: "74.2%" }} />
        </div>
        <p>258 included texts remaining</p>
        <p>At your current pace, you&apos;re projected to use approximately 1,080 texts this month.</p>
        <strong>Estimated overage: $1.60</strong>
      </div>
      <ul className="feature-list">
        {siteContent.communications.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <p className="microcopy">{siteContent.communications.disclaimer}</p>
      <p className="closing-line">{siteContent.communications.closingCopy}</p>
    </aside>
  );
}

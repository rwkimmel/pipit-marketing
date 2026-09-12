import { AnalyticsLink } from "@/components/analytics/analytics-link";
import { LogoPlaceholder } from "@/components/ui/logo-placeholder";
import { siteContent } from "@/content/site";

export function MarketingNav() {
  return (
    <header className="site-nav">
      <a href="#top" aria-label="Pipit home">
        <LogoPlaceholder />
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        {siteContent.nav.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
        <AnalyticsLink
          className="button button-primary"
          href="#early-access"
          eventName="nav_get_early_access_click"
        >
          {siteContent.ctas.primary}
        </AnalyticsLink>
      </nav>
    </header>
  );
}

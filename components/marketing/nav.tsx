"use client";

import { useState } from "react";
import { AnalyticsLink } from "@/components/analytics/analytics-link";
import { BrandLogo } from "@/components/ui/brand-logo";
import { siteContent } from "@/content/site";

export function MarketingNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="site-nav">
      <a className="nav-brand" href="#top" aria-label="Pipit home" onClick={closeMenu}>
        <BrandLogo className="nav-logo" priority variant="nav" />
      </a>
      <button
        aria-controls="primary-navigation"
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        className="menu-toggle"
        onClick={() => setIsMenuOpen((current) => !current)}
        type="button"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
      <nav
        className={`nav-links ${isMenuOpen ? "is-open" : ""}`}
        id="primary-navigation"
        aria-label="Primary navigation"
      >
        {siteContent.nav.map((item) => (
          <a href={item.href} key={item.href} onClick={closeMenu}>
            {item.label}
          </a>
        ))}
        <AnalyticsLink
          className="button button-primary"
          href="#early-access"
          eventName="nav_get_early_access_click"
          onClick={closeMenu}
        >
          {siteContent.ctas.primary}
        </AnalyticsLink>
      </nav>
    </header>
  );
}

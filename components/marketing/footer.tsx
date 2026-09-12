import { BrandLogo } from "@/components/ui/brand-logo";
import { siteContent } from "@/content/site";

export function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <BrandLogo className="footer-logo" variant="footer" />
          <p>{siteContent.footer.tagline}</p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          {siteContent.footer.links.map((link) => (
            <a href={link.href} key={link.label}>
              {link.label}
            </a>
          ))}
        </nav>
        <p>{siteContent.footer.copyright}</p>
      </div>
    </footer>
  );
}

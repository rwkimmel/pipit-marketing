import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  variant?: "hero" | "footer" | "cta";
};

export function BrandLogo({ className = "", priority = false, variant = "hero" }: BrandLogoProps) {
  const altText =
    variant === "footer" ? "Pipit" : "Pipit logo with teal bird mascot and wordmark";

  return (
    <Image
      alt={altText}
      className={`brand-logo-image ${className}`}
      height={1024}
      priority={priority}
      src="/brand/pipit-logo-primary.png"
      width={1536}
    />
  );
}

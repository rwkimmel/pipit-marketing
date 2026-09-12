import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  variant?: "hero" | "footer" | "cta" | "nav";
};

export function BrandLogo({ className = "", priority = false, variant = "hero" }: BrandLogoProps) {
  const config = getBrandLogoConfig(variant);

  return (
    <Image
      alt={config.alt}
      className={`brand-logo-image ${className}`}
      height={config.height}
      priority={priority}
      src={config.src}
      width={config.width}
    />
  );
}

function getBrandLogoConfig(variant: NonNullable<BrandLogoProps["variant"]>) {
  if (variant === "nav") {
    return {
      alt: "",
      height: 724,
      src: "/brand/Pipit Horizontal lockup logo.png",
      width: 2172,
    };
  }

  if (variant === "footer" || variant === "cta") {
    return {
      alt: variant === "footer" ? "Pipit" : "Pipit logo",
      height: 724,
      src: "/brand/Pipit dark background reversed treatment logo.png",
      width: 2172,
    };
  }

  return {
    alt: "Pipit logo with teal bird mascot and wordmark",
    height: 1024,
    src: "/brand/Pipit stacked transparent logo.png",
    width: 1536,
  };
}

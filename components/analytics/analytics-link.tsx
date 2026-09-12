"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { AnalyticsEventName, AnalyticsPayload } from "@/lib/analytics";
import { trackEvent } from "@/lib/analytics";

type AnalyticsLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  eventName: AnalyticsEventName;
  payload?: AnalyticsPayload;
};

export function AnalyticsLink({
  children,
  eventName,
  payload,
  onClick,
  ...props
}: AnalyticsLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackEvent(eventName, payload);
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}

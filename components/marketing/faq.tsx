"use client";

import { useId, useState } from "react";
import type { AnalyticsEventName } from "@/lib/analytics";
import { trackEvent } from "@/lib/analytics";
import { AnalyticsLink } from "@/components/analytics/analytics-link";

type FaqItem = {
  question: string;
  answer: string;
  earlyAccessLink?: boolean;
};

export function Faq({ items }: { items: readonly FaqItem[] }) {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const idPrefix = useId();

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = openQuestion === item.question;
        const buttonId = `${idPrefix}-faq-button-${index}`;
        const panelId = `${idPrefix}-faq-panel-${index}`;

        return (
          <div className="faq-item" key={item.question}>
            <button
              aria-controls={panelId}
              aria-expanded={isOpen}
              className="faq-button"
              id={buttonId}
              onClick={() => {
                const nextOpen = isOpen ? null : item.question;
                setOpenQuestion(nextOpen);
                if (nextOpen) {
                  trackEvent("faq_opened" satisfies AnalyticsEventName, {
                    question: item.question,
                  });
                }
              }}
              type="button"
            >
              <span>{item.question}</span>
              <span aria-hidden="true">{isOpen ? "-" : "+"}</span>
            </button>
            {isOpen ? (
              <div
                aria-labelledby={buttonId}
                className="faq-panel"
                id={panelId}
                role="region"
              >
                <p>
                  {item.answer}
                  {item.earlyAccessLink ? (
                    <>
                      {" "}
                      <AnalyticsLink
                        className="inline-link"
                        href="/#early-access"
                        eventName="faq_get_early_access_click"
                        payload={{ question: item.question }}
                      >
                        Get Early Access.
                      </AnalyticsLink>
                    </>
                  ) : null}
                </p>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

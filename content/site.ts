import type { AnalyticsEventName } from "@/lib/analytics";

export const siteContent = {
  nav: [
    { label: "Why Pipit", href: "#why-pipit" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Our Story", href: "#our-story" },
    { label: "FAQ", href: "#faq" },
  ],
  ctas: {
    primary: "Get Early Access",
    secondary: "See Why We're Building Pipit",
  },
  hero: {
    eyebrow: "BUILT BY SALON OWNERS",
    headline: "Salon software that actually makes sense.",
    subhead: "One location. Your whole team. One simple price.",
    supportingCopy:
      "Booking, scheduling, checkout, clients, staff, reporting and the tools you actually need-without paying more every time your salon grows.",
    smallLine:
      "Pipit is getting ready for its first salons. Join the list to help shape what comes next.",
  },
  valueStrip: {
    headline:
      "Easy to learn. Capable enough to run your salon. Priced like software shouldn't cost a fortune.",
    items: [
      {
        title: "Easy",
        copy: 'Less hunting. Less training. More "oh, that makes sense."',
      },
      {
        title: "Capable",
        copy: "Scheduling, checkout, clients, staff and real salon operations.",
      },
      {
        title: "Fair",
        copy: "Simple per-location pricing. Your bill doesn't grow every time your team does.",
      },
    ],
  },
  problem: {
    eyebrow: "WHY WE BUILT PIPIT",
    headline: "Running a salon is complicated enough.",
    supportingLine: "Your software shouldn't make it harder.",
    body: [
      "Somewhere along the way, salon software became expensive, complicated and packed with things that take too many clicks, too much training and too much patience.",
      "We know because we run a salon too.",
    ],
    cards: [
      {
        title: "Why does everything take so many clicks?",
        copy: "Moving an appointment shouldn't feel like solving a puzzle.",
      },
      {
        title: "Why does hiring someone increase my software bill?",
        copy: "Growing your team should be good news.",
      },
      {
        title: "Why do I need training just to find the setting?",
        copy: "Software should work the way people expect it to work.",
      },
    ],
    closingLine: "So we started fixing ours. Eventually, that became Pipit.",
  },
  origin: {
    eyebrow: "BUILT IN A SALON. NOT A CONFERENCE ROOM.",
    headline:
      "We didn't set out to build salon software. We set out to fix ours.",
    body: [
      "Pipit started inside a working salon.",
      "We were using powerful salon software, paying hundreds of dollars every month-and still running into everyday things that were harder than they needed to be.",
      "So we started building.",
      "First, we solved problems for ourselves. Then we solved the next one. And the next one.",
      "Real appointments. Real clients. Real employees. Real payments. Real scheduling conflicts. Real front-desk mistakes. Real Saturday mornings when everything has to work.",
      "That's how Pipit became what it is today.",
    ],
    quote:
      "Salon software designed from actual salon problems-not a list of features somebody thought salons might need.",
  },
  productProof: {
    eyebrow: "MEET PIPIT",
    headline: "The simple part is what you see. The powerful part is underneath.",
    cards: [
      {
        title: "A schedule you can actually read.",
        copy: "See what's happening, make changes quickly and keep the day moving.",
      },
      {
        title: "Booking without the gymnastics.",
        copy: "Help clients find the right service, person and time without turning booking into homework.",
      },
      {
        title: "Checkout that keeps up with the front desk.",
        copy: "Services, tips, payments and the messy real-life situations that happen when clients check out.",
      },
    ],
  },
  pillars: {
    headline:
      "Salon software doesn't have to choose between simple and capable.",
    items: [
      {
        title: "Easy",
        headline: "It should make sense.",
        body: [
          "Pipit is designed around the way salon teams actually work-not around software terminology.",
        ],
      },
      {
        title: "Capable",
        headline: "Simple doesn't mean stripped down.",
        body: [
          "Pipit grew up running a real salon. Scheduling, clients, checkout, staff, reporting and the complicated edge cases that don't show up in a software demo all matter.",
        ],
      },
      {
        title: "Fair",
        headline: "You shouldn't be punished for growing.",
        body: [
          "Simple per-location pricing. No per-employee penalty. No mystery bill.",
        ],
      },
    ],
  },
  pricing: {
    eyebrow: "PRICING WITHOUT THE PUZZLE",
    headline: "Your salon got bigger. Why did your software bill have to?",
    body: [
      "Our plan is simple:",
      "One location. Your whole team. One price.",
      "No paying more just because you hired another technician.",
      "No maze of plans where the feature you actually need is mysteriously in the next tier.",
      "No giant software bill simply because your business is doing well.",
    ],
    callout: "Founding salons will receive special early pricing.",
  },
  communications: {
    eyebrow: "NO GOTCHAS",
    headline: "Nobody likes a surprise bill.",
    body: [
      "Texting costs money. Pretending it doesn't is how software companies end up hiding costs somewhere else.",
      "We'd rather just tell you.",
      "Our planned communications pricing includes a generous monthly text allowance with straightforward per-text pricing after that.",
      "And you'll always be able to see where you stand.",
    ],
    features: [
      "Usage meter",
      "Warnings before overages",
      "Optional spending cap",
      "Warning before you hit your cap",
    ],
    disclaimer:
      "Illustrative marketing UI only. This is not a claim about existing implementation.",
    closingCopy: "We're salon owners. We get it.",
  },
  switching: {
    eyebrow: "THE PART EVERYONE DREADS",
    headline: "Switching salon software shouldn't be a nightmare either.",
    body: [
      "We know your business lives inside your current system.",
      "Clients. Appointments. Services. Staff. History.",
      "We're designing Pipit's onboarding around helping salons move safely-not handing you an empty account and wishing you luck.",
    ],
    callout: "Founding salons will receive hands-on onboarding and migration help.",
    qualifier: "Exact migration support will depend on the system you're coming from.",
  },
  qualification: {
    headline: "Does this sound like your salon?",
    checklist: [
      "You run a team-not just yourself.",
      "Your current software technically works, but you're tired of fighting with it.",
      "Your software bill keeps climbing.",
      "Training new front-desk staff takes longer than it should.",
      "You've considered switching before...and then thought about everything involved.",
      "You want powerful software without enterprise-software nonsense.",
    ],
    closingLine: "We might be building Pipit for you.",
  },
  earlyAccess: {
    headline: "Be one of the first salons on Pipit.",
    intro: [
      "We're starting small.",
      "Before Pipit opens broadly, we'll work closely with a handful of salons to make sure it works just as well outside ours as it does inside it.",
      "Tell us a little about your business.",
    ],
    businessTypes: ["Hair Salon", "Nail Salon", "Waxing", "Lashes / Brows", "Spa", "Other"],
    locations: ["1", "2", "3-5", "6+"],
    providers: ["1-3", "4-7", "8-15", "16-25", "26-40", "41+"],
    software: [
      "Vagaro",
      "Zenoti",
      "Boulevard",
      "Mangomint",
      "GlossGenius",
      "Fresha",
      "Square",
      "Phorest",
      "Meevo",
      "Mindbody",
      "Other",
      "None",
    ],
    spend: [
      "Under $50",
      "$50-99",
      "$100-199",
      "$200-399",
      "$400-699",
      "$700+",
      "Not sure / Prefer not to say",
    ],
    submit: "Join the Pipit List",
    successHeadline: "You're in.",
    successBody:
      "Thanks for telling us about your salon. We'll keep you posted as Pipit gets closer to welcoming its first salons.",
  },
  faq: [
    {
      question: "When can I use Pipit?",
      answer:
        "Pipit is currently being prepared for its first salons. We're starting with a small group so we can give them hands-on attention before opening more broadly.",
    },
    {
      question: "How much will Pipit cost?",
      answer:
        "We're building Pipit around simple, affordable per-location pricing-not per-employee pricing. Founding salons will receive special early pricing. We'll share final commercial pricing before anyone has to make a decision.",
    },
    {
      question: "Will I pay more when I add employees?",
      answer:
        "Our core pricing philosophy is per location, not per employee. Growing your team shouldn't automatically grow your software bill.",
    },
    {
      question: "What kinds of salons is Pipit for?",
      answer:
        "We're initially focused on team-based beauty businesses including nail salons, hair salons, waxing, lashes/brows and spas.",
    },
    {
      question: "Will you help me move from my current software?",
      answer:
        "That's the goal. We know switching is one of the biggest reasons salons stay with software they don't love. We're designing the onboarding process around helping salons make that move safely. The exact data we're able to migrate will depend on the system you're coming from.",
    },
    {
      question: "Does Pipit include text messaging?",
      answer:
        "Communications are part of the platform we're building. Because text messages have real usage costs, we plan to price them transparently rather than hiding those costs in your subscription.",
    },
    {
      question: "Is Pipit already running a salon?",
      answer:
        "Yes. Pipit grew from software built to run a working salon. That's where we learn what works-and what needs fixing.",
    },
  ],
  finalCta: {
    headline: "Running your salon is complicated enough.",
    subhead: "Your software shouldn't be.",
    body: "Be one of the first salons to try Pipit.",
    smallLine: "Built by salon owners. For salon owners.",
  },
  footer: {
    tagline: "Salon software that actually makes sense.",
    links: [
      { label: "Early Access", href: "#early-access" },
      { label: "Our Story", href: "#our-story" },
      { label: "Privacy", href: "#footer" },
      { label: "Terms", href: "#footer" },
      { label: "Contact", href: "#footer" },
    ],
    copyright: "© 2026 Pipit",
  },
} as const;

export const ctaEvents = {
  nav: "nav_get_early_access_click",
  hero: "hero_get_early_access_click",
  heroSecondary: "hero_secondary_cta_click",
  pricing: "pricing_get_early_access_click",
  qualification: "qualification_get_early_access_click",
  final: "final_get_early_access_click",
} satisfies Record<string, AnalyticsEventName>;

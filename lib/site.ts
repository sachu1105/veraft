/**
 * Single source of truth for site-wide constants: identity, contact,
 * and navigation. Imported by Header, Footer, metadata, and JSON-LD.
 */

export const site = {
  name: "Veraft",
  domain: "veraft.com",
  url: "https://veraft.com",
  tagline: "AI-first software studio",
  description:
    "Veraft designs and builds custom web applications, business platforms, and AI systems that automate repetitive work and improve how customers experience your business.",
  email: "veraftio@gmail.com",
  // TODO: replace with the real registered location.
  location: "Remote-first · India",
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

/** Primary header navigation. */
export const primaryNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Approach", href: "/approach" },
  { label: "About", href: "/about" },
];

/** The four service pillars — reused on /, /services, detail pages, and nav. */
export type Pillar = {
  slug: string;
  title: string;
  href: string;
  summary: string;
  lead: string;
  offerings: string[];
};

export const pillars: Pillar[] = [
  {
    slug: "ai-solutions",
    title: "AI Solutions",
    href: "/services/ai-solutions",
    summary:
      "Assistants and knowledge systems trained on your business — quietly handling the questions your team answers all day.",
    lead: "A support assistant that resolves the routine tickets before they reach a person.",
    offerings: [
      "Customer-facing chatbots",
      "Support assistants",
      "Knowledge-base AI",
      "Internal company assistants",
      "Document search",
      "Voice assistants",
    ],
  },
  {
    slug: "custom-software",
    title: "Custom Software",
    href: "/services/custom-software",
    summary:
      "Internal tools and platforms built around how your team actually works — not bent to fit off-the-shelf software.",
    lead: "An operations dashboard that replaces the spreadsheet everyone is quietly afraid of.",
    offerings: [
      "CRM systems",
      "ERP modules",
      "HR software",
      "Inventory systems",
      "Admin dashboards",
      "Customer & partner portals",
    ],
  },
  {
    slug: "web-development",
    title: "Web Development",
    href: "/services/web-development",
    summary:
      "Fast, accessible, well-built web products — from marketing sites to full SaaS applications.",
    lead: "A SaaS product that feels considered on the first click and holds up under real traffic.",
    offerings: [
      "Corporate websites",
      "SaaS products",
      "Landing pages",
      "E-commerce",
      "Web applications",
      "Design systems",
    ],
  },
  {
    slug: "automation",
    title: "Automation",
    href: "/services/automation",
    summary:
      "Connect the tools you already use and let the repetitive work run itself — reliably, in the background.",
    lead: "An agent that moves data between your systems so no one has to copy and paste it again.",
    offerings: [
      "Workflow automation",
      "API integration",
      "Business process automation",
      "AI agents",
      "Email automation",
      "Scheduled & event-driven jobs",
    ],
  },
];

export function getPillar(slug: string): Pillar | undefined {
  return pillars.find((p) => p.slug === slug);
}

export const social = [
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "GitHub", href: "https://github.com/" },
  { label: "X", href: "https://x.com/" },
] as const;

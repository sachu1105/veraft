/**
 * Single source of truth for site-wide constants: identity, contact,
 * navigation and the four service pillars. Imported by Header, Footer,
 * metadata, sitemap and JSON-LD.
 */

export const site = {
  name: "Veraft",
  domain: "veraft.com",
  // Set NEXT_PUBLIC_SITE_URL in production if the domain differs.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://veraft.com").replace(/\/$/, ""),
  tagline: "Software built brick by brick with AI agents",
  description:
    "Veraft plans, builds, integrates, secures and deploys your software end-to-end with AI agents like Claude, ChatGPT and DeepSeek — reviewed by engineers and priced by the tokens we actually burn.",
  email: "veraftio@gmail.com",
  // TODO: replace with the real registered location.
  location: "Remote-first · India",
} as const;

export type NavItem = {
  label: string;
  href: string;
};

/** Primary header navigation. */
export const primaryNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "How we work", href: "/approach" },
  { label: "Pricing", href: "/pricing" },
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
    slug: "web-development",
    title: "Web apps & SaaS",
    href: "/services/web-development",
    summary:
      "Production-grade web apps, SaaS products, dashboards and internal tools — built by AI agents, reviewed by engineers.",
    lead: "A SaaS MVP with sign-up, billing and an admin panel — live on your domain, not stuck in a chat window.",
    offerings: [
      "SaaS products & MVPs",
      "Web applications",
      "Admin dashboards & internal tools",
      "Customer & partner portals",
      "Marketing sites & landing pages",
      "E-commerce",
    ],
  },
  {
    slug: "ai-solutions",
    title: "AI features & agents",
    href: "/services/ai-solutions",
    summary:
      "Chatbots, copilots and agents grounded in your own data — wired into the product and tools you already have.",
    lead: "A support agent that answers from your docs and hands off to a person with the full context attached.",
    offerings: [
      "Customer support agents",
      "Knowledge-base search (RAG)",
      "Internal copilots",
      "Document extraction",
      "AI features in existing apps",
      "Model selection & evals",
    ],
  },
  {
    slug: "automation",
    title: "Integrations & automation",
    href: "/services/automation",
    summary:
      "Connect payments, email, CRMs and APIs, then let the repetitive work run itself — reliably, in the background.",
    lead: "Orders flow from your store into accounting and email — no copy-paste, no missed steps.",
    offerings: [
      "Payments (Stripe, Razorpay)",
      "Email & notifications",
      "CRM & ERP integrations",
      "Third-party & internal APIs",
      "Workflow automation",
      "Scheduled & event-driven jobs",
    ],
  },
  {
    slug: "deployment",
    title: "Deploy & maintain",
    href: "/services/deployment",
    summary:
      "Hosting, CI/CD, domains, monitoring and ongoing care — so launch day isn't the last day anyone looks after it.",
    lead: "A release pipeline that tests, deploys and alerts — and a team that fixes it when something breaks.",
    offerings: [
      "Cloud setup (AWS, Vercel, GCP)",
      "CI/CD pipelines",
      "Domains, SSL & email setup",
      "Monitoring & error tracking",
      "Backups & security patches",
      "Monthly care plans",
    ],
  },
];

export function getPillar(slug: string): Pillar | undefined {
  return pillars.find((p) => p.slug === slug);
}

/**
 * Public profiles. Only entries with a real `href` are rendered and added to
 * the Organization JSON-LD `sameAs` — placeholder URLs would hurt SEO.
 * TODO: fill these in once the profiles exist.
 */
export const social: { label: string; href: string }[] = [
  { label: "LinkedIn", href: "" },
  { label: "GitHub", href: "" },
  { label: "X", href: "" },
].filter((s) => s.href);

/**
 * Single source of truth for site-wide constants: identity, contact,
 * navigation and the service pillars. Imported by Header, Footer,
 * metadata, sitemap and JSON-LD.
 */

export const site = {
  name: "Veraft",
  domain: "veraft.com",
  // Set NEXT_PUBLIC_SITE_URL in production if the domain differs.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://veraft.com").replace(/\/$/, ""),
  tagline: "AI-native product engineering",
  /** The brand line, used in the hero, footer and social image. */
  headline: "Build better products. Move faster.",
  description:
    "Veraft is an AI-native product engineering company helping businesses design, build and launch production-ready software through intelligent AI workflows and specialised engineering expertise.",
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
  { label: "How we build", href: "/approach" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

/** The service pillars — reused on /, /services, detail pages, and nav. */
export type Pillar = {
  slug: string;
  title: string;
  href: string;
  /** One short line for compact cards (home services grid). */
  tagline: string;
  summary: string;
  lead: string;
  offerings: string[];
};

export const pillars: Pillar[] = [
  {
    slug: "mvp",
    title: "MVP & startup development",
    href: "/services/mvp",
    tagline: "From idea to a market-ready MVP.",
    summary:
      "Turn an idea into a market-ready MVP — discovery, feasibility, design, build, testing and launch.",
    lead: "A founder's idea, scoped and designed, then live as an MVP real users can sign up to.",
    offerings: [
      "Product discovery",
      "Technical feasibility",
      "MVP architecture",
      "UI/UX design",
      "Rapid development",
      "Testing & launch",
    ],
  },
  {
    slug: "web-development",
    title: "Custom software & web apps",
    href: "/services/web-development",
    tagline: "SaaS, portals, dashboards and internal tools.",
    summary:
      "Purpose-built software around your business — SaaS products, business systems, portals and internal tools.",
    lead: "A SaaS product with sign-up, billing and an admin panel — built around how your business actually works.",
    offerings: [
      "SaaS applications",
      "Business management systems",
      "Dashboards & internal tools",
      "Customer portals",
      "APIs & third-party integrations",
      "Modernising existing apps",
    ],
  },
  {
    slug: "ai-solutions",
    title: "AI-powered products",
    href: "/services/ai-solutions",
    tagline: "Assistants, agents and AI features.",
    summary:
      "Products with AI built in — assistants, agents, document intelligence and search, grounded in your own data.",
    lead: "A support assistant that answers from your docs and hands off to a person with the full context attached.",
    offerings: [
      "AI assistants & agents",
      "Document intelligence",
      "AI-powered search",
      "Recommendation systems",
      "LLM integrations",
      "Workflow automation",
    ],
  },
  {
    slug: "product-design",
    title: "UI/UX & product design",
    href: "/services/product-design",
    tagline: "Research, journeys and design systems.",
    summary:
      "Intuitive, accessible product experiences — from research and user journeys to a complete design system.",
    lead: "A booking flow mapped, wireframed and designed — clear on every screen, usable by everyone.",
    offerings: [
      "Product research",
      "User journeys",
      "Wireframes",
      "Design systems",
      "Responsive interfaces",
      "Accessibility",
    ],
  },
  {
    slug: "security",
    title: "Security & performance",
    href: "/services/security",
    tagline: "Secure, fast and tested before launch.",
    summary:
      "Products ready for real-world use — secure access, protected data, fast responses and automated tests.",
    lead: "An app reviewed for security and speed, the fixes made, and tests in place to keep it that way.",
    offerings: [
      "Authentication & access control",
      "Secure API design",
      "Input validation",
      "Database optimisation",
      "Application performance",
      "Automated tests & security reviews",
    ],
  },
  {
    slug: "deployment",
    title: "Deployment & infrastructure",
    href: "/services/deployment",
    tagline: "Cloud, release pipelines, monitoring, support.",
    summary:
      "From development to production — cloud setup, release pipelines, monitoring, backups and ongoing support.",
    lead: "A release pipeline that tests, deploys and alerts — and a team that fixes it when something breaks.",
    offerings: [
      "Cloud deployment",
      "CI/CD pipelines",
      "Infrastructure configuration",
      "SSL & HTTPS",
      "Monitoring & backups",
      "Maintenance & support",
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

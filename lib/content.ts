/**
 * Editorial content shared across routes. Copy lives here (not in
 * components) so it can be edited in one place.
 *
 * Positioning: Veraft is an AI-native product engineering company — not an
 * AI coding tool, a freelance marketplace or a traditional agency. Clients
 * buy outcomes, delivery and engineering accountability; AI usage is an
 * internal cost metric (optionally reported), never the billing unit.
 */

/* ------------------------------------------------------------------ */
/* AI models                                                           */
/* ------------------------------------------------------------------ */

/** Models we orchestrate. Text wordmarks only — no third-party logos. */
export const models = [
  {
    name: "Claude",
    maker: "Anthropic",
    useFor: "Reasoning, architecture and review.",
  },
  {
    name: "ChatGPT",
    maker: "OpenAI",
    useFor: "Interface copy, tooling and tests.",
  },
  {
    name: "DeepSeek",
    maker: "DeepSeek",
    useFor: "High-volume, well-scoped code.",
  },
  {
    name: "Gemini",
    maker: "Google",
    useFor: "Reading large codebases and specs.",
  },
  {
    name: "Open models",
    maker: "Llama · Qwen · Mistral",
    useFor: "Self-hosted, data stays in-house.",
  },
] as const;

/** Intelligence allocated by task: the right tier for each job. */
export const modelTiers = [
  { tier: "Lightweight models", task: "Straightforward, well-defined tasks" },
  { tier: "Advanced coding models", task: "Complex implementation" },
  { tier: "Reasoning models", task: "Architecture and technical decisions" },
  { tier: "Specialised models", task: "Specific engineering tasks" },
  { tier: "Senior engineers", task: "Every critical decision" },
] as const;

/** How we keep AI spend lean without lowering the bar. */
export const costPrinciples = [
  "Model chosen by task complexity",
  "Only the context each task needs",
  "Reusable engineering templates",
  "Shared project knowledge",
  "Caching where appropriate",
  "A budget for AI usage",
  "Automated quality checks",
] as const;

export const aiVsEngineer = {
  ai: [
    "Drafts requirements, schemas and API contracts",
    "Writes application code, tests and documentation",
    "Generates interface variations and copy",
    "Runs checks, triages errors and proposes fixes",
  ],
  engineers: [
    "Shape scope and architecture with you",
    "Review every change before it ships",
    "Own security, data and deployment decisions",
    "Stay accountable for what ships",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* The seven-stage methodology                                         */
/* ------------------------------------------------------------------ */

export type Stage = {
  id: string;
  title: string;
  summary: string;
  deliverable: string;
  /** Specialisations or validation areas, where the stage has them. */
  focus?: readonly string[];
};

export const stages: Stage[] = [
  {
    id: "discover",
    title: "Discover",
    summary: "Your business, users, requirements and goals.",
    deliverable: "Product requirement specification",
  },
  {
    id: "architect",
    title: "Architect",
    summary: "Architecture, data, APIs, security and roadmap.",
    deliverable: "Technical architecture and plan",
  },
  {
    id: "design",
    title: "Design",
    summary: "User journeys, wireframes and the interface.",
    deliverable: "Product design and design system",
  },
  {
    id: "engineer",
    title: "Engineer",
    summary: "Specialised, AI-assisted engineering workflows.",
    deliverable: "Functional software product",
    focus: ["Frontend", "Backend", "Database", "AI", "Integrations"],
  },
  {
    id: "validate",
    title: "Validate",
    summary: "Structured QA and engineering review.",
    deliverable: "Tested release candidate",
    focus: [
      "Functionality",
      "Security",
      "Performance",
      "Accessibility",
      "API reliability",
      "Cross-device",
      "Maintainability",
    ],
  },
  {
    id: "deploy",
    title: "Deploy",
    summary: "Production infrastructure, then release.",
    deliverable: "Production deployment",
  },
  {
    id: "evolve",
    title: "Evolve",
    summary: "Monitor, maintain and improve on real usage.",
    deliverable: "Continuous product improvement",
  },
];

/* ------------------------------------------------------------------ */
/* Quality commitments                                                 */
/* ------------------------------------------------------------------ */

/** Operational commitments on every production product. */
export const qualityChecklist = [
  {
    area: "Security",
    items: [
      "Secure authentication",
      "Role-based access",
      "Input validation",
      "Secrets management",
      "Secure sessions",
      "Common-vulnerability protection",
    ],
  },
  {
    area: "Performance",
    items: [
      "Optimised database queries",
      "Efficient APIs",
      "Fast-loading pages",
      "Caching where it helps",
      "Scalable architecture",
    ],
  },
  {
    area: "User experience",
    items: [
      "Responsive design",
      "Accessibility",
      "A consistent design system",
      "Clear user journeys",
      "Error and loading states",
    ],
  },
  {
    area: "Reliability",
    items: [
      "Automated tests",
      "Error monitoring",
      "Logging",
      "Backups",
      "Deployment validation",
    ],
  },
  {
    area: "Ownership",
    items: [
      "Your agreed deliverables",
      "Source code handover",
      "Documentation",
      "Deployment and access handover",
    ],
  },
] as const;

/* ------------------------------------------------------------------ */
/* Engagement & pricing                                                */
/* ------------------------------------------------------------------ */

export const engagementSteps = [
  {
    title: "Share your idea",
    body: "A discovery call on your goals, users and requirements.",
  },
  {
    title: "Approve scope and budget",
    body: "A proposal with deliverables, timeline and price. You sign off.",
  },
  {
    title: "Receive deliverables",
    body: "Working, reviewed and tested software at every milestone.",
  },
  {
    title: "Launch and evolve",
    body: "Production release, full handover, optional ongoing support.",
  },
] as const;

export const engagementModels = [
  {
    title: "Fixed scope",
    body: "A clearly defined product, agreed deliverables, one price.",
    fit: "Well-defined products",
  },
  {
    title: "Milestone-based",
    body: "Payments tied to discovery, design, build, testing and launch.",
    fit: "MVPs and new products",
  },
  {
    title: "Dedicated engineering",
    body: "Ongoing engineering capacity for continuous development.",
    fit: "Growing products",
  },
  {
    title: "Maintenance & retainer",
    body: "Monitoring, maintenance, improvements and support.",
    fit: "Products after launch",
  },
] as const;

/** Illustrative milestone plan shown in the budget ledger visual. */
export const budgetExample = {
  project: "Clinic booking MVP",
  rows: [
    { stage: "Discover", share: 8, status: "done" },
    { stage: "Architect", share: 10, status: "done" },
    { stage: "Design", share: 15, status: "done" },
    { stage: "Engineer", share: 42, status: "active" },
    { stage: "Validate", share: 15, status: "next" },
    { stage: "Deploy", share: 10, status: "next" },
  ],
} as const;

export const pricingIncludes = [
  "Engineering review on every change",
  "Automated tests and a security review",
  "Deployment to your own cloud and domain",
  "Source code, docs and access handover",
  "A working preview at every milestone",
  "AI usage reporting, if you want it",
] as const;

/* ------------------------------------------------------------------ */
/* Why Veraft — the three alternatives                                  */
/* ------------------------------------------------------------------ */

export type Mark = "yes" | "partial" | "no";

export type ComparisonCell = { mark: Mark; note: string };

export const alternatives = ["Traditional agency", "Freelancer", "AI coding tools"] as const;

export const comparison: {
  label: string;
  others: [ComparisonCell, ComparisonCell, ComparisonCell];
  veraft: string;
}[] = [
  {
    label: "Speed to a working product",
    others: [
      { mark: "partial", note: "Manual cycles" },
      { mark: "partial", note: "One person's pace" },
      { mark: "yes", note: "Fast demos" },
    ],
    veraft: "AI-accelerated",
  },
  {
    label: "Frontend, backend, data, security",
    others: [
      { mark: "yes", note: "Full team" },
      { mark: "partial", note: "One or two skills" },
      { mark: "no", note: "Up to you" },
    ],
    veraft: "A specialist per layer",
  },
  {
    label: "Architecture, testing and review",
    others: [
      { mark: "yes", note: "Usually" },
      { mark: "partial", note: "Varies" },
      { mark: "no", note: "Often skipped" },
    ],
    veraft: "Built into every stage",
  },
  {
    label: "Deployment and production",
    others: [
      { mark: "yes", note: "Yes" },
      { mark: "partial", note: "Sometimes" },
      { mark: "no", note: "Left to you" },
    ],
    veraft: "End-to-end responsibility",
  },
  {
    label: "Cost efficiency",
    others: [
      { mark: "no", note: "High overhead" },
      { mark: "yes", note: "Affordable" },
      { mark: "yes", note: "Cheap to start" },
    ],
    veraft: "Optimised AI and delivery cost",
  },
];

/* ------------------------------------------------------------------ */
/* Who we build for                                                    */
/* ------------------------------------------------------------------ */

export const audiences = [
  {
    title: "Startup founders",
    need: "Validate an idea and launch an MVP without a full engineering team.",
  },
  {
    title: "Early-stage tech companies",
    need: "Ship new products and features faster than headcount allows.",
  },
  {
    title: "Small and medium businesses",
    need: "Replace manual processes with custom software and automation.",
  },
  {
    title: "Established businesses",
    need: "Modernise legacy systems and build new digital products.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Technology                                                          */
/* ------------------------------------------------------------------ */

// Only list tools we actually use on client work.
export const techStack = [
  { group: "Product", items: ["Next.js", "React", "TypeScript", "React Native"] },
  { group: "Backend", items: ["Node.js", "Python", "PostgreSQL", "Redis"] },
  { group: "AI", items: ["Claude · GPT · DeepSeek", "Retrieval (RAG)", "Vector search", "Evals"] },
  { group: "Platform", items: ["AWS", "Vercel", "Docker", "GitHub Actions"] },
] as const;

/* ------------------------------------------------------------------ */
/* FAQ                                                                  */
/* ------------------------------------------------------------------ */

export type Faq = { q: string; a: string };

export const homeFaqs: Faq[] = [
  {
    q: "How is pricing structured?",
    a: "Fixed scope, milestones, a dedicated team or a retainer — whichever fits. You approve the scope and budget before work starts.",
  },
  {
    q: "How long does a project take?",
    a: "It depends on scope. Every proposal includes a timeline, and you see working software at each milestone.",
  },
  {
    q: "Who owns the code?",
    a: "You do. Source code, documentation, deployment and access are handed over as agreed deliverables.",
  },
  {
    q: "Is AI-assisted software secure?",
    a: "Speed never replaces the fundamentals. Every release goes through engineering review, automated tests and a security review.",
  },
  {
    q: "Which AI models do you use?",
    a: "The right one for each task: lightweight models for simple work, advanced coding and reasoning models for complex work, engineers for critical decisions.",
  },
  {
    q: "Do you maintain products after launch?",
    a: "Yes. Maintenance plans cover monitoring, fixes and improvements based on real-world usage.",
  },
];

export const pricingFaqs: Faq[] = [
  {
    q: "Do you bill by the hour or by AI tokens?",
    a: "Neither by default. You pay for agreed scope and deliverables. AI usage is our cost to manage — we can report it transparently if you want.",
  },
  {
    q: "What if the scope changes?",
    a: "We estimate the change and you approve it before we start. The budget only moves when you say so.",
  },
  {
    q: "Are review, testing and deployment extra?",
    a: "No. Engineering review, testing and deployment are part of every engagement — never add-ons.",
  },
  {
    q: "Can we start small?",
    a: "Yes. Many projects start with discovery or an MVP, then move to milestones or a retainer.",
  },
];

/* ------------------------------------------------------------------ */
/* Per-service detail copy, keyed by pillar slug                       */
/* ------------------------------------------------------------------ */

export type ServiceDetail = {
  whoFor: string;
  approach: { title: string; body: string }[];
};

export const serviceDetails: Record<string, ServiceDetail> = {
  mvp: {
    whoFor:
      "For founders who need to validate an idea without hiring a full engineering team.",
    approach: [
      {
        title: "Scoped to what matters",
        body: "The smallest product that proves the idea.",
      },
      {
        title: "Built to grow",
        body: "Architecture that outlives the MVP, not a throwaway.",
      },
      {
        title: "Launch, then learn",
        body: "Live with real users, improved on real feedback.",
      },
    ],
  },
  "web-development": {
    whoFor:
      "For businesses that have outgrown spreadsheets and off-the-shelf tools.",
    approach: [
      {
        title: "Built around your requirements",
        body: "Your workflows, not a generic template.",
      },
      {
        title: "A specialist per layer",
        body: "Frontend, backend and data each get dedicated attention.",
      },
      {
        title: "Previews at every milestone",
        body: "A working build each milestone, not a slide deck.",
      },
    ],
  },
  "ai-solutions": {
    whoFor:
      "For teams who want AI inside their product — not a demo next to it.",
    approach: [
      {
        title: "Grounded in your data",
        body: "Answers come from your docs and systems, with sources.",
      },
      {
        title: "The right model per task",
        body: "Chosen for quality, cost and your data policy.",
      },
      {
        title: "Measured, not guessed",
        body: "Tested on real conversations, tracked for accuracy.",
      },
    ],
  },
  "product-design": {
    whoFor:
      "For new products starting right, and working products that are hard to use.",
    approach: [
      {
        title: "Research before pixels",
        body: "Designed around real users and their journeys.",
      },
      {
        title: "One design system",
        body: "Consistent components on every screen.",
      },
      {
        title: "Accessible by default",
        body: "Readable, keyboard-friendly and responsive.",
      },
    ],
  },
  security: {
    whoFor:
      "For products heading to production, and existing apps that feel slow or exposed.",
    approach: [
      {
        title: "Secure by design",
        body: "Access, validation and secrets handled from day one.",
      },
      {
        title: "Measured performance",
        body: "Queries, APIs and pages tuned against real numbers.",
      },
      {
        title: "Tested, not hoped",
        body: "Automated tests guard every release.",
      },
    ],
  },
  deployment: {
    whoFor:
      "For products — ours or yours — that need to get live and stay live.",
    approach: [
      {
        title: "Your cloud, your keys",
        body: "Hosting, database and domains in accounts you own.",
      },
      {
        title: "Automated releases",
        body: "Tested on every change, deployed with a merge.",
      },
      {
        title: "Watched after launch",
        body: "Monitoring, backups and patches after launch.",
      },
    ],
  },
};

/**
 * Editorial content shared across routes. Copy lives here (not in
 * components) so it can be edited in one place.
 */

/* ------------------------------------------------------------------ */
/* Agents                                                              */
/* ------------------------------------------------------------------ */

/** Models we work with. Text wordmarks only — no third-party logos. */
export const models = [
  {
    name: "Claude",
    maker: "Anthropic",
    useFor: "Reasoning, refactors and review.",
  },
  {
    name: "ChatGPT",
    maker: "OpenAI",
    useFor: "UX copy, tooling and tests.",
  },
  {
    name: "DeepSeek",
    maker: "DeepSeek",
    useFor: "High-volume, well-scoped code.",
  },
  {
    name: "Gemini",
    maker: "Google",
    useFor: "Reading big codebases and specs.",
  },
  {
    name: "Open models",
    maker: "Llama · Qwen · Mistral",
    useFor: "Self-hosted, data stays in-house.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Pricing                                                             */
/* ------------------------------------------------------------------ */

/** Illustrative estimate shown in the token ledger visual. */
export const ledgerExample = {
  project: "Clinic booking MVP",
  cap: 3_000_000,
  rows: [
    { phase: "Plan & estimate", tokens: 180_000 },
    { phase: "Design", tokens: 260_000 },
    { phase: "Build", tokens: 1_150_000 },
    { phase: "Integrations", tokens: 340_000 },
    { phase: "Security & tests", tokens: 290_000 },
    { phase: "Deploy", tokens: 90_000 },
  ],
} as const;

export const pricingSteps = [
  {
    title: "Get an estimate",
    body: "Tokens per milestone, and a cap you set — before we start.",
  },
  {
    title: "Watch the meter",
    body: "Live usage as we go. Near the cap, we stop and ask.",
  },
  {
    title: "Pay for what's used",
    body: "Invoices show tokens actually burned — nothing more.",
  },
] as const;

export const pricingIncludes = [
  "Engineer review on every pull request",
  "Automated tests & security checks",
  "Deployment to your own cloud and domain",
  "Full ownership of code, repo and data",
  "A working preview at every milestone",
  "Handover docs your next developer can read",
] as const;

export const agencyComparison = [
  { label: "What you pay for", agency: "Hours on a timesheet", veraft: "Tokens our agents burn" },
  { label: "When you see the cost", agency: "On the monthly invoice", veraft: "Before we start, and live" },
  { label: "If it runs over", agency: "Usually your problem", veraft: "We stop at your cap and ask" },
  { label: "Speed", agency: "Limited by headcount", veraft: "Agents work in parallel" },
] as const;

/* ------------------------------------------------------------------ */
/* "Why not build it yourself with AI?"                                 */
/* ------------------------------------------------------------------ */

export type Mark = "yes" | "partial" | "no";

export const diyComparison: { label: string; diy: Mark; diyNote: string; veraft: string }[] = [
  {
    label: "A working demo",
    diy: "yes",
    diyNote: "Genuinely easy now",
    veraft: "Day one",
  },
  {
    label: "Auth, payments & APIs",
    diy: "partial",
    diyNote: "Each one is a rabbit hole",
    veraft: "Wired and tested",
  },
  {
    label: "Security & tests",
    diy: "no",
    diyNote: "Usually skipped",
    veraft: "On every milestone",
  },
  {
    label: "Someone to call when it breaks",
    diy: "no",
    diyNote: "It's you, at 2 a.m.",
    veraft: "Optional care plan",
  },
];

/* ------------------------------------------------------------------ */
/* Process, principles, stack                                          */
/* ------------------------------------------------------------------ */

export type ProcessStep = { id: string; title: string; teaser: string };

export const processSteps: ProcessStep[] = [
  {
    id: "brief",
    title: "Brief",
    teaser: "A short call: who it's for, what success looks like.",
  },
  {
    id: "estimate",
    title: "Estimate",
    teaser: "Milestones, a token estimate and your cap.",
  },
  {
    id: "build",
    title: "Build",
    teaser: "Agents build, engineers review every PR.",
  },
  {
    id: "ship",
    title: "Ship",
    teaser: "Secured, tested, live on your cloud.",
  },
  {
    id: "care",
    title: "Care",
    teaser: "Optional monitoring, fixes and features.",
  },
];

export const principles = [
  {
    title: "Agents for speed, people for judgment",
    body: "AI writes the code. Engineers own the result.",
  },
  {
    title: "Transparent by default",
    body: "The estimate, a live meter, every pull request.",
  },
  {
    title: "Production or nothing",
    body: "Auth, tests and docs in every brick.",
  },
  {
    title: "You own everything",
    body: "Code, repo, cloud and data stay yours.",
  },
] as const;

export const agentVsEngineer = {
  agents: [
    "Draft user stories, schemas and API contracts",
    "Write application code, tests and documentation",
    "Generate UI variations and microcopy",
    "Run audits, triage errors and propose fixes",
  ],
  engineers: [
    "Shape scope and architecture with you",
    "Review and approve every pull request",
    "Own security, data and deployment decisions",
    "Stay accountable for what ships",
  ],
} as const;

export const techStack = [
  { group: "Product", items: ["Next.js", "React", "TypeScript", "React Native"] },
  { group: "Backend", items: ["Node.js", "Python", "PostgreSQL", "Redis"] },
  { group: "AI", items: ["Claude · GPT · DeepSeek", "RAG pipelines", "Vector search", "Evals"] },
  { group: "Platform", items: ["AWS", "Vercel", "Docker", "GitHub Actions"] },
] as const;

/* ------------------------------------------------------------------ */
/* FAQ                                                                  */
/* ------------------------------------------------------------------ */

export type Faq = { q: string; a: string };

export const homeFaqs: Faq[] = [
  {
    q: "How does token-based pricing work?",
    a: "We estimate the tokens per milestone and you set a cap. We stop and ask before crossing it, and you pay only for what was used.",
  },
  {
    q: "Which AI models do you use?",
    a: "Claude, ChatGPT, DeepSeek, Gemini and open models — chosen per task. Self-hosted if your data has to stay in-house.",
  },
  {
    q: "Is AI-written code safe in production?",
    a: "With review, yes. An engineer reviews every pull request, and every milestone gets tests and a security pass.",
  },
  {
    q: "Who owns the code?",
    a: "You do. Repo, cloud accounts and data are yours from day one.",
  },
  {
    q: "How fast can you ship?",
    a: "Every estimate comes with a timeline, and you get a working preview at each milestone.",
  },
];

export const pricingFaqs: Faq[] = [
  {
    q: "Why tokens instead of hours?",
    a: "Tokens are what builds your product now, so the price tracks the work — not a timesheet.",
  },
  {
    q: "What if the project needs more tokens than estimated?",
    a: "We stop at your cap and explain why. You decide: raise it, trim scope, or pause.",
  },
  {
    q: "Is engineering review billed separately?",
    a: "No. Review, testing and deployment are part of every quote — never add-ons.",
  },
  {
    q: "Do you offer ongoing maintenance?",
    a: "Yes — a care plan for monitoring, fixes and small features, billed the same way.",
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
  "web-development": {
    whoFor:
      "For founders validating an idea, and teams that have outgrown spreadsheets.",
    approach: [
      {
        title: "Agents write, engineers own",
        body: "Agents write code and tests. An engineer reviews every PR.",
      },
      {
        title: "Previews at every milestone",
        body: "A working build each milestone, not a slide deck.",
      },
      {
        title: "Fast, accessible, yours",
        body: "Fast and accessible, on a stack you can hire for.",
      },
    ],
  },
  "ai-solutions": {
    whoFor:
      "For support, sales and ops teams buried in repetitive questions.",
    approach: [
      {
        title: "Grounded in your data",
        body: "Answers come from your docs and systems, with sources.",
      },
      {
        title: "The right model per task",
        body: "Picked for quality, cost and your data policy.",
      },
      {
        title: "Measured, not guessed",
        body: "Tested on real conversations, tracked for accuracy.",
      },
    ],
  },
  automation: {
    whoFor:
      "For teams losing hours to copy-paste between tools.",
    approach: [
      {
        title: "Map before we automate",
        body: "Automate the busywork, keep people on judgment calls.",
      },
      {
        title: "Reliable over clever",
        body: "Retry-safe workflows that alert you when needed.",
      },
      {
        title: "Works with what you use",
        body: "Built on the tools you already pay for.",
      },
    ],
  },
  deployment: {
    whoFor:
      "For products — ours, yours or AI-built — that need to get and stay live.",
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

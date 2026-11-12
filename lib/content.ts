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
    useFor: "Complex reasoning, large refactors and careful code review.",
  },
  {
    name: "ChatGPT",
    maker: "OpenAI",
    useFor: "Broad product knowledge, UX copy, tooling and test generation.",
  },
  {
    name: "DeepSeek",
    maker: "DeepSeek",
    useFor: "Cost-efficient code generation for high-volume, well-scoped tasks.",
  },
  {
    name: "Gemini",
    maker: "Google",
    useFor: "Long-context reading of big codebases, specs and documents.",
  },
  {
    name: "Open models",
    maker: "Llama · Qwen · Mistral",
    useFor: "Self-hosted work when your data has to stay in-house.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Agent console (home) — one tab per delivery stage                   */
/* ------------------------------------------------------------------ */

export type ConsoleLine = {
  /** Who produced the line. `cmd` is the prompt line, `sys` a status line. */
  by: "cmd" | "sys" | "claude" | "chatgpt" | "deepseek" | "gemini" | "engineer";
  text: string;
};

export type ConsoleTab = { id: string; label: string; lines: ConsoleLine[] };

export const consoleTabs: ConsoleTab[] = [
  {
    id: "plan",
    label: "Plan",
    lines: [
      { by: "cmd", text: 'plan --brief "booking app for clinics"' },
      { by: "gemini", text: "read the brief, 3 docs and the Figma link" },
      { by: "claude", text: "drafted 14 user stories · flagged 4 open questions" },
      { by: "deepseek", text: "estimated 2.4M tokens across 6 milestones" },
      { by: "engineer", text: "scope and token cap approved with the client" },
    ],
  },
  {
    id: "design",
    label: "Design",
    lines: [
      { by: "cmd", text: "design --screens onboarding,booking,dashboard" },
      { by: "claude", text: "3 layout directions from your brand kit" },
      { by: "chatgpt", text: "microcopy for 22 states — empty, error, success" },
      { by: "engineer", text: "direction B approved · responsive down to 360px" },
    ],
  },
  {
    id: "build",
    label: "Build",
    lines: [
      { by: "cmd", text: "build --milestone 2" },
      { by: "claude", text: "scaffolded Next.js + Postgres · auth + roles" },
      { by: "deepseek", text: "implemented booking + availability engine" },
      { by: "chatgpt", text: "wrote 86 unit tests alongside the code" },
      { by: "engineer", text: "reviewed 12 pull requests · 3 changes requested" },
    ],
  },
  {
    id: "integrate",
    label: "Integrate",
    lines: [
      { by: "cmd", text: "integrate stripe resend google-calendar" },
      { by: "claude", text: "checkout + idempotent payment webhooks" },
      { by: "deepseek", text: "two-way sync with Google Calendar" },
      { by: "chatgpt", text: "transactional email templates via Resend" },
      { by: "engineer", text: "verified end-to-end against sandbox accounts" },
    ],
  },
  {
    id: "secure",
    label: "Secure",
    lines: [
      { by: "cmd", text: "audit --security" },
      { by: "claude", text: "auth + session flows checked against OWASP Top 10" },
      { by: "chatgpt", text: "dependency audit: 0 critical · 2 patched" },
      { by: "engineer", text: "secrets moved to env vault · rate limits on /api" },
    ],
  },
  {
    id: "test",
    label: "Test",
    lines: [
      { by: "cmd", text: "test --all" },
      { by: "sys", text: "214 unit · 38 integration · 12 end-to-end — passing" },
      { by: "claude", text: "fixed a flaky checkout test (webhook race)" },
      { by: "engineer", text: "accessibility pass: keyboard + screen reader" },
    ],
  },
  {
    id: "deploy",
    label: "Deploy",
    lines: [
      { by: "cmd", text: "deploy --env production" },
      { by: "sys", text: "build ok · 4 migrations applied · release ok" },
      { by: "sys", text: "live → app.yourclinic.com" },
      { by: "engineer", text: "monitoring, alerts and daily backups configured" },
    ],
  },
  {
    id: "maintain",
    label: "Maintain",
    lines: [
      { by: "cmd", text: "care --watch" },
      { by: "sys", text: "uptime 99.9% · p95 response 210ms" },
      { by: "claude", text: "triaged 3 errors · opened 1 fix PR" },
      { by: "engineer", text: "patch shipped · 96k tokens used this month" },
    ],
  },
];

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
    body: "We split the work into milestones and estimate the tokens each one will burn. You see the number — and set a cap — before anything starts.",
  },
  {
    title: "Watch the meter",
    body: "Usage is tracked per milestone and shared with you as we go. If we're heading past your cap, we stop and ask first.",
  },
  {
    title: "Pay for what's used",
    body: "Invoices list the tokens burned per milestone. Estimate something we didn't need to spend? You don't pay for it.",
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
    label: "Architecture that lasts",
    diy: "partial",
    diyNote: "Depends on your experience",
    veraft: "Engineer-reviewed",
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
    label: "Hosting, CI/CD & monitoring",
    diy: "no",
    diyNote: "A second project",
    veraft: "Set up and handed over",
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

export type ProcessStep = { id: string; title: string; teaser: string; detail: string };

export const processSteps: ProcessStep[] = [
  {
    id: "brief",
    title: "Brief",
    teaser: "Tell us what you need.",
    detail:
      "A short call. We ask the questions an agent can't: who it's for, what success looks like, and what must never break.",
  },
  {
    id: "estimate",
    title: "Estimate",
    teaser: "A token estimate and a cap.",
    detail:
      "We break the work into milestones and estimate the tokens each one will burn. You see the number — and set the cap — before we start.",
  },
  {
    id: "build",
    title: "Build",
    teaser: "Agents build, engineers review.",
    detail:
      "Agents write code, tests and docs in parallel; an engineer reviews every pull request. You get a working preview at each milestone.",
  },
  {
    id: "ship",
    title: "Ship",
    teaser: "Secure, test, deploy.",
    detail:
      "Security checks, automated tests and an accessibility pass — then deployment to your cloud, your domain and your repo.",
  },
  {
    id: "care",
    title: "Care",
    teaser: "Maintain and improve.",
    detail:
      "Optional ongoing care: updates, monitoring, fixes and new features — billed the same transparent way.",
  },
];

export const principles = [
  {
    title: "Agents for speed, people for judgment",
    body: "AI writes most of the code. Engineers decide what gets built, review every change and own the result.",
  },
  {
    title: "Transparent by default",
    body: "You see the estimate, the live token meter and every pull request. No black boxes, no padded timesheets.",
  },
  {
    title: "Production or nothing",
    body: "We don't hand over demos. Auth, error handling, tests and docs are part of every brick we lay.",
  },
  {
    title: "You own everything",
    body: "Code, repo, cloud accounts and data stay yours. Walk away whenever you like — with all of it.",
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
    a: "Tokens are what actually builds your product now. Billing for them keeps the price tied to the work, not to how many people are on a timesheet.",
  },
  {
    q: "What if the project needs more tokens than estimated?",
    a: "We stop before crossing your cap, explain why, and you decide whether to raise it, trim scope, or pause. Nothing is spent past the cap without your approval.",
  },
  {
    q: "Is engineering review billed separately?",
    a: "Every quote shows exactly what's included before you agree to anything. Engineer review, testing and deployment are part of every project — never surprise add-ons.",
  },
  {
    q: "Do you offer ongoing maintenance?",
    a: "Yes. A care plan covers monitoring, updates, fixes and small features, billed the same transparent way.",
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
      "For founders with an idea to validate and companies whose spreadsheet-and-email workflow has outgrown itself.",
    approach: [
      {
        title: "Agents write, engineers own",
        body: "AI agents generate the code and tests; an engineer reviews every pull request and owns the architecture.",
      },
      {
        title: "Previews at every milestone",
        body: "Click through a working build each milestone — react to something real, not a slide deck.",
      },
      {
        title: "Fast, accessible, yours",
        body: "Performance and accessibility from the first commit, on a standard stack you can hire for and run yourself.",
      },
    ],
  },
  "ai-solutions": {
    whoFor:
      "For teams drowning in repetitive questions and documents — support, sales, ops and internal helpdesks.",
    approach: [
      {
        title: "Grounded in your data",
        body: "We connect the assistant to your docs, tickets and systems, so answers are specific, current and traceable.",
      },
      {
        title: "The right model per task",
        body: "Claude, ChatGPT, DeepSeek, Gemini or a self-hosted model — chosen for quality, cost and your data policy.",
      },
      {
        title: "Measured, not guessed",
        body: "We test against real conversations and track accuracy and hand-off rates, not vanity chat volume.",
      },
    ],
  },
  automation: {
    whoFor:
      "For teams losing hours to manual steps shuffled between disconnected tools.",
    approach: [
      {
        title: "Map before we automate",
        body: "We find the steps genuinely worth removing — and deliberately leave the judgment calls to people.",
      },
      {
        title: "Reliable over clever",
        body: "Retry-safe, idempotent, observable workflows you can trust to run unattended, with alerts when they need you.",
      },
      {
        title: "Works with what you use",
        body: "We integrate through the APIs of the tools you already pay for — no rip-and-replace.",
      },
    ],
  },
  deployment: {
    whoFor:
      "For products that need a proper home — and for apps built elsewhere (or by AI) that need to get, and stay, live.",
    approach: [
      {
        title: "Your cloud, your keys",
        body: "We set everything up in accounts you own: hosting, database, domains, email and secrets.",
      },
      {
        title: "Automated releases",
        body: "CI/CD that runs tests on every change and deploys with a single merge — and rolls back just as easily.",
      },
      {
        title: "Watched after launch",
        body: "Monitoring, error tracking, backups and patches — so problems are caught before your customers notice.",
      },
    ],
  },
};

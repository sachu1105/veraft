/** Shared editorial content used across multiple routes. */

export type ProcessStep = {
  id: string;
  title: string;
  teaser: string;
  detail: string;
};

/** The real working sequence — the one place numbered steps are warranted. */
export const processSteps: ProcessStep[] = [
  {
    id: "discover",
    title: "Discover",
    teaser: "Understand the work before touching software.",
    detail:
      "We start with how your team actually works today — the tools, the handoffs, the parts that quietly eat hours. We map where software helps and, just as importantly, where it shouldn't.",
  },
  {
    id: "design",
    title: "Design",
    teaser: "Shape the smallest thing that changes the day.",
    detail:
      "We design the interface and the system together, prototyping the flows that matter most so you can react to something real before we build it.",
  },
  {
    id: "build",
    title: "Build",
    teaser: "Ship in working increments, not big reveals.",
    detail:
      "We build in short cycles with production-quality code from day one. You see progress every week and steer as it takes shape — no months-long black box.",
  },
  {
    id: "deploy",
    title: "Deploy & iterate",
    teaser: "Launch, measure, and keep improving.",
    detail:
      "We deploy carefully, watch how it performs against the outcome we agreed on, and keep refining. Software that works alongside people is never quite finished.",
  },
];

/** Principles that guide every engagement. */
export const principles = [
  {
    title: "Augment, don't replace",
    body: "We build software that takes the repetitive load off people so they can do the work only people can do — not software that quietly removes them.",
  },
  {
    title: "Earn trust with accuracy",
    body: "AI that makes things up is worse than no AI. We ground assistants in your data and design for honest 'I don't know' over confident guesses.",
  },
  {
    title: "Ship small, ship often",
    body: "Value in weeks, not quarters. Small releases keep risk low and let you change direction while it's still cheap.",
  },
  {
    title: "Own what we build",
    body: "Clean, documented, standard code on infrastructure you control. No lock-in to us — you can take it anywhere.",
  },
];

/** Tech we reach for (kept honest and high-level). */
export const techStack = [
  { group: "Product", items: ["Next.js", "React", "TypeScript", "React Native"] },
  { group: "Backend", items: ["Node.js", "Python", "PostgreSQL", "Redis"] },
  { group: "AI", items: ["LLM agents", "RAG pipelines", "Vector search", "Evals"] },
  { group: "Platform", items: ["AWS", "Vercel", "Docker", "CI/CD"] },
];

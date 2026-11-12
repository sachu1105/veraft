import { Check } from "lucide-react";
import { Section } from "@/components/ui/section";
import { ArrowLink } from "@/components/ui/arrow-link";
import { AgentConsole } from "@/components/sections/agent-console";

const points = [
  "Agents for speed",
  "Engineers for judgment",
  "Your code, your repo, your cloud",
];

/** "One team, idea to production" — copy on the left, agent console on the right. */
export function EndToEnd() {
  return (
    <Section
      padding="none"
      aria-labelledby="e2e-heading"
      className="bg-[radial-gradient(60%_80%_at_85%_10%,rgb(var(--c-accent)/0.07),transparent_70%)]"
    >
      <div className="grid gap-12 px-6 py-20 sm:px-10 sm:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:px-12 lg:py-28">
        <div className="max-w-md">
          <h2 id="e2e-heading" className="text-display-md text-ink">
            One team, from first brief to production.
          </h2>
          <p className="mt-5 text-body-lg text-muted">
            Most AI tools stop at the demo. We don&apos;t.
          </p>
          <ul className="mt-7 flex flex-col gap-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-body-sm text-ink">
                <Check
                  size={17}
                  strokeWidth={2}
                  className="mt-[3px] shrink-0 text-accent-fg"
                  aria-hidden
                />
                {p}
              </li>
            ))}
          </ul>
          <ArrowLink href="/approach" className="mt-8">
            See how we work
          </ArrowLink>
        </div>

        <AgentConsole />
      </div>
    </Section>
  );
}

import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { principles, processSteps, techStack } from "@/lib/content";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "How Veraft works: our principles, a clear four-step process, and the technology we build on — software that works alongside your team.",
};

export default function ApproachPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Approach"
        title="How we turn a problem into working software."
        intro="No black boxes and no jargon. A small senior team, a clear process, and a bias toward shipping useful things quickly."
      />

      {/* Principles */}
      <Section tone="paper">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Principles</Eyebrow>
            <h2 className="mt-5 text-display-md text-ink">
              What we hold to, every project.
            </h2>
          </div>
          <div className="mt-12 grid border-l border-t border-line sm:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 0.05}
                className="border-b border-r border-line p-7 sm:p-9"
              >
                <h3 className="text-heading text-ink">{p.title}</h3>
                <p className="mt-2.5 text-body-sm text-muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section tone="mist">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Process</Eyebrow>
            <h2 className="mt-5 text-display-md text-ink">
              Four steps, repeated until it&apos;s right.
            </h2>
          </div>
          <ol className="mt-12 divide-y divide-line border-t border-line">
            {processSteps.map((step, i) => (
              <li key={step.id}>
                <Reveal
                  delay={i * 0.04}
                  className="grid gap-4 py-8 sm:grid-cols-[auto_1fr] sm:gap-10"
                >
                  <span className="font-mono text-display-md text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="max-w-2xl">
                    <h3 className="text-heading text-ink">{step.title}</h3>
                    <p className="mt-2.5 text-body text-muted">{step.detail}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Alongside-people callout (dark) */}
      <Section tone="ink" className="py-20 sm:py-24">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-display-md text-paper">
              We build software that works{" "}
              <span className="text-accent-2">alongside</span> your team —
              taking the repetitive load off people, not taking their place.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Tech stack */}
      <Section tone="paper">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Technology</Eyebrow>
            <h2 className="mt-5 text-display-md text-ink">
              Proven tools, chosen for the job.
            </h2>
            <p className="mt-5 text-body-lg text-muted">
              We favor a small, modern, well-supported stack you can hire for
              and run yourself — not whatever is trending this quarter.
            </p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {techStack.map((group) => (
              <div key={group.group} className="bg-paper p-7">
                <h3 className="font-mono text-label uppercase tracking-[0.12em] text-muted">
                  {group.group}
                </h3>
                <ul className="mt-4 flex flex-col gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-body-sm text-ink">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand />
    </main>
  );
}

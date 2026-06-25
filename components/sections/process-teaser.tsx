import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Reveal } from "@/components/motion/reveal";
import { processSteps } from "@/lib/content";

export function ProcessTeaser() {
  return (
    <Section tone="paper">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <Eyebrow>How we work</Eyebrow>
            <h2 className="mt-5 text-display-md text-ink">
              A clear path from problem to working software.
            </h2>
          </div>
          <ArrowLink href="/approach" className="shrink-0">
            See how we work
          </ArrowLink>
        </div>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <li key={step.id} className="bg-paper">
              <Reveal delay={i * 0.06} className="flex h-full flex-col p-7">
                <span className="font-mono text-label text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-heading text-ink">{step.title}</h3>
                <p className="mt-2.5 text-body-sm text-muted">{step.teaser}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

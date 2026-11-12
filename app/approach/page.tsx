import type { Metadata } from "next";
import { Bot, UserCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { agentVsEngineer, models, principles, processSteps, techStack } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "How we work — AI agents build, engineers review",
  description:
    "How Veraft delivers software end-to-end: AI agents (Claude, ChatGPT, DeepSeek, Gemini) do the heavy lifting, engineers own scope, review and deployment. Our process, principles and stack.",
  path: "/approach",
});

export default function ApproachPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="How we work"
        title="Agents do the heavy lifting. Engineers own the result."
        intro="No black boxes and no padded timesheets. A clear process, the right model for each task, and an engineer accountable for every brick that ships."
      />

      {/* Agents vs engineers */}
      <Section padding="none" aria-label="Who does what">
        <div className="grid divide-y divide-line lg:grid-cols-2 lg:divide-x lg:divide-y-0">
          {[
            { title: "What agents do", icon: Bot, items: agentVsEngineer.agents },
            { title: "What engineers do", icon: UserCheck, items: agentVsEngineer.engineers },
          ].map((col) => (
            <div key={col.title} className="px-6 py-16 sm:px-10 sm:py-20 lg:px-12">
              <span className="flex size-11 items-center justify-center rounded-md border border-line text-accent">
                <col.icon size={20} strokeWidth={1.5} aria-hidden />
              </span>
              <h2 className="mt-6 text-display-md text-ink">{col.title}</h2>
              <ul className="mt-6 flex flex-col">
                {col.items.map((item) => (
                  <li key={item} className="border-t border-line py-3.5 text-body text-ink last:border-b">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section tone="mist" aria-labelledby="process-heading">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Process</Eyebrow>
            <h2 id="process-heading" className="mt-5 text-display-md text-ink">
              Five steps, from brief to looked-after.
            </h2>
          </div>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-5">
            {processSteps.map((step, i) => (
              <li key={step.id} className="bg-paper">
                <Reveal delay={i * 0.05} className="flex h-full flex-col p-6">
                  <span className="font-mono text-label text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-heading text-ink">{step.title}</h3>
                  <p className="mt-1 text-body-sm font-medium text-ink/80">{step.teaser}</p>
                  <p className="mt-3 text-body-sm text-muted">{step.detail}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Models */}
      <Section aria-labelledby="models-page-heading">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
            <div>
              <Eyebrow>Agents on our bench</Eyebrow>
              <h2 id="models-page-heading" className="mt-5 text-display-md text-ink">
                The right model for each brick.
              </h2>
            </div>
            <p className="max-w-lg text-body text-muted">
              No single model is best at everything. We route each task to the
              model that does it best for the cost — and respect your rules on
              which providers can see your data.
            </p>
          </div>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {models.map((m) => (
              <li key={m.name} className="flex flex-col bg-paper p-6">
                <span className="text-heading font-semibold text-ink">{m.name}</span>
                <span className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
                  {m.maker}
                </span>
                <p className="mt-4 text-body-sm text-muted">{m.useFor}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Principles */}
      <Section tone="mist" aria-labelledby="principles-heading">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Principles</Eyebrow>
            <h2 id="principles-heading" className="mt-5 text-display-md text-ink">
              What we hold to, every project.
            </h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05} className="bg-paper p-7 sm:p-9">
                <h3 className="text-heading text-ink">{p.title}</h3>
                <p className="mt-2.5 text-body-sm text-muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Tech stack */}
      <Section aria-labelledby="stack-heading">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Technology</Eyebrow>
            <h2 id="stack-heading" className="mt-5 text-display-md text-ink">
              Proven tools you can run yourself.
            </h2>
            <p className="mt-5 text-body-lg text-muted">
              A small, modern, well-supported stack you can hire for — not
              whatever is trending this quarter.
            </p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
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

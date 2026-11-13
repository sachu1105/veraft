import type { Metadata } from "next";
import { Bot, Check, UserCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";
import {
  aiVsEngineer,
  costPrinciples,
  modelTiers,
  qualityChecklist,
  stages,
  techStack,
} from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "How we build — the Veraft engineering methodology",
  description:
    "Seven stages from discovery to continuous improvement, the right AI model for each task, engineers accountable for every decision, and a quality checklist on every production product.",
  path: "/approach",
});

export default function ApproachPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="How we build"
        title="We don't just generate code. We engineer products."
        intro="A defined seven-stage system, the right model for each task, and engineers accountable at every step."
      />

      {/* The seven stages */}
      <Section tone="deep" id="process" aria-labelledby="process-heading" className="scroll-mt-20">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Methodology</Eyebrow>
            <h2 id="process-heading" className="mt-5 text-display-md text-ink">
              Seven stages. A deliverable at each.
            </h2>
          </div>
          <ol className="mt-12 border-t border-line">
            {stages.map((s, i) => (
              <li key={s.id} className="border-b border-line">
                <Reveal
                  delay={i * 0.04}
                  className="grid gap-3 py-7 md:grid-cols-[4rem_1fr_1.1fr] md:gap-8"
                >
                  <span className="font-mono text-label text-accent-fg md:pt-1.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-heading text-ink">{s.title}</h3>
                    <p className="mt-1.5 text-body-sm text-muted">{s.summary}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
                      Deliverable
                    </p>
                    <p className="mt-1.5 text-body-sm text-ink">{s.deliverable}</p>
                    {s.focus && (
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {s.focus.map((f) => (
                          <li
                            key={f}
                            className="rounded-full border border-line px-2.5 py-0.5 text-[0.75rem] text-muted"
                          >
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Model strategy */}
      <Section tone="mist" id="models" aria-labelledby="models-page-heading" className="scroll-mt-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
            <div>
              <Eyebrow>AI efficiency</Eyebrow>
              <h2 id="models-page-heading" className="mt-5 text-display-md text-ink">
                The right model for each task. Not the priciest for all.
              </h2>
            </div>
            <p className="max-w-lg text-body-lg text-muted">
              We optimise the total cost of a successful product — without
              lowering the bar.
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-[1.2fr_1fr] lg:gap-5">
            <ul className="overflow-hidden rounded-xl border border-line bg-paper">
              {modelTiers.map((t) => (
                <li
                  key={t.tier}
                  className="flex flex-col gap-1 border-b border-line px-6 py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                >
                  <span className="text-body font-medium text-ink">{t.tier}</span>
                  <span className="text-body-sm text-muted">{t.task}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-xl border border-line bg-paper p-6">
              <h3 className="font-mono text-label uppercase tracking-[0.12em] text-muted">
                How we keep AI costs lean
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {costPrinciples.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-body-sm text-ink">
                    <Check size={16} strokeWidth={2} aria-hidden className="mt-0.5 shrink-0 text-accent-fg" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </Container>
      </Section>

      {/* AI vs engineers */}
      <Section padding="none" aria-labelledby="who-does-what">
        <h2 id="who-does-what" className="sr-only">Who does what</h2>
        <div className="grid divide-y divide-line lg:grid-cols-2 lg:divide-x lg:divide-y-0">
          {[
            { title: "What AI does", icon: Bot, items: aiVsEngineer.ai },
            { title: "What engineers do", icon: UserCheck, items: aiVsEngineer.engineers },
          ].map((col) => (
            <div key={col.title} className="px-6 py-16 sm:px-10 sm:py-20 lg:px-12">
              <span className="flex size-11 items-center justify-center rounded-md border border-line text-accent-fg">
                <col.icon size={20} strokeWidth={1.5} aria-hidden />
              </span>
              <h3 className="mt-6 text-display-md text-ink">{col.title}</h3>
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

      {/* Quality commitments */}
      <Section tone="mist" id="quality" aria-labelledby="quality-heading" className="scroll-mt-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
            <div>
              <Eyebrow>Quality</Eyebrow>
              <h2 id="quality-heading" className="mt-5 text-display-md text-ink">
                Speed never replaces the fundamentals.
              </h2>
            </div>
            <p className="max-w-lg text-body-lg text-muted">
              The checklist every production product goes through.
            </p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {qualityChecklist.map((group, i) => (
              <Reveal
                key={group.area}
                delay={i * 0.04}
                className="bg-paper p-6 sm:last:col-span-2 lg:last:col-span-1"
              >
                <h3 className="text-heading text-ink">{group.area}</h3>
                <ul className="mt-4 flex flex-col gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-body-sm text-muted">
                      <Check size={14} strokeWidth={2} aria-hidden className="mt-1 shrink-0 text-accent-fg" />
                      {item}
                    </li>
                  ))}
                </ul>
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

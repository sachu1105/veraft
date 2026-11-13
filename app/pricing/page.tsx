import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button";
import { PageHero } from "@/components/sections/page-hero";
import { BudgetLedger } from "@/components/sections/budget-ledger";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { engagementModels, engagementSteps, pricingFaqs, pricingIncludes } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Pricing & engagement models",
  description:
    "Fixed-scope, milestone-based, dedicated engineering or maintenance retainer. You approve scope and budget up front and pay for outcomes — with engineering review, testing and full ownership included.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Pricing"
        title="Pay for outcomes. Not hours, not tokens."
        intro="Clear scope, an approved budget and engineering accountability — on every engagement."
      >
        <ButtonLink href="/contact" size="lg">
          Start a project
          <ArrowRight size={18} strokeWidth={1.75} aria-hidden />
        </ButtonLink>
      </PageHero>

      {/* How it works + ledger */}
      <Section aria-labelledby="how-heading">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16">
            <div>
              <Eyebrow>How it works</Eyebrow>
              <h2 id="how-heading" className="mt-5 text-display-md text-ink">
                Four steps. No surprises.
              </h2>
              <ol className="mt-10 flex flex-col">
                {engagementSteps.map((s, i) => (
                  <li key={s.title} className="flex gap-5 border-t border-line py-6 last:border-b">
                    <span className="font-mono text-display-md leading-none text-accent-fg">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-heading text-ink">{s.title}</h3>
                      <p className="mt-2 text-body-sm text-muted">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <BudgetLedger className="lg:sticky lg:top-28" />
          </div>
        </Container>
      </Section>

      {/* Engagement models */}
      <Section tone="deep" aria-labelledby="models-heading">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Engagement models</Eyebrow>
            <h2 id="models-heading" className="mt-5 text-display-md text-ink">
              Pick the shape that fits the work.
            </h2>
          </div>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {engagementModels.map((m, i) => (
              <li key={m.title} className="bg-paper">
                <Reveal delay={i * 0.05} className="flex h-full flex-col p-6 sm:p-7">
                  <span className="font-mono text-label text-accent-fg">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-heading text-ink">{m.title}</h3>
                  <p className="mt-2 text-body-sm text-muted">{m.body}</p>
                  <p className="mt-auto pt-6 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
                    Best for · {m.fit}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Included */}
      <Section tone="mist" aria-labelledby="included-heading">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Always included</Eyebrow>
            <h2 id="included-heading" className="mt-5 text-display-md text-ink">
              Never add-ons. Part of every engagement.
            </h2>
          </div>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {pricingIncludes.map((item, i) => (
              <li key={item} className="bg-paper">
                <Reveal delay={i * 0.04} className="flex h-full items-start gap-3 p-6">
                  <Check size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-accent-fg" aria-hidden />
                  <span className="text-body-sm text-ink">{item}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Faq items={pricingFaqs} heading="Pricing questions." />

      <CtaBand
        title="Get a scoped proposal for your idea."
        body="A discovery call, then deliverables, a timeline and a budget — free, no obligation."
        cta="Start a project"
      />
    </main>
  );
}

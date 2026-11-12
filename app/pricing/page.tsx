import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button";
import { PageHero } from "@/components/sections/page-hero";
import { TokenLedger } from "@/components/sections/token-ledger";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { agencyComparison, pricingFaqs, pricingIncludes, pricingSteps } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Pricing — pay for the tokens we burn",
  description:
    "Token-based software development pricing: an up-front estimate, a cap you control, live usage, and invoices for what was actually used. No padded hourly billing.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Pricing"
        title="Pay for the tokens we burn — not the hours we bill."
        intro="Agencies charge for time. AI made time cheap, so we charge for what actually builds your product: the compute our agents use — estimated up front, capped by you, and visible as we go."
      >
        <ButtonLink href="/contact" size="lg">
          Get an estimate
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
                Three steps. No surprises.
              </h2>
              <ol className="mt-10 flex flex-col">
                {pricingSteps.map((s, i) => (
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
            <TokenLedger className="lg:sticky lg:top-28" />
          </div>
        </Container>
      </Section>

      {/* Included */}
      <Section tone="mist" aria-labelledby="included-heading">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Always included</Eyebrow>
            <h2 id="included-heading" className="mt-5 text-display-md text-ink">
              Tokens build it. These make it production-grade.
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

      {/* vs hourly agency */}
      <Section aria-labelledby="vs-heading">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Compared</Eyebrow>
            <h2 id="vs-heading" className="mt-5 text-display-md text-ink">
              Hourly agency vs. token-based.
            </h2>
          </div>
          <div className="relative mt-12 overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[560px] border-collapse text-left text-body-sm">
              <caption className="sr-only">Hourly agency billing compared with Veraft token-based billing</caption>
              <thead>
                <tr className="border-b border-line bg-mist/60">
                  <th scope="col" className="w-[34%] px-6 py-4 font-mono text-label font-normal uppercase tracking-[0.12em] text-muted">
                    &nbsp;
                  </th>
                  <th scope="col" className="px-6 py-4 font-medium text-ink">Typical hourly agency</th>
                  <th scope="col" className="border-l border-accent/20 bg-accent/5 px-6 py-4 font-medium text-accent-fg">
                    Veraft
                  </th>
                </tr>
              </thead>
              <tbody>
                {agencyComparison.map((row) => (
                  <tr key={row.label} className="border-b border-line last:border-0">
                    <th scope="row" className="px-6 py-4 font-normal text-ink">{row.label}</th>
                    <td className="px-6 py-4 text-muted">{row.agency}</td>
                    <td className="border-l border-accent/20 bg-accent/5 px-6 py-4 text-ink">{row.veraft}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <Faq items={pricingFaqs} heading="Pricing questions." />

      <CtaBand
        title="Get a token estimate for your idea."
        body="Book a short call. We'll scope it into milestones and send an estimate with a cap — free, and with no obligation."
      />
    </main>
  );
}

import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ArrowLink } from "@/components/ui/arrow-link";
import { TokenLedger } from "@/components/sections/token-ledger";
import { pricingSteps } from "@/lib/content";

/** Home: the token-based pricing model in one block. */
export function PricingTeaser() {
  return (
    <Section
      aria-labelledby="pricing-heading"
      className="bg-[radial-gradient(55%_70%_at_15%_90%,rgb(var(--c-accent)/0.06),transparent_70%)]"
    >
      <div className="grid gap-14 px-6 sm:px-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16 lg:px-12">
        <div>
          <Eyebrow>Pricing</Eyebrow>
          <h2 id="pricing-heading" className="mt-5 text-display-md text-ink">
            Pay for the tokens we burn. Nothing padded.
          </h2>
          <p className="mt-5 max-w-lg text-body text-muted">
            Agencies bill hours. AI made hours cheap — so we bill the compute
            that actually builds your product, metered and visible from day
            one.
          </p>
          <ol className="mt-8 flex flex-col gap-5">
            {pricingSteps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border border-line bg-paper font-mono text-label text-accent">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-body font-medium text-ink">{s.title}</h3>
                  <p className="mt-1 text-body-sm text-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <ArrowLink href="/pricing" className="mt-8">
            How pricing works
          </ArrowLink>
        </div>

        <TokenLedger />
      </div>
    </Section>
  );
}

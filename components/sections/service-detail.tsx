import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getPillar, pillars } from "@/lib/site";
import { serviceDetails } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button";
import { ArrowLink } from "@/components/ui/arrow-link";
import { PageHero } from "@/components/sections/page-hero";
import { OfferingList } from "@/components/sections/service-list";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";

/** Shared layout for the four /services/[pillar] pages. */
export function ServiceDetail({ slug }: { slug: string }) {
  const pillar = getPillar(slug);
  const detail = serviceDetails[slug];
  if (!pillar || !detail) notFound();

  const others = pillars.filter((p) => p.slug !== slug);

  return (
    <main id="main">
      <PageHero eyebrow={pillar.title} title={pillar.summary} intro={detail.whoFor}>
        <ButtonLink href="/contact" size="lg">
          Start a project
          <ArrowRight size={18} strokeWidth={1.75} aria-hidden />
        </ButtonLink>
      </PageHero>

      {/* Lead example + offerings */}
      <Section tone="paper">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
            <div className="lg:max-w-sm">
              <Eyebrow>For example</Eyebrow>
              <p className="mt-5 text-display-md text-ink">{pillar.lead}</p>
            </div>
            <div>
              <h2 className="font-mono text-label uppercase tracking-[0.12em] text-muted">
                What we build
              </h2>
              <OfferingList
                items={pillar.offerings}
                className="mt-5 grid gap-x-10 border-t border-line pt-4 sm:grid-cols-2"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* How we approach it */}
      <Section tone="mist">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>How we approach it</Eyebrow>
            <h2 className="mt-5 text-display-md text-ink">
              Useful first, impressive second.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {detail.approach.map((point, i) => (
              <Reveal
                key={point.title}
                delay={i * 0.06}
                className="rounded-card border border-line bg-paper p-7"
              >
                <span className="font-mono text-label text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-heading text-ink">{point.title}</h3>
                <p className="mt-2.5 text-body-sm text-muted">{point.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Cross-links to other services */}
      <Section tone="paper" className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <h2 className="text-heading text-ink">Explore other services</h2>
          </div>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-3">
            {others.map((p) => (
              <li key={p.slug} className="bg-paper">
                <div className="flex h-full flex-col p-6">
                  <h3 className="text-heading text-ink">{p.title}</h3>
                  <p className="mt-2 text-body-sm text-muted">{p.summary}</p>
                  <ArrowLink href={p.href} className="mt-5">
                    Explore
                  </ArrowLink>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand />
    </main>
  );
}

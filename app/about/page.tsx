import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { audiences } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About — an AI-native product engineering company",
  description:
    "Veraft combines intelligent AI models, specialised engineering workflows and human expertise to turn business ideas into production-ready software. Our mission, vision and who we build for.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="About"
        title="Software should be built faster, smarter, and without compromise."
        intro="Veraft is an AI-native product engineering company. We turn business ideas into production-ready digital products."
      />

      {/* Mission & vision */}
      <Section tone="deep">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[200px_1fr] lg:gap-16">
            <Eyebrow>Mission</Eyebrow>
            <Reveal>
              <p className="max-w-3xl text-display-md text-ink">
                Make high-quality software development faster, more accessible
                and more efficient — through intelligent AI systems and
                specialised engineering.
              </p>
            </Reveal>
            <Eyebrow>Vision</Eyebrow>
            <Reveal>
              <p className="max-w-3xl text-body-lg text-muted">
                A leading AI-native product engineering company, redefining how
                digital products are designed, built, tested and delivered.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Positioning */}
      <Section tone="mist">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[200px_1fr] lg:gap-16">
            <Eyebrow>Why we started</Eyebrow>
            <Reveal className="max-w-2xl space-y-5 text-body-lg text-muted">
              <p>
                AI made code cheap, yet most businesses still couldn&apos;t ship
                a real product — just a demo with no architecture, tests or
                deployment.
              </p>
              <p>
                Agencies bring engineers but slow, manual cycles. AI tools
                generate code but leave the product to you. We built Veraft to
                combine the strengths of both: AI to accelerate the work,
                structured workflows to keep it on track, and engineers to own
                the quality.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Who we build for */}
      <Section aria-labelledby="audience-heading">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Who we build for</Eyebrow>
            <h2 id="audience-heading" className="mt-5 text-display-md text-ink">
              From first idea to established business.
            </h2>
          </div>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a, i) => (
              <li key={a.title} className="bg-paper">
                <Reveal delay={i * 0.05} className="flex h-full flex-col p-6 sm:p-7">
                  <h3 className="text-heading text-ink">{a.title}</h3>
                  <p className="mt-2 text-body-sm text-muted">{a.need}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand />
    </main>
  );
}

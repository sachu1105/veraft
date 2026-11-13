import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About — a founder-led, AI-native software studio",
  description:
    "Veraft is a founder-led studio making production-grade software affordable by putting AI agents to work and engineers in charge — from first brief to deployment.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="About"
        title="Two builders and a bench of AI agents."
        intro="AI agents do in days what took a team months. We stay accountable for everything that ships."
      />

      {/* Mission */}
      <Section tone="deep">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[200px_1fr] lg:gap-16">
            <Eyebrow>Mission</Eyebrow>
            <Reveal>
              <p className="max-w-3xl text-display-md text-ink">
                Make production-grade software affordable for every business
                with an idea — by putting AI agents to work and engineers in
                charge.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Story */}
      <Section tone="mist">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[200px_1fr] lg:gap-16">
            <Eyebrow>Why we started</Eyebrow>
            <Reveal className="max-w-2xl space-y-5 text-body-lg text-muted">
              <p>
                AI made code cheap, yet most businesses still couldn&apos;t ship
                a real product — just a chatbot demo with no auth, tests or
                deployment.
              </p>
              <p>
                So we let agents do the heavy lifting, keep engineers
                accountable, and charge for the tokens we actually burn.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </main>
  );
}

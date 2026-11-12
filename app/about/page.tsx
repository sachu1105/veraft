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

// TODO: replace with the founders' real names, roles and (optionally) photos.
const team = [
  { initials: "F1", name: "Co-founder", role: "Engineering & AI agents" },
  { initials: "F2", name: "Co-founder", role: "Product, design & delivery" },
];

export default function AboutPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="About"
        title="Two builders and a bench of AI agents."
        intro="Veraft is a founder-led studio. We use AI agents to do in days what used to take a team months — and stay personally accountable for everything that ships."
      />

      {/* Mission */}
      <Section>
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
                AI made writing code dramatically cheaper. Yet most businesses
                we spoke to still couldn&apos;t get a real product shipped. They
                had a demo from a chatbot — but no auth, no payments, no tests,
                no deployment, and no one to call when it broke.
              </p>
              <p>
                Agencies hadn&apos;t caught up either: same headcount, same
                hourly rates, AI quietly pocketed as margin.
              </p>
              <p>
                So we built Veraft around a simple idea: let agents like Claude,
                ChatGPT and DeepSeek do the heavy lifting, keep engineers
                accountable for every decision, and charge for the tokens we
                actually burn. One team, start to finish — brick by brick.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section>
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Team</Eyebrow>
            <h2 className="mt-5 text-display-md text-ink">The people accountable for your build.</h2>
            <p className="mt-5 text-body-lg text-muted">
              You talk to the founders directly — from the first call to launch day.
            </p>
          </div>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            {team.map((member, i) => (
              <li key={member.role} className="bg-paper">
                <Reveal delay={i * 0.05} className="flex h-full items-center gap-5 p-7">
                  <span
                    aria-hidden
                    className="flex size-14 shrink-0 items-center justify-center rounded-md bg-accent font-mono text-body-sm text-on-accent"
                  >
                    {member.initials}
                  </span>
                  <div>
                    <h3 className="text-heading text-ink">{member.name}</h3>
                    <p className="mt-1 text-body-sm text-muted">{member.role}</p>
                  </div>
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

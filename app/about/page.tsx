import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Veraft helps organizations streamline operations, improve customer experiences, and unlock new opportunities through modern software and AI.",
};

// TODO: replace placeholder team with real people and photos.
const team = [
  { initials: "VF", name: "Founder", role: "Strategy & engineering" },
  { initials: "AI", name: "AI Engineer", role: "Assistants & agents" },
  { initials: "PD", name: "Product Designer", role: "Interface & systems" },
  { initials: "FS", name: "Full-stack Engineer", role: "Platforms & APIs" },
];

export default function AboutPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="About"
        title="A small team building software that pulls its weight."
        intro="Veraft is an AI-first software studio. We pair senior engineering with a designer's eye to ship software that earns its place in your day."
      />

      {/* Mission */}
      <Section tone="paper">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
            <Eyebrow>Mission</Eyebrow>
            <Reveal>
              <p className="max-w-3xl text-display-md text-ink">
                Veraft helps organizations streamline operations, improve
                customer experiences, and unlock new opportunities through
                modern software and artificial intelligence.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Founding story (placeholder) */}
      <Section tone="mist">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
            <Eyebrow>Our story</Eyebrow>
            {/* TODO: replace with the real founding story. */}
            <Reveal className="max-w-2xl space-y-5 text-body-lg text-muted">
              <p>
                Veraft started from a simple frustration: most teams don&apos;t
                need more software — they need the right software, built to fit
                how they actually work.
              </p>
              <p>
                We saw powerful AI arriving faster than most companies could put
                it to honest use. So we set out to be the team that bridges that
                gap — translating new capability into tools people trust and
                reach for every day.
              </p>
              <p>
                Today we design and build assistants, platforms, and automations
                for teams who&apos;d rather spend their hours on the work that
                matters.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Team (placeholder) */}
      <Section tone="paper">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Team</Eyebrow>
            <h2 className="mt-5 text-display-md text-ink">
              The people behind the work.
            </h2>
            <p className="mt-5 text-body-lg text-muted">
              A deliberately small, senior team — and growing.
            </p>
          </div>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <li key={member.role}>
                <Reveal
                  delay={i * 0.05}
                  className="flex h-full flex-col rounded-card border border-line bg-paper p-6"
                >
                  <span
                    aria-hidden
                    className="flex size-12 items-center justify-center rounded-full bg-mist font-mono text-body-sm text-ink"
                  >
                    {member.initials}
                  </span>
                  <h3 className="mt-5 text-heading text-ink">{member.name}</h3>
                  <p className="mt-1 text-body-sm text-muted">{member.role}</p>
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

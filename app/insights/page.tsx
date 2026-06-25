import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/sections/page-hero";
import { ArrowLink } from "@/components/ui/arrow-link";

export const metadata: Metadata = {
  title: "Insights",
  description: "Notes on building useful AI and software — coming soon.",
};

export default function InsightsPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Insights"
        title="Notes from the workshop, coming soon."
        intro="Practical writing on building AI that earns trust, shipping software that gets used, and automating the right things. We're getting the first pieces ready."
      />
      <Section tone="paper">
        <Container>
          <ArrowLink href="/services">Explore what we build</ArrowLink>
        </Container>
      </Section>
    </main>
  );
}

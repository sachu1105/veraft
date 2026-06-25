import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/sections/page-hero";
import { ArrowLink } from "@/components/ui/arrow-link";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected Veraft case studies — coming soon.",
};

export default function WorkPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Work"
        title="Case studies, coming soon."
        intro="We're putting together a selection of the software and AI systems we've shipped. In the meantime, we're happy to walk you through relevant work directly."
      />
      <Section tone="paper">
        <Container>
          <ArrowLink href="/contact">Ask to see relevant work</ArrowLink>
        </Container>
      </Section>
    </main>
  );
}

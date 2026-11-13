import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceList } from "@/components/sections/service-list";
import { CtaBand } from "@/components/sections/cta-band";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services — MVPs, custom software, AI products, design, security & deployment",
  description:
    "Complete product engineering: MVP and startup development, custom software and web apps, AI-powered products, UI/UX design, security and performance, deployment and infrastructure.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Services"
        title="Complete product engineering, not just code."
        intro="Six capabilities, one accountable team. Use one, or let us deliver the whole product."
      />
      <ServiceList />
      <CtaBand
        title="Not sure where to start?"
        body="Describe the outcome. We'll propose the simplest path, with scope, timeline and budget."
      />
    </main>
  );
}

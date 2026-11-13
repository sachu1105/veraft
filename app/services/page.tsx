import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceList } from "@/components/sections/service-list";
import { CtaBand } from "@/components/sections/cta-band";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services — web apps, AI agents, integrations & deployment",
  description:
    "Web apps and SaaS, AI features and agents, integrations and automation, and deployment and maintenance — built end-to-end with AI agents and reviewed by engineers.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Services"
        title="Four bricks. One team to stack them."
        intro="Use one, or let us take you from first brief to live and looked after."
      />
      <ServiceList />
      <CtaBand
        title="Not sure which brick you need?"
        body="Describe the outcome. We'll propose the simplest path, with a token estimate."
      />
    </main>
  );
}

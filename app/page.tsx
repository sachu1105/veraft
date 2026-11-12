import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ModelStrip } from "@/components/sections/model-strip";
import { AiToggle } from "@/components/sections/ai-toggle";
import { EndToEnd } from "@/components/sections/end-to-end";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { ServicesRow } from "@/components/sections/services-row";
import { PricingTeaser } from "@/components/sections/pricing-teaser";
import { DiyComparison } from "@/components/sections/diy-comparison";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { homeFaqs } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} — AI-native software studio: build, integrate & deploy`,
  absoluteTitle: true,
  description: site.description,
  path: "/",
});

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <ModelStrip />
      <AiToggle />
      <EndToEnd />
      <FeatureGrid />
      <ServicesRow />
      <PricingTeaser />
      <DiyComparison />
      <Faq items={homeFaqs} />
      <CtaBand />
    </main>
  );
}

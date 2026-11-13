import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ModelStrip } from "@/components/sections/model-strip";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { ServicesRow } from "@/components/sections/services-row";
import { ProcessOverview } from "@/components/sections/process-overview";
import { WhyVeraft } from "@/components/sections/why-veraft";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { homeFaqs } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} — AI-native product engineering`,
  absoluteTitle: true,
  description: site.description,
  path: "/",
});

/**
 * Home is an overview: each idea appears once and links to its full page —
 * promise, value, services, how we build, why Veraft, FAQ, call to action.
 * Engagement models live on /pricing, the full method on /approach.
 */
export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <ModelStrip />
      <FeatureGrid />
      <ServicesRow />
      <ProcessOverview />
      <WhyVeraft />
      <Faq items={homeFaqs} tone="mist" />
      <CtaBand />
    </main>
  );
}

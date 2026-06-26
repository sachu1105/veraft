import { Hero } from "@/components/sections/hero";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { Pillars } from "@/components/sections/pillars";
import { Outcomes } from "@/components/sections/outcomes";
import { ProcessTeaser } from "@/components/sections/process-teaser";
import { CtaBand } from "@/components/sections/cta-band";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <LogoMarquee />
      <Pillars intro="We build modern software and AI solutions across four areas — often combined into one system." />
      <Outcomes />
      <ProcessTeaser />
      <CtaBand />
    </main>
  );
}

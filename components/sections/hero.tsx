import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { HeroStack } from "@/components/sections/hero-stack";

/**
 * Home hero: the promise on the left, the isometric brick stack on the right.
 * On wide screens the illustration is anchored to the bottom-right and its
 * agent feed lines run underneath the copy, appearing from off-canvas.
 */
export function Hero() {
  return (
    <Section tone="mist" padding="none" className="overflow-hidden" frameClassName="overflow-hidden">
      {/* Blueprint floor behind the stack */}
      <div
        aria-hidden
        className="bg-iso-grid mask-radial pointer-events-none absolute inset-y-0 right-0 hidden w-[72%] opacity-70 lg:block"
      />

      <div className="relative lg:min-h-[740px]">
        <div className="relative z-10 max-w-[700px] px-6 pt-16 sm:px-10 sm:pt-20 lg:px-12 lg:pb-32 lg:pt-28">
          <Eyebrow>AI-native software studio</Eyebrow>

          <h1 className="mt-7 text-[clamp(2.6rem,1.6rem+3.4vw,3.75rem)] leading-[1.04] tracking-[-0.035em] text-ink">
            Your software,{" "}
            <br className="hidden sm:block" />
            built brick by brick{" "}
            <br className="hidden sm:block" />
            with AI&nbsp;agents.
          </h1>

          <p className="mt-6 max-w-[34rem] text-body-lg text-muted">
            From brief to production. You pay for the tokens we burn, not
            the hours we bill.
          </p>

          <div className="mt-9 flex flex-wrap gap-2.5 sm:gap-3">
            <ButtonLink href="/contact" size="lg" className="flex-auto sm:flex-none">
              Book a call
              <ArrowRight size={18} strokeWidth={1.75} aria-hidden />
            </ButtonLink>
            <ButtonLink href="/pricing" size="lg" variant="secondary" className="flex-auto sm:flex-none">
              How pricing works
            </ButtonLink>
          </div>
        </div>

        <div className="mt-6 lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:w-[64%]">
          <HeroStack className="mx-auto max-w-[620px] lg:max-w-none" />
        </div>
      </div>
    </Section>
  );
}

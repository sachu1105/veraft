import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ColumnFrame } from "@/components/ui/column-frame";
import { HeroNotifications } from "@/components/sections/hero-notifications";

/**
 * Stripe-style text hero: a large headline in ink followed by a larger muted
 * continuation and one primary CTA on the left; on wide screens, an ambient
 * feed of notification cards cycles on the right — the hero's one flourish.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[72vh] items-center overflow-hidden border-b border-line">
      {/* A single, faint accent glow — sits behind the notification feed. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 hidden size-[40rem] rounded-full bg-accent/5 blur-3xl lg:block"
      />
      <ColumnFrame />
      <Container className="relative py-20 sm:py-24">
        <div className="items-center gap-14 lg:grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <Eyebrow>AI-first software studio</Eyebrow>

            <h1 className="mt-7 text-display-lg text-ink">
              Build intelligent software that grows your business.
            </h1>

            <p className="mt-6 text-[clamp(1.375rem,1rem+1.4vw,1.9rem)] font-medium leading-[1.4] tracking-[-0.01em] text-muted">
              We design and build custom web applications, AI-powered business
              systems, and automation solutions that help companies work smarter
              and scale faster.
            </p>

            <div className="mt-10">
              <ButtonLink href="/contact" size="lg">
                Start a project
                <ArrowRight size={18} strokeWidth={1.75} aria-hidden />
              </ButtonLink>
            </div>
          </div>

          {/* Ambient service feed — right column, wide screens only. */}
          <div className="hidden lg:block">
            <HeroNotifications />
          </div>
        </div>
      </Container>
    </section>
  );
}

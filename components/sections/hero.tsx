import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ColumnFrame } from "@/components/ui/column-frame";

/**
 * Static, Stripe-style text hero: a large headline in ink followed by a
 * larger muted continuation, one primary CTA. No animation.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      {/* A single, faint accent glow — the only flourish in the hero. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 hidden size-[40rem] rounded-full bg-accent/5 blur-3xl lg:block"
      />
      <ColumnFrame />
      <Container className="relative pb-24 pt-16 sm:pb-32 sm:pt-24 lg:pb-36 lg:pt-28">
        <div className="max-w-4xl">
          <Eyebrow>AI-first software studio</Eyebrow>

          <h1 className="mt-7 text-display-lg text-ink">
            Build intelligent software that grows your business.
          </h1>

          <p className="mt-6 max-w-3xl text-[clamp(1.375rem,1rem+1.4vw,1.9rem)] font-medium leading-[1.4] tracking-[-0.01em] text-muted">
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
      </Container>
    </section>
  );
}

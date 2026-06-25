import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

/**
 * Dark CTA band — one of the two intentional dark sections. The accent
 * button reads loud against the ink surface.
 */
export function CtaBand({
  title = "Let's build something intelligent.",
  body = "Tell us about the work you'd like to automate or the product you want to build. We'll come back with a clear, honest plan.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <Section tone="ink">
      <Container>
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2 className="text-display-md text-paper">{title}</h2>
          <p className="mt-5 max-w-xl text-body-lg text-muted-dark">{body}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact" size="lg">
              Start a project
              <ArrowRight size={18} strokeWidth={1.75} aria-hidden />
            </ButtonLink>
            <ButtonLink
              href="/services"
              size="lg"
              variant="secondary"
              className="border-line-dark bg-transparent text-paper hover:border-paper/40 hover:bg-paper/5"
            >
              Explore services
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

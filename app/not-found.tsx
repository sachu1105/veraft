import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button";
import { ArrowLink } from "@/components/ui/arrow-link";

export default function NotFound() {
  return (
    <main id="main" className="flex flex-1 items-center">
      <Container className="py-32">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="mt-6 max-w-2xl text-display-lg text-ink">
          This brick isn&apos;t in the stack.
        </h1>
        <p className="mt-6 max-w-md text-body-lg text-muted">
          The link may be old or the page may have moved. Let&apos;s get you
          back to something useful.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-5">
          <ButtonLink href="/" size="lg">
            Back to home
          </ButtonLink>
          <ArrowLink href="/services">Explore services</ArrowLink>
        </div>
      </Container>
    </main>
  );
}

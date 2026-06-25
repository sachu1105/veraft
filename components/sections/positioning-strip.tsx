import { Container } from "@/components/ui/container";

const domains = [
  "Support",
  "Operations",
  "Finance",
  "E-commerce",
  "Internal tools",
];

/**
 * Quiet positioning strip — an honest one-line statement of focus instead
 * of placeholder client logos.
 */
export function PositioningStrip() {
  return (
    <section className="border-y border-line bg-paper">
      <Container className="flex flex-col items-center justify-between gap-x-10 gap-y-5 py-7 sm:flex-row">
        <p className="text-body-sm text-muted">
          Trusted to build the software behind everyday operations.
        </p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {domains.map((d) => (
            <li
              key={d}
              className="font-mono text-label uppercase tracking-[0.12em] text-muted/70"
            >
              {d}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

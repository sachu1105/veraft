import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ArrowLink } from "@/components/ui/arrow-link";
import { stages } from "@/lib/content";

/**
 * Home: the seven-stage methodology at a glance — one hairline cell per
 * stage. The full version, with deliverables, lives on /approach.
 */
export function ProcessOverview() {
  return (
    <Section tone="mist" aria-labelledby="process-overview-heading">
      <div className="px-6 sm:px-10 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>How we build</Eyebrow>
            <h2 id="process-overview-heading" className="mt-5 text-display-md text-ink">
              A defined engineering system. Not just prompts.
            </h2>
          </div>
          <p className="max-w-lg text-body-lg text-muted">
            Seven stages, each with a clear deliverable you sign off.
          </p>
        </div>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line grid-cols-2 lg:grid-cols-7">
          {stages.map((s, i) => (
            <li
              key={s.id}
              className="flex flex-col bg-paper p-4 last:col-span-2 sm:p-5 lg:p-6 lg:last:col-span-1"
            >
              <span className="font-mono text-label text-accent-fg">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-heading text-ink sm:mt-4">{s.title}</h3>
              <p className="mt-2 text-body-sm text-muted">{s.summary}</p>
            </li>
          ))}
        </ol>

        <ArrowLink href="/approach" className="mt-8">
          Explore our approach
        </ArrowLink>
      </div>
    </Section>
  );
}

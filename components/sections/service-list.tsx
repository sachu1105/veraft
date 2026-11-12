import { Check } from "lucide-react";
import { pillars } from "@/lib/site";
import { Section } from "@/components/ui/section";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Reveal } from "@/components/motion/reveal";
import { pillarIcons } from "@/components/sections/services-row";

/** Offering checklist — reused on the services overview and detail pages. */
export function OfferingList({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 py-2.5">
          <Check size={18} strokeWidth={1.75} aria-hidden className="mt-0.5 shrink-0 text-accent-fg" />
          <span className="text-body-sm text-ink">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** The four pillars expanded with full offerings — one framed block each. */
export function ServiceList() {
  return (
    <>
      {pillars.map((pillar, i) => {
        const Icon = pillarIcons[pillar.slug];
        return (
          <Section key={pillar.slug} aria-labelledby={pillar.slug}>
            <Reveal className="grid gap-8 px-6 sm:px-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:px-12">
              <div className="lg:max-w-sm">
                <div className="flex items-center gap-3">
                  {Icon && (
                    <span className="flex size-10 items-center justify-center rounded-md border border-line text-accent-fg">
                      <Icon size={19} strokeWidth={1.5} aria-hidden />
                    </span>
                  )}
                  <span className="font-mono text-label text-muted">
                    {String(i + 1).padStart(2, "0")} / {String(pillars.length).padStart(2, "0")}
                  </span>
                </div>
                <h2 id={pillar.slug} className="mt-6 scroll-mt-28 text-display-md text-ink">
                  {pillar.title}
                </h2>
                <p className="mt-4 text-body text-muted">{pillar.summary}</p>
                <ArrowLink href={pillar.href} className="mt-6">
                  Explore {pillar.title.toLowerCase()}
                </ArrowLink>
              </div>

              <div className="rounded-xl border border-line bg-mist/40 p-6 sm:p-8">
                <p className="font-mono text-label uppercase tracking-[0.12em] text-muted">
                  What we build
                </p>
                <OfferingList items={pillar.offerings} className="mt-3 grid gap-x-8 sm:grid-cols-2" />
                <p className="mt-5 border-t border-line pt-5 text-body-sm text-ink">
                  <span className="text-muted">For example: </span>
                  {pillar.lead}
                </p>
              </div>
            </Reveal>
          </Section>
        );
      })}
    </>
  );
}

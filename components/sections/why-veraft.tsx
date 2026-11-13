import { Check, Minus, X } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { alternatives, comparison, type Mark } from "@/lib/content";
import { cn } from "@/lib/cn";

const markIcon: Record<Mark, { icon: typeof Check; label: string; className: string }> = {
  yes: { icon: Check, label: "Yes", className: "text-ink" },
  partial: { icon: Minus, label: "Partly", className: "text-muted" },
  no: { icon: X, label: "No", className: "text-muted" },
};

/**
 * Why Veraft: the three things clients compare us with — a traditional
 * agency, a freelancer, AI coding tools — side by side, answered honestly.
 */
export function WhyVeraft() {
  return (
    <Section aria-labelledby="why-heading">
      <div className="px-6 sm:px-10 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>Why Veraft</Eyebrow>
            <h2 id="why-heading" className="mt-5 text-display-md text-ink">
              Not an agency. Not a freelancer. Not an AI tool.
            </h2>
          </div>
          <p className="max-w-lg text-body-lg text-muted">
            The engineering depth of a team, the speed of AI, and
            responsibility for the whole product.
          </p>
        </div>

        <div className="relative mt-12 overflow-x-auto rounded-xl border border-line bg-paper">
          <table className="w-full min-w-[820px] border-collapse text-left text-body-sm">
            <caption className="sr-only">
              A traditional agency, a freelancer and AI coding tools compared with Veraft
            </caption>
            <thead>
              <tr className="border-b border-line bg-mist/60">
                <th scope="col" className="w-[26%] px-5 py-4 font-mono text-label font-normal uppercase tracking-[0.12em] text-muted sm:px-6">
                  What a real product needs
                </th>
                {alternatives.map((a) => (
                  <th key={a} scope="col" className="px-5 py-4 font-medium text-ink sm:px-6">
                    {a}
                  </th>
                ))}
                <th scope="col" className="border-l border-accent/30 bg-accent/10 px-5 py-4 font-medium text-accent-fg sm:px-6">
                  Veraft
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.label} className="border-b border-line last:border-0">
                  <th scope="row" className="px-5 py-4 font-normal text-ink sm:px-6">
                    {row.label}
                  </th>
                  {row.others.map((cell, i) => {
                    const m = markIcon[cell.mark];
                    const Icon = m.icon;
                    return (
                      <td key={alternatives[i]} className="px-5 py-4 sm:px-6">
                        <span className={cn("flex items-center gap-2.5", m.className)}>
                          <Icon size={16} strokeWidth={2} aria-hidden className="shrink-0" />
                          <span className="sr-only">{m.label}: </span>
                          {cell.note}
                        </span>
                      </td>
                    );
                  })}
                  <td className="border-l border-accent/30 bg-accent/5 px-5 py-4 sm:px-6">
                    <span className="flex items-center gap-2.5 text-ink">
                      <Check size={16} strokeWidth={2.25} aria-hidden className="shrink-0 text-accent-fg" />
                      <span className="sr-only">Yes: </span>
                      {row.veraft}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}

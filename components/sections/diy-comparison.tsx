import { Check, Minus, X } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { diyComparison, type Mark } from "@/lib/content";
import { cn } from "@/lib/cn";

const markIcon: Record<Mark, { icon: typeof Check; label: string; className: string }> = {
  yes: { icon: Check, label: "Yes", className: "text-ink" },
  partial: { icon: Minus, label: "Partly", className: "text-muted" },
  no: { icon: X, label: "No", className: "text-muted" },
};

/**
 * The objection every client raises — "why can't I just build it with AI
 * myself?" — answered honestly, as a side-by-side.
 */
export function DiyComparison() {
  return (
    <Section aria-labelledby="diy-heading">
      <div className="px-6 sm:px-10 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>The honest answer</Eyebrow>
            <h2 id="diy-heading" className="mt-5 text-display-md text-ink">
              “Why can&apos;t I just build it with AI myself?”
            </h2>
          </div>
          <p className="max-w-lg text-body text-muted">
            For a quick prototype, you should. AI makes the first 80% easy.
            The last 20% — security, integrations, deployment and everything
            that breaks at 2 a.m. — is where products succeed or stall.
            That&apos;s the part we&apos;re for.
          </p>
        </div>

        <div className="relative mt-12 overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[640px] border-collapse text-left text-body-sm">
            <caption className="sr-only">
              Building with AI tools yourself compared with building with Veraft
            </caption>
            <thead>
              <tr className="border-b border-line bg-mist/60">
                <th scope="col" className="w-[40%] px-5 py-4 font-mono text-label font-normal uppercase tracking-[0.12em] text-muted sm:px-6">
                  What a real product needs
                </th>
                <th scope="col" className="px-5 py-4 font-medium text-ink sm:px-6">
                  DIY with AI tools
                </th>
                <th scope="col" className="border-l border-accent/20 bg-accent/5 px-5 py-4 font-medium text-accent-fg sm:px-6">
                  With Veraft
                </th>
              </tr>
            </thead>
            <tbody>
              {diyComparison.map((row) => {
                const m = markIcon[row.diy];
                const Icon = m.icon;
                return (
                  <tr key={row.label} className="border-b border-line last:border-0">
                    <th scope="row" className="px-5 py-4 font-normal text-ink sm:px-6">
                      {row.label}
                    </th>
                    <td className="px-5 py-4 sm:px-6">
                      <span className={cn("flex items-center gap-2.5", m.className)}>
                        <Icon size={16} strokeWidth={2} aria-hidden className="shrink-0" />
                        <span className="sr-only">{m.label}: </span>
                        {row.diyNote}
                      </span>
                    </td>
                    <td className="border-l border-accent/20 bg-accent/5 px-5 py-4 sm:px-6">
                      <span className="flex items-center gap-2.5 text-ink">
                        <Check size={16} strokeWidth={2.25} aria-hidden className="shrink-0 text-accent-fg" />
                        <span className="sr-only">Yes: </span>
                        {row.veraft}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}

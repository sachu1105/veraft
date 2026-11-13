import { Section } from "@/components/ui/section";
import { models } from "@/lib/content";

/**
 * "Models we orchestrate" — a bordered strip of model wordmarks (text only,
 * no third-party logos), in the spirit of a "trusted by" logo row. Hairline
 * dividers come from a 1px grid gap over the line color.
 */
export function ModelStrip() {
  return (
    <Section padding="none" aria-labelledby="models-heading">
      <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-[1.3fr_repeat(5,1fr)]">
        <h2
          id="models-heading"
          className="col-span-2 flex items-center bg-paper px-6 py-6 font-mono text-label uppercase leading-relaxed tracking-[0.14em] text-muted sm:col-span-3 sm:px-10 lg:col-span-1 lg:px-12"
        >
          Models we
          <br className="hidden lg:block" /> orchestrate
        </h2>
        {models.map((m) => (
          <div
            key={m.name}
            className="flex min-h-[84px] flex-col items-center justify-center gap-1 bg-paper px-4 py-4 sm:min-h-[104px] sm:py-6 text-center last:col-span-2 lg:last:col-span-1"
          >
            <span className="text-[1.375rem] font-semibold tracking-tight text-ink/80">
              {m.name}
            </span>
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
              {m.maker}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}

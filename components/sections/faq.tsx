import { Plus } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { JsonLd } from "@/components/seo/json-ld";
import type { Faq as FaqItem } from "@/lib/content";

/**
 * FAQ using native <details> — no JS, fully crawlable — plus matching
 * FAQPage structured data.
 */
export function Faq({
  items,
  heading = "Questions we get asked a lot.",
  eyebrow = "FAQ",
}: {
  items: FaqItem[];
  heading?: string;
  eyebrow?: string;
}) {
  return (
    <Section aria-labelledby="faq-heading">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <div className="grid gap-10 px-6 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-12">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="faq-heading" className="mt-5 text-display-md text-ink">
            {heading}
          </h2>
        </div>

        <div className="border-t border-line">
          {items.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-body text-ink transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus
                  size={18}
                  strokeWidth={1.75}
                  aria-hidden
                  className="mt-1 shrink-0 text-accent transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="max-w-2xl pb-6 text-body-sm text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

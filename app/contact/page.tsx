import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/sections/contact-form";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Book a call",
  description:
    "Book a short call with Veraft. Tell us what you want to build — we'll reply within one business day and follow up with a plan, a token estimate and a cap.",
  path: "/contact",
});

const nextSteps = [
  "We reply within one business day to confirm a time.",
  "A short call to understand the problem and what done looks like.",
  "A milestone plan with a token estimate and a cap — no obligation.",
];

export default function ContactPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Book a call"
        title="Let's lay the first brick."
        intro="Tell us what you want to build, integrate or deploy. The more context you share, the better the first conversation."
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div className="flex flex-col gap-10">
              <div>
                <h2 className="font-mono text-label uppercase tracking-[0.12em] text-muted">
                  What happens next
                </h2>
                <ol className="mt-5 flex flex-col">
                  {nextSteps.map((step, i) => (
                    <li key={step} className="flex gap-4 border-t border-line py-4 last:border-b">
                      <span className="font-mono text-label text-accent-fg">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-body-sm text-ink">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h2 className="font-mono text-label uppercase tracking-[0.12em] text-muted">
                  Prefer email?
                </h2>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-4 inline-flex items-center gap-1.5 break-all text-heading text-ink transition-colors hover:text-accent-fg"
                >
                  {site.email}
                  <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden />
                </a>
                <p className="mt-2 text-body-sm text-muted">{site.location}</p>
              </div>
            </div>

            <ContactForm />
          </div>
        </Container>
      </Section>
    </main>
  );
}

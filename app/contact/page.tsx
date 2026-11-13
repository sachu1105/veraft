import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/sections/contact-form";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Start a project",
  description:
    "Tell Veraft what you want to build. We reply within one business day, run a discovery call, and follow up with a proposal: scope, timeline and budget.",
  path: "/contact",
});

const nextSteps = [
  "We reply within one business day, by email or a call if you left a number.",
  "A discovery call on your goals, users and requirements.",
  "A proposal with scope, timeline, budget and engagement model — no obligation.",
];

export default function ContactPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Start a project"
        title="Have an idea worth building? Let's engineer it."
        intro="Tell us what you want to build. The more context, the better the discovery call."
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

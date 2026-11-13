import type { Metadata } from "next";
import { ArrowUpRight, Check, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CopyButton } from "@/components/ui/copy-button";
import { ContactForm } from "@/components/sections/contact-form";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Start a project",
  description:
    "Tell Veraft what you want to build. We reply within one business day, run a discovery call, and follow up with a proposal: scope, timeline and budget.",
  path: "/contact",
});

const promises = [
  "Reply within one business day",
  "A free proposal — no obligation",
  "You own everything we build",
];

const nextSteps = [
  { title: "We reply", body: "Within one business day, by email or a call." },
  { title: "Discovery call", body: "Your goals, users and requirements." },
  {
    title: "Your proposal",
    body: "Scope, timeline, budget and engagement model.",
  },
];

/**
 * Contact: no separate hero — the form sits at the top of the page so a
 * visitor can start typing without scrolling. Phones read: intro → form →
 * what happens next / email; desktop puts intro and details beside the form.
 */
export default function ContactPage() {
  return (
    <main id="main">
      <Section tone="mist" padding="none" className="overflow-hidden">
        <div
          aria-hidden
          className="bg-iso-grid mask-radial pointer-events-none absolute inset-y-0 left-0 w-full opacity-50 lg:w-[55%]"
        />
        <Container className="relative py-10 sm:py-14 lg:py-16">
          {/* Two equal-height columns on desktop: the left column spreads its
              blocks top-to-bottom and the form card stretches to match, so
              their top and bottom edges line up whichever is taller. On phones
              the left wrapper dissolves (display: contents) and `order` reads
              intro → form → details. */}
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div className="contents lg:col-start-1 lg:row-start-1 lg:flex lg:flex-col lg:justify-between lg:gap-10">
              {/* Intro */}
              <div className="order-1">
                <div className="flex">
                  <Eyebrow>Start a project</Eyebrow>
                </div>
                <h1 className="mt-5 text-display-md text-ink sm:text-display-lg lg:text-display-md">
                  Have an idea worth building? Let&apos;s engineer it.
                </h1>
                <p className="mt-4 max-w-md text-body-lg text-muted">
                  Tell us a little about it — it takes two minutes.
                </p>
                <ul className="mt-6 flex flex-col gap-2.5">
                  {promises.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-2.5 text-body-sm text-ink"
                    >
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent-fg">
                        <Check size={12} strokeWidth={2.5} aria-hidden />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {/* What happens next + direct email */}
              <div className="order-3 flex flex-col gap-8">
                <div>
                  <h2 className="text-body-sm font-medium text-ink">
                    What happens next
                  </h2>
                  <ol className="mt-4 flex flex-col">
                    {nextSteps.map((step, i) => (
                      <li
                        key={step.title}
                        className="flex gap-4 border-t border-line py-3.5 last:border-b"
                      >
                        <span className="font-mono text-label text-accent-fg">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-body-sm">
                          <span className="font-medium text-ink">
                            {step.title}
                          </span>
                          <span className="text-muted"> — {step.body}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Brand gradient card (same fixed grad-* tones as the footer
                    wordmark) — white copy holds ~5:1 across the whole ramp. */}
                <div className="rounded-xl bg-gradient-to-tr from-grad-1 via-grad-2 to-grad-3 p-5 text-on-dark">
                  <h2 className="text-body-sm font-medium text-on-dark">
                    Rather write an email?
                  </h2>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <a
                      href={`mailto:${site.email}`}
                      className="inline-flex min-w-0 items-center gap-2 break-all rounded-sm text-body text-on-dark underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-dark"
                    >
                      <Mail
                        size={17}
                        strokeWidth={1.5}
                        aria-hidden
                        className="shrink-0"
                      />
                      {site.email}
                      <ArrowUpRight
                        size={15}
                        strokeWidth={1.5}
                        aria-hidden
                        className="shrink-0"
                      />
                    </a>
                    <CopyButton value={site.email} tone="onColor" />
                  </div>
                  <p className="mt-3 text-label text-on-dark/85">
                    {site.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Form — first thing after the intro on phones, beside it on desktop */}
            <div className="order-2 lg:col-start-2 lg:row-start-1">
              <ContactForm className="h-full" />
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

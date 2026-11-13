import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/ui/section";

const btn =
  "inline-flex h-[3.25rem] items-center justify-center gap-2 rounded-md px-7 text-body font-medium leading-none " +
  "transition duration-150 ease-out-quint active:scale-[0.98] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-accent";

/**
 * Closing call to action: a vivid "aurora" band in brand blues (light rays,
 * bottom bloom, film grain — see `.cta-aurora` in globals.css). Identical in
 * light and dark themes, so its colours are fixed brand tokens.
 */
export function CtaBand({
  title = (
    <>
      Lay the first brick.
      <br />
      What will you ship?
    </>
  ),
  body = "Tell us what you want to build. You'll get a plan, a token estimate and a cap.",
}: {
  title?: React.ReactNode;
  body?: string;
}) {
  return (
    <Section padding="none" aria-labelledby="cta-heading">
      <div className="cta-aurora px-6 py-16 text-center sm:py-20 lg:py-24">
        <div className="relative mx-auto flex max-w-3xl flex-col items-center">
          <h2
            id="cta-heading"
            className="text-display-lg text-on-accent [text-shadow:0_2px_24px_rgb(var(--c-brand-950)/0.6)]"
          >
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-body-lg text-on-accent/85 [text-shadow:0_1px_12px_rgb(var(--c-brand-950)/0.6)]">
            {body}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className={`${btn} bg-on-accent text-brand-900 shadow-[0_10px_40px_-10px_rgb(var(--c-brand-950)/0.8)] hover:bg-brand-200`}
            >
              Book a call
              <ArrowRight size={18} strokeWidth={1.75} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

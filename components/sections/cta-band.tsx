import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import beams from "@/public/images/cta-beams.png";

const btn =
  "inline-flex h-[3.25rem] items-center justify-center gap-2 rounded-md px-7 text-body font-medium leading-none " +
  "transition duration-150 ease-out-quint active:scale-[0.98] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-dark";

/**
 * Closing call to action over the "light beams" photo
 * (public/images/cta-beams.png): dark at the top behind the copy, beams
 * fanning up from a bloom at the bottom. The photo is desaturated and then
 * recoloured with a brand-blue `mix-blend-color` layer, so the beams take
 * the accent hue while keeping their light and shade. Identical in light and
 * dark themes, so its colours are fixed brand tokens. The image goes through next/image,
 * so it is served as responsive AVIF/WebP rather than the 1.4 MB PNG.
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
      <div className="relative isolate overflow-hidden bg-brand-900 px-6 py-16 text-center sm:py-20 lg:py-24">
        <Image
          src={beams}
          alt=""
          fill
          placeholder="blur"
          sizes="(min-width: 1264px) 1200px, 100vw"
          className="-z-10 object-cover object-bottom grayscale"
        />
        <span aria-hidden className="absolute inset-0 -z-10 bg-brand-500 mix-blend-color" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center">
          <h2
            id="cta-heading"
            className="text-display-lg text-on-dark [text-shadow:0_2px_24px_rgb(var(--c-brand-950)/0.6)]"
          >
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-body-lg text-on-dark/85 [text-shadow:0_1px_12px_rgb(var(--c-brand-950)/0.6)]">
            {body}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className={`${btn} bg-on-dark text-brand-900 shadow-[0_10px_40px_-10px_rgb(var(--c-brand-950)/0.8)] hover:bg-brand-200`}
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

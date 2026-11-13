import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import gradient from "@/public/images/cta-gradient.png";

const btn =
  "inline-flex h-[3.25rem] items-center justify-center gap-2 rounded-md px-7 text-body font-medium leading-none " +
  "transition duration-150 ease-out-quint active:scale-[0.98] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-dark";

/**
 * Closing call to action over a soft pink → blue → violet gradient photo
 * (public/images/cta-gradient.png). Copy and button are white; a soft
 * dark-violet radial scrim behind the copy (no text shadow) keeps
 * white text legible over the light middle of the image. Fixed tokens, so it
 * reads the same in light and dark themes. The image goes through
 * next/image, so it is served as responsive AVIF/WebP rather than the PNG.
 */
export function CtaBand({
  title = (
    <>
      Have an idea worth building?
      <br />
      Let&apos;s engineer it.
    </>
  ),
  body = "Tell us what you need. You'll get a scoped plan, a timeline and a budget to approve.",
  cta = "Start your project",
}: {
  title?: React.ReactNode;
  body?: string;
  cta?: string;
}) {
  return (
    <Section padding="none" aria-labelledby="cta-heading">
      <div className="relative isolate overflow-hidden bg-brand-300 px-6 py-16 text-center sm:py-20 lg:py-24">
        <Image
          src={gradient}
          alt=""
          fill
          placeholder="blur"
          sizes="(min-width: 1264px) 1200px, 100vw"
          className="-z-10 object-cover"
        />
        <span
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(55%_75%_at_50%_45%,rgb(var(--c-brand-950)/0.42),transparent_78%)]"
        />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center">
          <h2
            id="cta-heading"
            className="text-display-lg text-on-dark"
          >
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-body-lg text-on-dark/90">
            {body}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className={`${btn} bg-on-dark text-brand-900 shadow-[0_10px_30px_-12px_rgb(var(--c-brand-950)/0.5)] hover:bg-brand-200`}
            >
              {cta}
              <ArrowRight size={18} strokeWidth={1.75} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

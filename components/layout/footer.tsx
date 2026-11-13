import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { pillars, site, social } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "./logo";

const companyLinks = [
  { label: "How we work", href: "/approach" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Book a call", href: "/contact" },
];

export function Footer() {
  const year = 2026;

  return (
    <footer className="relative overflow-hidden bg-paper">
      <div className="mx-auto w-full max-w-[1200px] min-[1264px]:border-x min-[1264px]:border-line">
        <div className="grid gap-12 px-6 pb-12 pt-20 sm:px-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:px-12">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-6 text-heading font-medium text-accent-fg">
              Software built brick by brick with AI agents — from first brief
              to production.
            </p>
            <ButtonLink href="/contact" className="mt-7">
              Book a call
              <ArrowRight size={16} strokeWidth={1.75} aria-hidden />
            </ButtonLink>
          </div>

          <FooterColumn title="Services">
            {pillars.map((p) => (
              <FooterLink key={p.href} href={p.href}>
                {p.title}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Company">
            {companyLinks.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Get in touch">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-1.5 text-body-sm text-ink transition-colors hover:text-accent-fg"
            >
              {site.email}
              <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden />
            </a>
            <span className="text-body-sm text-muted">{site.location}</span>
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-body-sm text-muted transition-colors hover:text-ink"
              >
                {s.label}
              </a>
            ))}
          </FooterColumn>
        </div>

        <div className="flex flex-col gap-2 px-6 pb-10 text-label text-muted sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-12">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="font-mono">Built brick by brick.</p>
        </div>

        {/* Oversized wordmark, with a little breathing room below it. */}
        <div aria-hidden className="px-6 pb-8 sm:px-10 sm:pb-10 lg:px-12 lg:pb-12">
          <div className="wordmark-mask wordmark-aurora aspect-[1223/303] mx-auto w-full lg:w-[70%]" />
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-body-sm font-medium text-ink">{title}</h2>
      <div className="mt-5 flex flex-col gap-3.5">{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="text-body-sm text-muted transition-colors hover:text-ink">
      {children}
    </Link>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu } from "lucide-react";
import { primaryNav, site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Keep latest menu state readable inside the scroll handler without
  // re-subscribing the listener.
  const menuOpenRef = useRef(menuOpen);
  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 8);
        const delta = y - lastY;
        // Reveal near the top or when the menu is open; hide on a meaningful
        // downward scroll, reveal on upward scroll.
        if (y < 96 || menuOpenRef.current) {
          setHidden(false);
        } else if (delta > 6) {
          setHidden(true);
        } else if (delta < -6) {
          setHidden(false);
        }
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-line transition-[transform,background-color,backdrop-filter] duration-300 ease-out-quint",
        hidden ? "-translate-y-full" : "translate-y-0",
        scrolled ? "bg-paper/85 backdrop-blur-md" : "bg-paper",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-6 sm:px-10 lg:px-12 min-[1264px]:border-x min-[1264px]:border-line">
        <div className="flex items-center gap-8">
          <Logo />

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative rounded-md px-3 py-2 text-body-sm transition-colors duration-150",
                        active ? "text-ink" : "text-ink/70 hover:text-ink",
                      )}
                    >
                      {item.label}
                      {active && (
                        <span
                          aria-hidden
                          className="absolute inset-x-3 -bottom-[13px] h-0.5 bg-ink"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* Below md the toggle lives in the mobile menu instead. */}
          <div className="hidden md:flex">
            <ThemeToggle />
          </div>
          <ButtonLink href="/contact" className="hidden h-10 px-4 md:inline-flex">
            Book a call
            <ArrowRight size={16} strokeWidth={1.75} aria-hidden />
          </ButtonLink>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="inline-flex size-11 items-center justify-center rounded-md text-ink hover:bg-mist md:hidden"
          >
            <Menu size={22} strokeWidth={1.5} aria-hidden />
          </button>
        </div>
      </div>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        contactEmail={site.email}
      />
    </header>
  );
}

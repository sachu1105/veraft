"use client";

import { useEffect, useRef, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Command } from "cmdk";
import { Check, ChevronDown, Search } from "lucide-react";
import { countries, findCountry } from "@/lib/countries";
import { cn } from "@/lib/cn";

/**
 * Flag image from /public/flags (SVGs copied from country-flag-icons by
 * `npm run flags`). Served as lazy-loaded static files rather than bundled
 * into JS; flag emoji isn't an option because Windows doesn't render it.
 */
export function CountryFlag({
  iso,
  className,
}: {
  iso: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex h-3.5 w-5 shrink-0 overflow-hidden rounded-[3px] bg-mist ring-1 ring-line",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- tiny static SVGs; next/image adds nothing here */}
      <img
        src={`/flags/${iso}.svg`}
        alt=""
        width={20}
        height={14}
        loading="lazy"
        decoding="async"
        className="size-full object-cover"
      />
    </span>
  );
}

/**
 * Searchable country-code picker: a Radix popover holding a cmdk list.
 * Type a country name or a dial code ("ger", "44") to filter; arrows + Enter
 * to choose.
 */
export function CountryPicker({
  value,
  onChange,
  invalid,
  id,
}: {
  value: string;
  onChange: (iso: string) => void;
  invalid?: boolean;
  id?: string;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const selected = findCountry(value);

  function handleOpenChange(next: boolean) {
    // Start the keyboard highlight on the current country.
    if (next) setActive(selected ? itemValue(selected) : "");
    setOpen(next);
  }

  // Bring the current country into view when the list opens.
  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => {
      listRef.current
        ?.querySelector<HTMLElement>(`[data-iso="${value}"]`)
        ?.scrollIntoView({ block: "center" });
    });
    return () => cancelAnimationFrame(raf);
  }, [open, value]);

  return (
    <Popover.Root open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger
        id={id}
        type="button"
        aria-label={
          selected
            ? `Country code: ${selected[1]} +${selected[2]}`
            : "Choose country code"
        }
        className={cn(
          "flex shrink-0 items-center gap-2 rounded-md border bg-paper px-3 text-body text-ink",
          "transition-colors duration-150 hover:border-ink/25 focus-visible:border-ink focus-visible:outline-none",
          "data-[state=open]:border-ink",
          invalid ? "border-danger" : "border-line",
        )}
      >
        {selected && <CountryFlag iso={selected[0]} />}
        <span className="tabular-nums">+{selected?.[2]}</span>
        <ChevronDown
          size={15}
          strokeWidth={1.5}
          aria-hidden
          className={cn(
            "text-muted transition-transform duration-150",
            open && "rotate-180",
          )}
        />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={6}
          collisionPadding={16}
          className="z-50 w-[min(320px,calc(100vw-32px))] overflow-hidden rounded-lg border border-line bg-paper shadow-raised dark:bg-mist"
        >
          <Command
            label="Country calling code"
            value={active}
            onValueChange={setActive}
            filter={(itemVal, search) =>
              itemVal
                .toLowerCase()
                .includes(search.trim().toLowerCase().replace(/^\+/, ""))
                ? 1
                : 0
            }
          >
            <div className="flex items-center gap-2 border-b border-line px-3">
              <Search
                size={15}
                strokeWidth={1.5}
                aria-hidden
                className="text-muted"
              />
              <Command.Input
                autoFocus
                placeholder="Search country or code"
                className="h-11 w-full bg-transparent text-body-sm text-ink outline-none placeholder:text-muted/70"
              />
            </div>
            <Command.List
              ref={listRef}
              data-lenis-prevent
              className="max-h-72 overflow-y-auto overscroll-contain p-1"
            >
              <Command.Empty className="px-3 py-6 text-center text-body-sm text-muted">
                No country found.
              </Command.Empty>
              {countries.map((c) => {
                const [iso, name, dial] = c;
                const isSelected = iso === value;
                return (
                  <Command.Item
                    key={iso}
                    value={itemValue(c)}
                    data-iso={iso}
                    onSelect={() => {
                      onChange(iso);
                      setOpen(false);
                    }}
                    className="flex cursor-pointer items-center gap-3 rounded-md px-2.5 py-2 text-body-sm text-ink data-[selected=true]:bg-ink/5"
                  >
                    <CountryFlag iso={iso} />
                    <span className="flex-1 truncate">{name}</span>
                    <span className="font-mono text-label tabular-nums text-muted">
                      +{dial}
                    </span>
                    <Check
                      size={14}
                      strokeWidth={2}
                      aria-hidden
                      className={cn(
                        "text-accent-fg",
                        isSelected ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </Command.Item>
                );
              })}
            </Command.List>
          </Command>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

/** cmdk matches on this string, so it covers name, dial code and ISO code. */
function itemValue([iso, name, dial]: readonly [
  string,
  string,
  string,
]): string {
  return `${name} ${dial} ${iso}`;
}

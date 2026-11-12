import { Coins } from "lucide-react";
import { ledgerExample } from "@/lib/content";
import { cn } from "@/lib/cn";

const fmt = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(2)}M` : `${Math.round(n / 1000)}k`;

/**
 * Illustrative token estimate: per-phase usage bars, a total, and the
 * client's cap. Shared by the home pricing teaser and /pricing.
 */
export function TokenLedger({ className }: { className?: string }) {
  const { project, cap, rows } = ledgerExample;
  const total = rows.reduce((sum, r) => sum + r.tokens, 0);
  const max = Math.max(...rows.map((r) => r.tokens));
  const usedPct = Math.round((total / cap) * 100);

  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl border border-line bg-paper shadow-[0_24px_60px_-30px_rgb(var(--c-accent)/0.35)]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-line bg-mist/60 px-5 py-3.5">
        <span className="flex items-center gap-2 font-mono text-label text-ink">
          <Coins size={14} strokeWidth={1.75} className="text-accent-fg" aria-hidden />
          estimate · {project}
        </span>
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
          example
        </span>
      </div>

      <table className="w-full table-fixed text-body-sm">
        <colgroup>
          <col className="w-[40%]" />
          <col />
          <col className="w-[5.5rem]" />
        </colgroup>
        <caption className="sr-only">
          Example token estimate for a {project}, by phase
        </caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">Phase</th>
            <th scope="col">Share</th>
            <th scope="col">Tokens</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.phase} className="border-b border-line/70 last:border-0">
              <th scope="row" className="py-3 pl-5 pr-3 text-left font-normal text-ink">
                {r.phase}
              </th>
              <td className="py-3 pr-4">
                <div className="h-1.5 overflow-hidden rounded-full bg-mist">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${Math.max(6, (r.tokens / max) * 100)}%` }}
                  />
                </div>
              </td>
              <td className="py-3 pr-5 text-right font-mono text-label text-muted">
                {fmt(r.tokens)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="border-t border-line bg-mist/40 px-5 py-4">
        <div className="flex items-baseline justify-between">
          <span className="text-body-sm text-ink">Estimated total</span>
          <span className="font-mono text-body-sm text-ink">
            {fmt(total)} <span className="text-muted">/ {fmt(cap)} cap</span>
          </span>
        </div>
        <div
          className="mt-2.5 h-2 overflow-hidden rounded-full bg-line"
          role="meter"
          aria-label="Share of token cap used by the estimate"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={usedPct}
        >
          <div className="h-full rounded-full bg-accent" style={{ width: `${usedPct}%` }} />
        </div>
        <figcaption className="mt-2.5 font-mono text-[0.6875rem] text-muted">
          {usedPct}% of cap · we stop and ask before crossing it
        </figcaption>
      </div>
    </figure>
  );
}

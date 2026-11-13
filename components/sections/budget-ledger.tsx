import { Check, Wallet } from "lucide-react";
import { budgetExample } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * Illustrative milestone plan: each stage's share of the approved budget,
 * its status, and how much has been delivered so far. Shared by the home
 * engagement teaser and /pricing.
 */
export function BudgetLedger({ className }: { className?: string }) {
  const { project, rows } = budgetExample;
  const max = Math.max(...rows.map((r) => r.share));
  const delivered = rows.filter((r) => r.status === "done").reduce((sum, r) => sum + r.share, 0);

  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl border border-line bg-paper",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-line bg-mist/60 px-5 py-3.5">
        <span className="flex items-center gap-2 font-mono text-label text-ink">
          <Wallet size={14} strokeWidth={1.75} className="text-accent-fg" aria-hidden />
          milestones · {project}
        </span>
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
          example
        </span>
      </div>

      <table className="w-full table-fixed text-body-sm">
        <colgroup>
          <col className="w-[34%]" />
          <col />
          <col className="w-[8rem]" />
        </colgroup>
        <caption className="sr-only">
          Example milestone plan for a {project}: each stage&apos;s share of the budget
        </caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">Milestone</th>
            <th scope="col">Share of budget</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.stage} className="border-b border-line/70 last:border-0">
              <th scope="row" className="py-3 pl-5 pr-3 text-left font-normal text-ink">
                {r.stage}
                <span className="ml-2 font-mono text-label text-muted">{r.share}%</span>
              </th>
              <td className="py-3 pr-4">
                <div className="h-1.5 overflow-hidden rounded-full bg-mist">
                  <div
                    className={cn("h-full rounded-full", r.status === "next" ? "bg-line" : "bg-ink")}
                    style={{ width: `${Math.max(6, (r.share / max) * 100)}%` }}
                  />
                </div>
              </td>
              <td className="whitespace-nowrap py-3 pr-5 text-right font-mono text-label">
                {r.status === "done" && (
                  <span className="inline-flex items-center gap-1 text-ink">
                    <Check size={12} strokeWidth={2.5} aria-hidden />
                    Delivered
                  </span>
                )}
                {r.status === "active" && <span className="text-accent-fg">In progress</span>}
                {r.status === "next" && <span className="text-muted">Upcoming</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="border-t border-line bg-mist/40 px-5 py-4">
        <div className="flex items-baseline justify-between">
          <span className="text-body-sm text-ink">Approved budget</span>
          <span className="font-mono text-body-sm text-ink">
            {delivered}% <span className="text-muted">delivered</span>
          </span>
        </div>
        <div
          className="mt-2.5 h-2 overflow-hidden rounded-full bg-line"
          role="meter"
          aria-label="Share of the approved budget delivered so far"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={delivered}
        >
          <div className="h-full rounded-full bg-accent" style={{ width: `${delivered}%` }} />
        </div>
        <figcaption className="mt-2.5 font-mono text-[0.6875rem] text-muted">
          Payments linked to milestones · changes approved first
        </figcaption>
      </div>
    </figure>
  );
}

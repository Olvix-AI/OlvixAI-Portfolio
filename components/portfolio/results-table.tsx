"use client";

import type { Results } from "@/lib/projects";
import { AnimatedCounter } from "./animated-counter";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/**
 * Results: an optional honesty note, one or two animated headline figures, then the
 * full table. Where the copy doc's table has no header row (PowerUp, Agentic Decks,
 * KairosAI) none is rendered and the label column becomes a row header instead.
 */
export function ResultsTable({ results }: { results: Results }) {
  const { note, headline, columns, rows } = results;

  return (
    <div className="space-y-10 lg:space-y-14">
      {note ? <p className="text-lg leading-relaxed text-foreground/70">{note}</p> : null}

      {headline && headline.length > 0 ? (
        <div
          className={`grid gap-px bg-foreground/10 border border-foreground/10 ${
            headline.length > 1 ? "sm:grid-cols-2" : "grid-cols-1"
          }`}
        >
          {headline.map((figure) => (
            <div key={figure.label} className="bg-background p-6 lg:p-8">
              <AnimatedCounter
                end={figure.value}
                prefix={figure.prefix}
                suffix={figure.suffix}
                className="text-5xl lg:text-7xl font-display tracking-tight tabular-nums"
              />
              <div className="mt-3 text-sm font-mono text-muted-foreground">{figure.label}</div>
            </div>
          ))}
        </div>
      ) : null}

      <div
        role="region"
        aria-label="Results"
        tabIndex={0}
        className={`overflow-x-auto border border-foreground/10 ${FOCUS_RING}`}
      >
        <table className="w-full min-w-[520px] text-left border-collapse">
          <caption className="sr-only">Results</caption>
          {columns ? (
            <thead>
              <tr className="border-b border-foreground/10 bg-foreground/[0.02]">
                <th
                  scope="col"
                  className="px-5 py-4 text-xs font-mono font-normal tracking-widest uppercase text-muted-foreground align-top w-[52%]"
                >
                  {columns[0]}
                </th>
                <th
                  scope="col"
                  className="px-5 py-4 text-xs font-mono font-normal tracking-widest uppercase text-muted-foreground align-top"
                >
                  {columns[1]}
                </th>
              </tr>
            </thead>
          ) : null}
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-foreground/10 last:border-b-0">
                <th
                  scope="row"
                  className="px-5 py-5 align-top font-mono text-sm font-normal text-foreground w-[52%] sm:w-[40%]"
                >
                  {row.label}
                </th>
                <td className="px-5 py-5 align-top text-foreground/70 leading-relaxed">
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

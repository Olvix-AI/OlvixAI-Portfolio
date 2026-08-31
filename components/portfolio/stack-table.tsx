"use client";

import type { StackRow } from "@/lib/projects";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/**
 * The stack, by layer.
 *
 * Wide content scrolls inside its own container rather than pushing the page sideways.
 * The wrapper is focusable and labelled because a scrollable region has to be reachable
 * by keyboard, not just by trackpad.
 */
export function StackTable({ rows }: { rows: StackRow[] }) {
  return (
    <div
      role="region"
      aria-label="Technology stack by layer"
      tabIndex={0}
      className={`overflow-x-auto border border-foreground/10 ${FOCUS_RING}`}
    >
      <table className="w-full min-w-[520px] text-left border-collapse">
        <caption className="sr-only">Technology stack, by layer</caption>
        <thead>
          <tr className="border-b border-foreground/10 bg-foreground/[0.02]">
            <th
              scope="col"
              className="px-5 py-4 text-xs font-mono font-normal tracking-widest uppercase text-muted-foreground align-top w-[38%] sm:w-[30%]"
            >
              Layer
            </th>
            <th
              scope="col"
              className="px-5 py-4 text-xs font-mono font-normal tracking-widest uppercase text-muted-foreground align-top"
            >
              What we used
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.layer} className="border-b border-foreground/10 last:border-b-0">
              <th
                scope="row"
                className="px-5 py-5 align-top font-mono text-sm font-normal text-foreground"
              >
                {row.layer}
              </th>
              <td className="px-5 py-5 align-top">
                <ul className="space-y-2">
                  {row.items.map((item, index) => (
                    <li key={index} className="text-foreground/70 leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

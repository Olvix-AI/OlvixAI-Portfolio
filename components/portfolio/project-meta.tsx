"use client";

import type { MetaRow } from "@/lib/projects";
import { useReveal } from "./reveal";

/**
 * The Domain / Status strip.
 *
 * There used to be a leading `Type` row stating the engagement category, rendered at
 * full weight while the rest sat at /70. That row was removed from the site, so the
 * emphasis went with it — keeping it would have arbitrarily bolded whatever row
 * happened to be first. All rows now render the same.
 *
 * `Timeframe` and `Team` were removed too, so only two rows remain. `Status` is now
 * the ONLY thing on the site that distinguishes a shipped client engagement from a
 * project OlvixAI built for itself — "Live — App Store and Google Play" versus "not
 * publicly deployed", "not commercially launched", "In development". Do not soften or
 * remove it; there is nothing left behind it.
 */
export function ProjectMeta({ rows }: { rows: MetaRow[] }) {
  const { ref, isVisible } = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative border-y border-foreground/10 bg-foreground/[0.02]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <dl className="py-4 lg:py-6">
          {rows.map((row, index) => {
            return (
              <div
                key={row.label}
                className={`flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8 py-4 border-b border-foreground/5 last:border-b-0 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <dt className="shrink-0 sm:w-40 text-xs sm:text-sm font-mono text-muted-foreground">
                  {row.label}
                </dt>
                <dd className="text-base lg:text-lg text-foreground/70">
                  {row.value}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

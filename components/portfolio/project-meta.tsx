"use client";

import type { MetaRow } from "@/lib/projects";
import { useReveal } from "./reveal";

/**
 * The Type / Domain / Timeframe / Team / Status strip.
 *
 * The first row is always `Type`, and it is deliberately the loudest thing here: the
 * copy doc's honesty check requires each project to state plainly whether it was a
 * contract engagement, a production feature of someone else's product, or an in-house
 * capstone. It is rendered at full foreground weight while the rest sit at /70.
 */
export function ProjectMeta({ rows }: { rows: MetaRow[] }) {
  const { ref, isVisible } = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative border-y border-foreground/10 bg-foreground/[0.02]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <dl className="py-4 lg:py-6">
          {rows.map((row, index) => {
            const isType = index === 0;
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
                <dd
                  className={`text-base lg:text-lg ${
                    isType ? "text-foreground font-medium" : "text-foreground/70"
                  }`}
                >
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

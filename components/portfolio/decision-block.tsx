"use client";

import type { Decision } from "@/lib/projects";
import { useReveal } from "./reveal";

/**
 * The Decisions blocks — the reason anybody reads a case study twice. Each is a short
 * essay (the obvious approach, why it fails, what we did instead) and gets a treatment
 * no other prose on the page has: a card lifted off the section's wash, a heavy left
 * rule, and a mono counter.
 *
 * Deliberately NOT inverted. Two thousand words of `bg-foreground text-background` is
 * the wrong call for long-form reading; the weight comes from the rule and the card
 * instead, which keeps the palette monochrome and the measure readable.
 */
export function DecisionBlock({ decision, index }: { decision: Decision; index: number }) {
  const { ref, isVisible } = useReveal<HTMLElement>();

  return (
    <article
      ref={ref}
      className={`bg-background border border-foreground/10 border-l-2 border-l-foreground px-6 py-8 lg:px-10 lg:py-10 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-muted-foreground mb-4">
        <span>Decision</span>
        <span className="w-6 h-px bg-foreground/30" />
        <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
      </div>

      <h3 className="font-display text-2xl lg:text-3xl tracking-tight mb-6 leading-tight">
        {decision.title}
      </h3>

      <div className="space-y-5 text-lg leading-relaxed text-foreground/70">
        {decision.paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}

export function DecisionList({ decisions }: { decisions: Decision[] }) {
  return (
    <div className="space-y-6 lg:space-y-8">
      {decisions.map((decision, index) => (
        <DecisionBlock key={decision.title} decision={decision} index={index} />
      ))}
    </div>
  );
}

"use client";

import { portfolioIndex } from "@/lib/projects";
import { useReveal } from "./reveal";
import { MEASURE } from "./project-section";

export function PortfolioHero() {
  const { ref, isVisible } = useReveal<HTMLElement>(0);

  return (
    <section ref={ref} className="relative pt-32 lg:pt-40 pb-16 lg:pb-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            {portfolioIndex.eyebrow}
          </span>

          <h1 className="font-display tracking-tight text-5xl sm:text-6xl lg:text-8xl leading-[0.95]">
            {portfolioIndex.heading}
            <br />
            <span className="text-muted-foreground">{portfolioIndex.headingDimmed}</span>
          </h1>
        </div>

        <p
          className={`${MEASURE} mt-10 lg:mt-12 text-lg lg:text-xl leading-relaxed text-foreground/70 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          {portfolioIndex.intro}
        </p>
      </div>
    </section>
  );
}

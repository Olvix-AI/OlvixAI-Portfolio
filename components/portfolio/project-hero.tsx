"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useReveal } from "./reveal";
import { MEASURE } from "./project-section";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function ProjectHero({
  number,
  name,
  eyebrow,
  oneLiner,
}: {
  number: string;
  name: string;
  eyebrow: string;
  oneLiner: string;
}) {
  const { ref, isVisible } = useReveal<HTMLElement>(0);

  return (
    <section ref={ref} className="relative pt-32 lg:pt-40 pb-16 lg:pb-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <Link
          href="/portfolio"
          className={`inline-flex items-center gap-2 min-h-11 -ml-1 px-1 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors duration-300 group ${FOCUS_RING}`}
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          All work
        </Link>

        <div
          className={`mt-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            {number}
            <span className="text-foreground/30">/</span>
            {eyebrow}
          </span>

          <h1 className="font-display tracking-tight text-6xl sm:text-7xl lg:text-[8rem] leading-[0.95]">
            {name}
          </h1>

          <p
            className={`${MEASURE} mt-8 lg:mt-10 text-xl lg:text-2xl leading-relaxed text-muted-foreground transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            {oneLiner}
          </p>
        </div>
      </div>
    </section>
  );
}

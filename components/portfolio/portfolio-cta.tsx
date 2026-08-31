"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolioIndex } from "@/lib/projects";
import { useReveal } from "./reveal";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/**
 * Closing CTA for the index. Mirrors the landing page's `cta-section.tsx` shell —
 * a hairline box with cut corners — without its mouse-tracking spotlight, which would
 * be a second source of state on a page that is otherwise all links.
 */
export function PortfolioCta() {
  const { ref, isVisible } = useReveal<HTMLElement>(0.2);
  const { cta } = portfolioIndex;

  return (
    <section ref={ref} className="relative py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`relative border border-foreground transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative z-10 px-6 sm:px-8 lg:px-16 py-16 lg:py-24">
            <h2 className="text-4xl lg:text-7xl font-display tracking-tight mb-8 leading-[0.95]">
              {cta.heading}
              <br />
              <span className="text-muted-foreground">{cta.headingDimmed}</span>
            </h2>

            <p className="text-lg lg:text-xl text-muted-foreground mb-12 leading-relaxed max-w-xl">
              {cta.body}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-4">
              <Button
                asChild
                size="lg"
                className={`bg-foreground hover:bg-foreground/90 text-background px-8 h-14 text-base rounded-full group ${FOCUS_RING}`}
              >
                <Link href={cta.primary.href}>
                  {cta.primary.label}
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className={`h-14 px-8 text-base rounded-full border-foreground/20 hover:bg-foreground/5 ${FOCUS_RING}`}
              >
                <Link href={cta.secondary.href}>{cta.secondary.label}</Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-8 font-mono">{cta.finePrint}</p>
          </div>

          {/* Decorative corners, matching cta-section.tsx */}
          <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-foreground/10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-t border-r border-foreground/10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

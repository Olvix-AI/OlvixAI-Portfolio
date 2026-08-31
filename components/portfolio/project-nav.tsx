"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { useReveal } from "./reveal";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/**
 * Prev/next between projects, then one quiet line to /contact. Someone who has just
 * read two thousand words does not need a full CTA block; they need a link.
 */
export function ProjectNav({ prev, next }: { prev: Project; next: Project }) {
  const { ref, isVisible } = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <nav aria-label="Other case studies" className="grid sm:grid-cols-2 gap-px bg-foreground/10">
          <Link
            href={`/portfolio/${prev.slug}`}
            className={`group bg-background px-6 py-10 lg:px-10 lg:py-14 hover:bg-foreground/[0.03] transition-all duration-500 ${FOCUS_RING} ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-muted-foreground mb-4">
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
              Previous
            </span>
            <span className="block font-display text-3xl lg:text-4xl tracking-tight">
              {prev.name}
            </span>
            <span className="block mt-2 text-sm font-mono text-muted-foreground">
              {prev.eyebrow}
            </span>
          </Link>

          <Link
            href={`/portfolio/${next.slug}`}
            className={`group bg-background px-6 py-10 lg:px-10 lg:py-14 sm:text-right hover:bg-foreground/[0.03] transition-all duration-500 ${FOCUS_RING} ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-muted-foreground mb-4">
              Next
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <span className="block font-display text-3xl lg:text-4xl tracking-tight">
              {next.name}
            </span>
            <span className="block mt-2 text-sm font-mono text-muted-foreground">
              {next.eyebrow}
            </span>
          </Link>
        </nav>

        <p className="flex flex-wrap items-center gap-x-3 gap-y-2 py-12 lg:py-16 text-lg text-muted-foreground">
          Building something like this?
          <Link
            href="/contact"
            className={`group inline-flex items-center gap-2 min-h-11 text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground transition-colors duration-300 ${FOCUS_RING}`}
          >
            Get a quote
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </p>
      </div>
    </section>
  );
}

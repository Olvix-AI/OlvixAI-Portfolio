"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { useReveal } from "./reveal";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/**
 * One row of the index. The whole card is the link — a target measured in hundreds of
 * pixels rather than the 44 the guidelines ask for — so nothing is nested inside it.
 *
 * The first tag is always the project's true type (contract engagement, production
 * feature, in-house build). It leads the tag row for that reason.
 */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, isVisible } = useReveal<HTMLLIElement>();

  return (
    <li ref={ref} className="border-b border-foreground/10 first:border-t">
      <Link
        href={`/portfolio/${project.slug}`}
        aria-label={`View the ${project.name} case study`}
        className={`group block px-1 -mx-1 py-12 lg:py-16 hover:bg-foreground/[0.02] transition-all duration-700 ${FOCUS_RING} ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12">
          <div className="lg:col-span-1 font-mono text-sm text-muted-foreground tabular-nums">
            {project.number}
          </div>

          <div className="lg:col-span-6">
            <h2 className="font-display text-4xl lg:text-6xl tracking-tight leading-[1] mb-5">
              {project.name}
            </h2>

            <ul className="flex flex-wrap gap-2 mb-6">
              {project.card.tags.map((tag) => (
                <li
                  key={tag}
                  className="px-3 py-1.5 border border-foreground/15 rounded-full text-xs font-mono text-muted-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <p className="max-w-[560px] text-base lg:text-lg leading-relaxed text-foreground/70">
              {project.card.pitch}
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-8 lg:items-end lg:justify-between lg:text-right">
            <div>
              <div className="font-display text-2xl lg:text-3xl tracking-tight leading-tight">
                {project.card.metric}
              </div>
              <div className="mt-2 text-sm font-mono text-muted-foreground">
                {project.card.detail}
              </div>
            </div>

            <span className="inline-flex items-center gap-2 text-sm font-mono text-foreground">
              View case study
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}

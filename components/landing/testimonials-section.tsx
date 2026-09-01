"use client";

// Section 5 — "Selected work": a rotating teaser for /portfolio (was: testimonials).

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProjectTeaserItem } from "@/lib/projects";

const buildsWith = [
  "Voice AI",
  "AI agents",
  "Computer vision",
  "RAG",
  "React Native",
  "Microservices",
  "MCP tool servers",
  "LangGraph",
  "DevOps",
  "Browser extensions",
];

export function TestimonialsSection({ projects }: { projects: ProjectTeaserItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Rotation pauses while focus is inside the section. The inactive entries are `inert`,
  // so advancing under a focused project link would tear focus out to <body>.
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % projects.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      id="work"
      className="relative py-32 lg:py-40 border-t border-foreground/10 lg:pb-14"
      onFocus={() => setIsPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setIsPaused(false);
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Selected work
          </span>
          <div className="flex-1 h-px bg-foreground/10" />
          <span className="font-mono text-xs text-muted-foreground">
            {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        {/* Main Quote */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-8 grid">
            {/* All four entries occupy the same grid cell, so this column is always as
                tall as the tallest quote at the current width and its height never
                changes as they rotate. Inactive entries are inert, not just invisible. */}
            {projects.map((project, idx) => {
              const isActive = idx === activeIndex;
              const isShown = isActive && !isAnimating;

              return (
                <div
                  key={project.slug}
                  className={`col-start-1 row-start-1 ${isActive ? "" : "pointer-events-none"}`}
                  aria-hidden={!isActive}
                  inert={!isActive}
                >
                  <blockquote
                    className={`transition-all duration-300 ${
                      isShown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  >
                    <p className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-foreground">
                      {project.teaser.pitch}
                    </p>
                  </blockquote>

                  {/* Author */}
                  <div
                    className={`mt-12 transition-all duration-300 delay-100 ${
                      isShown ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="group inline-flex items-center gap-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <span className="w-16 h-16 shrink-0 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center group-hover:bg-foreground/10 transition-colors duration-300">
                        <span className="font-display text-2xl text-foreground">
                          {project.name.charAt(0)}
                        </span>
                      </span>
                      <span className="block">
                        <span className="flex items-center gap-2 text-lg font-medium text-foreground">
                          {project.name}
                          <ArrowRight className="w-4 h-4 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                        </span>
                        <span className="block text-muted-foreground">
                          {project.teaser.engagement}, {project.teaser.domain}
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Metric Highlight */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            {/* Same grid-stack: the card is sized by the longest metric, not the active one. */}
            <div className="grid">
              {projects.map((project, idx) => {
                const isActive = idx === activeIndex;
                const isShown = isActive && !isAnimating;

                return (
                  <div
                    key={project.slug}
                    aria-hidden={!isActive}
                    inert={!isActive}
                    className={`col-start-1 row-start-1 p-8 border border-foreground/10 transition-all duration-300 ${
                      isShown ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                  >
                    <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-4">
                      Key Result
                    </span>
                    <p className="font-display text-3xl md:text-4xl text-foreground">
                      {project.teaser.metric}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Navigation Dots + all-work link */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-8">
              <div className="flex gap-2">
                {projects.map((project, idx) => (
                  <button
                    key={project.slug}
                    type="button"
                    aria-label={`Show ${project.name}`}
                    onClick={() => {
                      setIsAnimating(true);
                      setTimeout(() => {
                        setActiveIndex(idx);
                        setIsAnimating(false);
                      }, 300);
                    }}
                    className={`h-2 transition-all duration-300 ${
                      idx === activeIndex
                        ? "w-8 bg-foreground"
                        : "w-2 bg-foreground/20 hover:bg-foreground/40"
                    }`}
                  />
                ))}
              </div>

              <Link
                href="/portfolio"
                className="group inline-flex min-h-11 items-center gap-2 font-mono text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                View all work
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Capability Marquee Label */}
        <div className="mt-24 pt-12 border-t border-foreground/10">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-8 text-center">
            What we build with
          </p>
        </div>
      </div>

      {/* Full-width marquee outside container */}
      <div className="w-full">
        <div className="flex gap-16 items-center marquee">
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} className="flex gap-16 items-center shrink-0">
              {buildsWith.map((capability) => (
                <span
                  key={`${setIdx}-${capability}`}
                  className="font-display text-xl md:text-2xl text-foreground/30 whitespace-nowrap hover:text-foreground transition-colors duration-300"
                >
                  {capability}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

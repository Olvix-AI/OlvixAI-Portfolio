"use client";

import { useReveal } from "./reveal";

/** Shared reading measure. Long-form prose at the full 1400px container is unreadable. */
export const MEASURE = "max-w-[720px]";

/**
 * One numbered section of a case study: a mono eyebrow carrying the step number, a
 * serif heading, then the content — all inside the narrow reading measure, itself
 * inside the site's standard 1400px container.
 */
export function ProjectSection({
  id,
  step,
  heading,
  children,
  tinted = false,
  wide = false,
}: {
  id: string;
  /** Zero-padded step, e.g. "03". Rendered in the eyebrow. */
  step: string;
  heading: string;
  children: React.ReactNode;
  /** Faint wash + rules, used to set the Decisions section apart. */
  tinted?: boolean;
  /** Drop the 720px measure — for content that is a grid rather than prose. */
  wide?: boolean;
}) {
  const { ref, isVisible } = useReveal<HTMLElement>();

  return (
    <section
      id={id}
      ref={ref}
      className={`relative py-24 lg:py-32 ${
        tinted ? "bg-foreground/[0.02] border-y border-foreground/10" : ""
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={wide ? "" : MEASURE}>
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              {step}
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-10 lg:mb-14">
              {heading}
            </h2>
          </div>
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "120ms" }}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Body copy. One `<p>` per string, at the reading measure the parent sets. */
export function Prose({ paragraphs, muted = true }: { paragraphs: string[]; muted?: boolean }) {
  return (
    <div className={`space-y-6 text-lg leading-relaxed ${muted ? "text-foreground/70" : ""}`}>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}

"use client";

// What clients say — real testimonials section (Homepage-Copy.md, new).
//
// NOT the same thing as `testimonials-section.tsx`, which despite its filename is the
// "Selected work" teaser for /portfolio. This is the actual client-quote section.
//
// ─────────────────────────────────────────────────────────────────────────────────
//  THE QUOTES BELOW ARE PLACEHOLDERS. THEY ARE NOT REAL AND MUST NOT SHIP.
//
//  While `IS_PLACEHOLDER` is true this section renders in `npm run dev` only and is
//  omitted from every production build, so it cannot reach the live site by accident.
//  That guard exists because fabricated social proof is the one mistake on a site like
//  this that cannot be walked back, and because the Ownership section three blocks
//  further down promises nothing appears in the portfolio without written sign-off.
//
//  To go live:
//    1. Replace every entry in `quotes` with a real, verbatim quote.
//    2. Fill in the real name, role and company — no bracketed placeholders left.
//    3. Get written sign-off from each person for that exact wording.
//    4. Set IS_PLACEHOLDER to false.
//    5. Add <ClientQuotesSection /> back if it was removed from app/page.tsx.
// ─────────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from "react";

const IS_PLACEHOLDER = true;

// `process.env.NODE_ENV` is inlined by the bundler, so this is a build-time constant —
// the production build drops the section entirely rather than deciding at runtime.
const HIDDEN_IN_PRODUCTION =
  IS_PLACEHOLDER && process.env.NODE_ENV === "production";

/**
 * Quote text is written to a realistic length so the layout is honest to design
 * against. Attribution is deliberately bracketed so no one can mistake a placeholder
 * for a real customer. Note that none of these invent a metric — if a real quote comes
 * back with a number in it, that number needs to be checkable like every other figure
 * on this site.
 */
const quotes = [
  {
    quote:
      "They shipped the thing we had been describing to agencies for a year. The difference was that they also ran it after launch — we never had to go and find somebody else for the infrastructure.",
    author: "[Client name]",
    role: "[Role]",
    company: "[Company]",
    project: "PowerUp",
  },
  {
    quote:
      "We had a prototype that impressed everyone in the room and fell over the moment real users touched it. They rebuilt it properly, and it has been quiet ever since.",
    author: "[Client name]",
    role: "[Role]",
    company: "[Company]",
    project: "Trading Operations",
  },
  {
    quote:
      "Weekly demos against a real environment, and commit access from the first day. There was never a point where we did not know exactly what we were paying for.",
    author: "[Client name]",
    role: "[Role]",
    company: "[Company]",
    project: "PowerUp",
  },
];

export function ClientQuotesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Hooks run unconditionally; the early return below sits after them so the rules of
  // hooks hold even though the condition is a build-time constant.
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  if (HIDDEN_IN_PRODUCTION) return null;

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`max-w-2xl mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            What clients say
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight">
            In their words.
            <br />
            <span className="text-muted-foreground">Not ours.</span>
          </h2>
        </div>

        {IS_PLACEHOLDER && (
          <div className="mb-12 border border-dashed border-foreground/30 bg-foreground/[0.03] px-6 py-4">
            <p className="font-mono text-xs leading-relaxed text-foreground/70">
              PLACEHOLDER CONTENT — VISIBLE IN DEV ONLY
              <br />
              <span className="text-muted-foreground">
                These quotes are invented and the attributions are not real people. This
                section is omitted from production builds. Replace the `quotes` array in{" "}
                client-quotes-section.tsx with signed-off quotes, then set
                IS_PLACEHOLDER to false.
              </span>
            </p>
          </div>
        )}

        {/* Quotes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quotes.map((item, index) => (
            <figure
              key={index}
              className={`flex flex-col border border-foreground/10 p-8 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <blockquote className="flex-1">
                <p className="text-lg leading-relaxed text-foreground/80">
                  {item.quote}
                </p>
              </blockquote>

              <figcaption className="mt-8 pt-6 border-t border-foreground/10">
                <div className="font-medium">{item.author}</div>
                <div className="text-sm text-muted-foreground">
                  {item.role}, {item.company}
                </div>
                <div className="mt-3 font-mono text-xs text-muted-foreground">
                  {item.project}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

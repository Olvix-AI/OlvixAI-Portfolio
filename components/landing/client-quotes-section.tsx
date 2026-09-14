"use client";

// What clients say — the real client-quote section (Homepage-Copy.md).
//
// NOT the same thing as `testimonials-section.tsx`, which despite its filename is the
// "Selected work" teaser for /portfolio.
//
// These are REAL and verifiable, transcribed verbatim from docs/testimonials.md — they
// are freelance-platform reviews of Muhammad Nabeel's work, published with the reviewer
// handle rather than an invented name and company. That is the honest presentation: the
// handles are what the reviewers actually chose to be known by, and anyone can check
// them on the platform. Do not "improve" a handle into a plausible full name.
//
// Two rules for anything added here:
//   1. Verbatim only, and only with the reviewer's sign-off if it is not already public.
//   2. No invented metrics. Every number on this site has to be checkable.

import { useEffect, useRef, useState } from "react";

const quotes = [
  {
    quote:
      "He is so polite and understands the content and very professional.",
    author: "walaa17",
    source: "5.0 / 5",
    project:
      "A RAG system that drafts RFP documents to Saudi regulations, and checks existing RFPs for compliance gaps.",
  },
  {
    quote: "Nice working with him",
    author: "neotastisch_2",
    source: "4.3 / 5",
    project:
      "Fine-tuning an OpenAI model in Python, with a pipeline that converts WhatsApp chat exports into a trainable format.",
  },
];

export function ClientQuotesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

        {/* Two cards, so a two-column grid rather than three — a third empty column
            reads as a missing testimonial. Capped so the pair doesn't stretch to 1400px. */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {quotes.map((item, index) => (
            <figure
              key={item.author}
              className={`flex flex-col border border-foreground/10 p-8 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <blockquote className="flex-1">
                <p className="text-xl lg:text-2xl leading-relaxed text-foreground/80">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </blockquote>

              <figcaption className="mt-8 pt-6 border-t border-foreground/10">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-medium">{item.author}</span>
                  <span className="font-mono text-xs text-muted-foreground shrink-0">
                    {item.source}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {item.project}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

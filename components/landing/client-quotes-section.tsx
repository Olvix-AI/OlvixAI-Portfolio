"use client";

// What clients say — the real client-quote section (Homepage-Copy.md).
//
// NOT the same thing as `testimonials-section.tsx`, which despite its filename is the
// "Selected work" teaser for /portfolio.
//
// All four are REAL and verifiable. Each card names its source — a LinkedIn
// recommendation, an Upwork review, two freelance-platform reviews — so a reader can go
// and check it. `docs/testimonials.md` holds the unedited originals.
//
// SQUARE BRACKETS MARK SUBSTITUTED WORDS. Two reviewers named the individual engineer
// they worked with; the site credits the studio instead, so those words are bracketed —
// "[Olvix]", "[them]" — which is the standard convention for altering a quotation.
// This is not decoration. Mesut's recommendation is public on LinkedIn and Kostas's is
// public on Upwork, so anyone can compare; the brackets are what keep an edited quote
// honest rather than fabricated. If you change a quoted word, bracket it.
//
// Where a reviewer is known only by a platform handle, the handle is what ships. It is
// what they chose to be known by and what someone verifying the review would search for.
// Don't "improve" a handle into a plausible full name, and don't invent a job title to
// fill an empty `role`.
//
// Two rules for anything added here:
//   1. Verbatim apart from bracketed substitutions, and only with the reviewer's
//      sign-off if it is not already public.
//   2. No invented metrics. Every number on this site has to be checkable.

import { useEffect, useRef, useState } from "react";

// Ordered strongest first: a named CEO at a named company outranks a platform handle,
// and a specific quote outranks a one-liner. `role` is omitted where the reviewer is
// only known by a handle — don't invent a title to fill the gap.
const quotes = [
  {
    quote:
      "[Olvix] did a great job helping us to collect relevant data for our AI Solution. [They have] good hands on data research and data entry.",
    author: "Mesut Yilmaz",
    role: "Founder & CEO, STIA Systems GmbH",
    source: "LinkedIn · Nov 2025",
    project: "Data research and collection for an AI solution.",
  },
  {
    quote:
      "Working with [Olvix] was a great experience — reliable, skilled, and easy to communicate with. I highly recommend [them] for any mobile app or React Native development needs.",
    author: "Kostas L.",
    source: "Upwork · Verified · Aug 2025",
    project: "Mobile app development in React Native.",
  },
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

        {/* Four cards in a 2x2. Deliberately not three columns: four across a 1400px
            container leaves each quote too narrow to read, and a 3+1 layout strands one
            card on its own row. */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
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
                {"role" in item && item.role ? (
                  <div className="mt-1 text-sm text-muted-foreground">{item.role}</div>
                ) : null}
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

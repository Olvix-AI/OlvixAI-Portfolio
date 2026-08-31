"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { AnimatedWave } from "@/components/landing/animated-wave";
import { ContactForm } from "@/components/contact/contact-form";

/* ==========================================================================
 * Copy — verbatim from docs/Contact-Copy.md
 * ========================================================================== */

const SUB_COPY =
  "The more you put in the box, the more useful our first reply is. A paragraph is plenty — we'd rather read what you're actually trying to do than a filled-in brief template.";

const NEXT_STEPS = [
  {
    number: "01",
    title: "You send this",
    description:
      "We read it ourselves. No sales team, no qualification call with someone who can't answer technical questions.",
  },
  {
    number: "02",
    title: "We reply within two working days",
    description:
      "Either with questions, or with a straight answer that we're not the right team for it. You'll know quickly either way.",
  },
  {
    number: "03",
    title: "A 30-minute call, then a written scope",
    description:
      "Free, no pitch deck. You come out of it with what we'd build, what it costs, and what we think is risky — in writing, and yours to keep.",
  },
];

// TODO(open-item-4): drop the Calendly / Cal.com URL in here and the "Book a
// call" row renders itself. Left null so the page never ships a dead link.
const BOOK_A_CALL_URL: string | null = null;

// TODO(open-item-5): confirm the LinkedIn company slug.
const CONTACT_METHODS: { label: string; value: string; href: string }[] = [
  { label: "Email", value: "hello@olvix.io", href: "mailto:hello@olvix.io" },
  {
    label: "LinkedIn",
    value: "/company/olvix",
    href: "https://www.linkedin.com/company/olvix",
  },
  ...(BOOK_A_CALL_URL
    ? [{ label: "Book a call", value: BOOK_A_CALL_URL, href: BOOK_A_CALL_URL }]
    : []),
];

const REASSURANCE_CHIPS = [
  "NDA on request",
  "You own everything we build",
  "No sales team",
  "Reply in 2 working days",
];

/* ==========================================================================
 * Section
 * ========================================================================== */

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* ---------------------------------------------------------------
           * Left — the reassurance column, sticky beside the form on lg
           * ------------------------------------------------------------- */}
          <div className="relative lg:sticky lg:top-32 self-start">
            {/* Already written, already used in the footer — fills the space
                without inventing a new visual. */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-64 opacity-15 pointer-events-none overflow-hidden"
            >
              <AnimatedWave />
            </div>

            <div className="relative z-10">
            <div
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
                <span className="w-8 h-px bg-foreground/30" />
                Contact
              </span>

              <h1 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
                Tell us what
                <br />
                <span className="text-muted-foreground">
                  you&apos;re building.
                </span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                {SUB_COPY}
              </p>
            </div>

            {/* What happens next */}
            <div
              className={`mt-16 transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <h2 className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-8">
                <span className="w-8 h-px bg-foreground/30" />
                What happens next
              </h2>

              <ol className="space-y-0">
                {NEXT_STEPS.map((step, index) => (
                  <li
                    key={step.number}
                    className={`flex items-start gap-6 py-6 border-t border-foreground/10 transition-all duration-500 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    } ${index === NEXT_STEPS.length - 1 ? "border-b" : ""}`}
                    style={{ transitionDelay: `${index * 100 + 150}ms` }}
                  >
                    <span
                      aria-hidden="true"
                      className="font-mono text-sm text-muted-foreground pt-1 shrink-0 tabular-nums"
                    >
                      {step.number}
                    </span>
                    <div>
                      <h3 className="text-lg mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Other ways to reach us */}
            <div
              className={`mt-16 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <h2 className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-8">
                <span className="w-8 h-px bg-foreground/30" />
                Other ways to reach us
              </h2>

              <dl className="space-y-4">
                {CONTACT_METHODS.map((method) => (
                  <div
                    key={method.label}
                    className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6"
                  >
                    <dt className="text-xs font-mono uppercase tracking-widest text-muted-foreground sm:w-32 shrink-0">
                      {method.label}
                    </dt>
                    <dd>
                      <a
                        href={method.href}
                        className="inline-flex items-center gap-1 group underline underline-offset-4 decoration-foreground/20 hover:decoration-foreground transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        {method.value}
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Reassurance chips */}
            <ul
              className={`mt-16 flex flex-wrap gap-3 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {REASSURANCE_CHIPS.map((chip) => (
                <li
                  key={chip}
                  className="px-4 py-2 border border-foreground/10 text-sm font-mono text-muted-foreground"
                >
                  {chip}
                </li>
              ))}
            </ul>
            </div>
          </div>

          {/* ---------------------------------------------------------------
           * Right — the form
           * ------------------------------------------------------------- */}
          <div
            className={`transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

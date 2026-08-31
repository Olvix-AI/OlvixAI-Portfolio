"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ==========================================================================
 * Copy — the price, timeline and ownership answers, verbatim from
 * docs/Homepage-Copy.md §10. Keep these in sync with faq-section.tsx.
 * ========================================================================== */

const FAQ_ITEMS = [
  {
    id: "item-1",
    question: "How much does this cost?",
    answer:
      "There's no rate card, because there's no standard project. What we do have is a consistent shape: a short paid discovery, then a fixed price for the build, then monthly if you want us to stay. You'll have a real number after one call and a written scope — not a range that moves once we start. Tell us what you're building and roughly what you've set aside, and we'll tell you straight away whether it's the right fit.",
  },
  {
    id: "item-2",
    question: "How long does it take?",
    answer:
      "Most first launches land between two and four months. For scale: PowerUp was about eight months for a full web rebuild plus a native app on both stores; HRXpert was eight months for a microservices platform with real-time voice AI. Adding AI features into a product that already exists is usually weeks, not months. The discovery gives you a date, not an estimate.",
  },
  {
    id: "item-3",
    question: "Do we own the code?",
    answer:
      "Yes. All of it, including the AI work, the prompts, the infrastructure definitions and any model we train for you. Your repository and your cloud accounts from day one.",
  },
];

/* ==========================================================================
 * Section
 * ========================================================================== */

export function ContactFaq() {
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
      ref={sectionRef}
      className="py-24 lg:py-32 border-t border-foreground/10 bg-foreground/[0.02]"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`max-w-3xl transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-10">
            <span className="w-8 h-px bg-foreground/30" />
            Questions
          </h2>

          <Accordion
            type="single"
            collapsible
            defaultValue="item-1"
            className="border-t border-foreground/10"
          >
            {FAQ_ITEMS.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-b border-foreground/10"
              >
                <AccordionTrigger className="py-6 text-left text-lg font-normal rounded-none hover:no-underline hover:text-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-8 pr-8 text-base text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <a
            href="/#faq"
            className="mt-10 inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors group rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            More questions
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

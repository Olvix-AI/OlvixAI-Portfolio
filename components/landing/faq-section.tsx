"use client";

import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How much does this cost?",
    answer:
      "There's no rate card, because there's no standard project. What we do have is a consistent shape: a short paid discovery, then a fixed price for the build, then monthly if you want us to stay. You'll have a real number after one call and a written scope — not a range that moves once we start. Tell us what you're building and roughly what you've set aside, and we'll tell you straight away whether it's the right fit.",
  },
  {
    question: "How long does it take?",
    answer:
      "Most first launches land between two and four months. For scale: PowerUp was about eight months for a full web rebuild plus a native app on both stores; HRXpert was eight months for a microservices platform with real-time voice AI. Adding AI features into a product that already exists is usually weeks, not months. The discovery gives you a date, not an estimate.",
  },
  {
    question: "Do we own the code?",
    answer:
      "Yes. All of it, including the AI work, the prompts, the infrastructure definitions and any model we train for you. Your repository and your cloud accounts from day one.",
  },
  {
    question: "Can you work with our existing team and codebase?",
    answer:
      "That's half of what we do. On PowerUp the client's own developer owned the backend API — we owned the web front end, the mobile app, the vision model and DevOps, and specified the backend changes we needed rather than taking it over. Clean boundaries are what made two engineers enough to ship all of that in eight months.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Thirty days of support is included in every build. After that, a monthly retainer if you want us on call, or nothing at all — we hand over the keys and documentation either way, and the product runs without us. A handover you can't act on isn't a handover.",
  },
  {
    question: "Which AI models do you use?",
    answer:
      "Whichever fits the task and the budget. We've shipped on Anthropic Claude, OpenAI, Azure OpenAI and Gemini, and we pick per call rather than per project — a cheap model for extraction and a strong one for judgement is usually the difference between a feature that's affordable and one that isn't. We also build the fallback: on the trading platform every AI call tries Anthropic, retries on Groq, then degrades to a pre-filled manual form, so the business never stops because a model is down. And where a general model is the wrong tool we train one — PowerUp's device reader is a purpose-trained vision model, not an OCR API.",
  },
  {
    question: "Do you sign NDAs?",
    answer:
      "Yes, before you describe the idea rather than after. And nothing appears in our portfolio without your written sign-off.",
  },
  {
    question: "We're not in your timezone. Does that work?",
    answer:
      "Most of our work leans US and EU. We run async by default — written updates, recorded demos, decisions in writing — with a few hours of deliberate overlap each day for the conversations that need to be live.",
  },
  {
    question: "We only need part of this. Is that a problem?",
    answer:
      "No. Some engagements are only the AI layer inside someone else's product, some are only the infrastructure work under a build somebody else did. Tell us where the gap is.",
  },
];

export function FaqSection() {
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
    <section id="faq" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-24">
          {/* Left: heading, pinned */}
          <div className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start">
            <div
              className={`transition-all duration-700 motion-reduce:transition-none ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
                <span className="w-8 h-px bg-foreground/30" />
                Questions
              </span>
              <h2 className="text-4xl lg:text-6xl font-display tracking-tight">
                The things
                <br />
                <span className="text-muted-foreground">everyone asks.</span>
              </h2>
            </div>
          </div>

          {/* Right: accordion */}
          <div className="lg:col-span-3">
            <Accordion
              type="single"
              collapsible
              defaultValue="item-1"
              className="border-t border-foreground/10 motion-reduce:[&_[data-slot=accordion-content]]:animate-none"
            >
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${index + 1}`}
                  className={`border-foreground/10 last:border-b transition-[opacity,transform] duration-700 motion-reduce:transition-none ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <AccordionTrigger className="items-center gap-6 py-6 text-base lg:text-lg font-medium text-foreground rounded-none hover:no-underline hover:text-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background [&>svg]:size-5 [&>svg]:translate-y-0 [&>svg]:text-foreground/50">
                    <span className="flex items-start gap-4 lg:gap-6 pr-4 text-left">
                      <span className="font-mono text-xs text-muted-foreground pt-1.5 shrink-0">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-snug">{faq.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 pl-9 lg:pl-12 pr-4 text-base leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

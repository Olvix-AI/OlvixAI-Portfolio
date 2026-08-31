"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    number: "01",
    title: "New builds",
    for: "Founders and funded startups with an AI product to build",
    visual: "deploy",
    lead: "You have an idea for an AI-powered product — an app, a tool, a platform. We take it from idea to a working product to a live, production-ready launch. One team for the whole distance, so there's no week three where design is done and nobody can build it.",
    includes: [
      "Product design and UI/UX",
      "Frontend — web and mobile",
      "Backend, and the AI and agent logic itself",
      "Production setup — hosting, infrastructure, monitoring, security",
    ],
    outcome: "Idea → working product → live.",
    cta: "Get a quote",
    href: "/contact",
  },
  {
    number: "02",
    title: "AI into what you already have",
    for: "SaaS and software companies with a product and no AI in it — or a weak first attempt",
    visual: "ai",
    lead: "You already have a working website, app or SaaS. We add the AI into it — chatbots, agents, automation, the smart features your roadmap has been carrying for a year — built into the product you've got, not on top of a rebuild of it.",
    includes: [
      "AI agents and assistants inside your existing product",
      "Chat and voice interfaces",
      "Automation of the workflows your team does by hand",
      "Model selection, prompting and evaluation — and the cost work that keeps it affordable",
    ],
    outcome: "Shipped inside what you already run.",
    cta: "Talk to us",
    href: "/contact",
  },
];

const closingLine =
  "We work with funded startups building an AI product, and with software companies adding AI to one that already earns money. Local and international — most of our work leans US and EU.";

/**
 * Mount-gated so the server and the client's first render always agree
 * (see CLAUDE.md — nothing nondeterministic may render during SSR).
 */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

// Copied from features-section.tsx on purpose: the two sections share a visual
// language and features-section.tsx is owned elsewhere.
function DeployVisual({ animated }: { animated: boolean }) {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full" role="presentation" aria-hidden="true">
      <defs>
        <clipPath id="servicesDeployClip">
          <rect x="30" y="20" width="140" height="120" rx="4" />
        </clipPath>
      </defs>

      {/* Container */}
      <rect x="30" y="20" width="140" height="120" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />

      {/* Bars */}
      <g clipPath="url(#servicesDeployClip)">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect
            key={i}
            x="40"
            y={35 + i * 16}
            width={animated ? "120" : String(40 + i * 16)}
            height="10"
            rx="2"
            fill="currentColor"
            opacity="0.15"
          >
            {animated && (
              <>
                <animate
                  attributeName="opacity"
                  values="0.15;0.8;0.15"
                  dur="2s"
                  begin={`${i * 0.15}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="width"
                  values="20;120;20"
                  dur="2s"
                  begin={`${i * 0.15}s`}
                  repeatCount="indefinite"
                />
              </>
            )}
          </rect>
        ))}
      </g>

      {/* Progress indicator */}
      <circle cx="100" cy="155" r="3" fill="currentColor" opacity="0.3">
        {animated && (
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />
        )}
      </circle>
    </svg>
  );
}

// Precomputed and rounded on purpose. Math.sin/cos aren't required by the spec to be
// correctly rounded, so Node and the browser can disagree in the last ULP and React
// reports that as a hydration mismatch. 3dp is well clear of the divergence.
const AI_ORBIT_NODES = [0, 1, 2, 3, 4, 5].map((i) => {
  const angle = i * 60 * (Math.PI / 180);
  const radius = 50;
  return {
    x: Number((100 + Math.cos(angle) * radius).toFixed(3)),
    y: Number((80 + Math.sin(angle) * radius).toFixed(3)),
  };
});

function AIVisual({ animated }: { animated: boolean }) {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full" role="presentation" aria-hidden="true">
      {/* Central node */}
      <circle cx="100" cy="80" r="12" fill="currentColor">
        {animated && <animate attributeName="r" values="12;14;12" dur="2s" repeatCount="indefinite" />}
      </circle>

      {/* Orbiting nodes */}
      {AI_ORBIT_NODES.map((node, i) => (
        <g key={i}>
          {/* Connection line */}
          <line x1="100" y1="80" x2={node.x} y2={node.y} stroke="currentColor" strokeWidth="1" opacity="0.3">
            {animated && (
              <animate
                attributeName="opacity"
                values="0.3;0.8;0.3"
                dur="2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            )}
          </line>

          {/* Outer node */}
          <circle cx={node.x} cy={node.y} r="6" fill="none" stroke="currentColor" strokeWidth="2">
            {animated && (
              <animate
                attributeName="r"
                values="6;8;6"
                dur="2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            )}
          </circle>
        </g>
      ))}

      {/* Pulse ring */}
      {animated && (
        <circle cx="100" cy="80" r="30" fill="none" stroke="currentColor" strokeWidth="1" opacity="0">
          <animate attributeName="r" values="20;60" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0" dur="2s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  );
}

function ServiceVisual({ type, animated }: { type: string; animated: boolean }) {
  switch (type) {
    case "ai":
      return <AIVisual animated={animated} />;
    case "deploy":
    default:
      return <DeployVisual animated={animated} />;
  }
}

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group h-full transition-all duration-700 motion-reduce:transition-none ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <article className="flex h-full flex-col border border-foreground/10 hover:border-foreground/20 transition-colors duration-500 p-8 lg:p-10">
        {/* Number + visual */}
        <div className="flex items-start justify-between gap-6 mb-8">
          <span className="font-mono text-sm text-muted-foreground">{service.number}</span>
          <div className="w-24 h-20 lg:w-28 lg:h-24 shrink-0 text-foreground">
            <ServiceVisual type={service.visual} animated={!reducedMotion} />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-3xl lg:text-4xl tracking-tight mb-4 group-hover:translate-x-1 transition-transform duration-500 motion-reduce:transition-none">
          {service.title}
        </h3>

        {/* Who it's for */}
        <p className="font-mono text-xs sm:text-sm leading-relaxed text-foreground/70 border-l border-foreground/15 pl-4 mb-8">
          <span className="text-muted-foreground">for: </span>
          {service.for}
        </p>

        {/* Lead */}
        <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-10">{service.lead}</p>

        {/* Includes */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground mb-5">
            <span className="w-4 h-px bg-foreground/30" />
            includes
          </span>
          <ul className="space-y-3">
            {service.includes.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="w-4 h-4 mt-0.5 shrink-0 text-foreground/60" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Outcome + CTA */}
        <div className="mt-auto pt-8 border-t border-foreground/10">
          <p className="font-mono text-sm text-foreground mb-6">{service.outcome}</p>
          <Button
            asChild
            className="group/cta h-12 px-6 text-base rounded-full bg-foreground hover:bg-foreground/90 text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Link href={service.href}>
              {service.cta}
              <ArrowRight
                className="w-4 h-4 ml-1 transition-transform group-hover/cta:translate-x-1 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
}

export function ServicesSection() {
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
    <section id="services" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            What we do
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 motion-reduce:transition-none ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Two things.
            <br />
            <span className="text-muted-foreground">Both of them all the way.</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {services.map((service, index) => (
            <ServiceCard key={service.number} service={service} index={index} />
          ))}
        </div>

        {/* Closing line */}
        <p
          className={`mt-16 lg:mt-20 max-w-3xl text-base lg:text-lg text-muted-foreground leading-relaxed transition-all duration-700 motion-reduce:transition-none ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          {closingLine}
        </p>
      </div>
    </section>
  );
}

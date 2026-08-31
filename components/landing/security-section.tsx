"use client";

// Section 9 — "What you own": ownership + demonstrable security practices.
// `practices` is NOT a compliance list. OlvixAI holds no audited certifications, and
// procurement teams verify them — only put things here we can actually demonstrate.

import { useEffect, useState, useRef } from "react";
import { FileCheck, Shield, Lock, Eye } from "lucide-react";

const securityFeatures = [
  {
    icon: FileCheck,
    title: "Your repo, your accounts",
    description:
      "Commit access from day one, infrastructure in accounts you own, and a documented handover at the end. If you stop working with us, nothing stops working.",
  },
  {
    icon: Shield,
    title: "Security is a build step",
    description:
      "OWASP ZAP against every release, RS256-signed JWTs, role-based access enforced server-side, secrets in a vault and never in the repo. HRXpert shipped with zero high- or critical-severity findings.",
  },
  {
    icon: Lock,
    title: "Under NDA from the first call",
    description:
      "We sign before you describe the idea, not after. Nothing goes in our portfolio without your written sign-off.",
  },
  {
    icon: Eye,
    title: "AI that shows its work",
    description:
      "Every model output carries its reasoning and a human keeps the override. On PowerUp, nothing the vision model reads gets saved until the user confirms it.",
  },
];

const practices = [
  "OWASP ZAP",
  "RS256 JWT",
  "RBAC",
  "Least privilege",
  "Secrets management",
  "Human in the loop",
  "NDA on request",
];

export function SecuritySection() {
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
    <section id="ownership" ref={sectionRef} className="relative py-24 lg:py-32 bg-foreground/[0.02] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Ownership &amp; security
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              You own it.
              <br />
              <span className="text-muted-foreground">All of it.</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              You&apos;re hiring a team, not renting a platform. Your repository, your cloud
              accounts, your data, your models. We&apos;re not going to wave a compliance badge
              at you either — we&apos;ll show you the auth model and the scan results from
              something we&apos;ve already shipped, and build yours to the same standard from
              the first commit.
            </p>

            {/* Practices we can demonstrate — deliberately not certifications */}
            <div className="flex flex-wrap gap-3">
              {practices.map((practice, index) => (
                <span
                  key={practice}
                  className={`px-4 py-2 border border-foreground/10 text-sm font-mono transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  {practice}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Features */}
          <div className="grid gap-6">
            {securityFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className={`p-6 border border-foreground/10 hover:border-foreground/20 transition-all duration-500 group ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center border border-foreground/10 group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1 group-hover:translate-x-1 transition-transform duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

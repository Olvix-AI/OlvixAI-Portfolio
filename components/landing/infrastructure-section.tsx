"use client";

// From demo to production — the differentiator, inverted band (Homepage-Copy.md §4)

import { useEffect, useState, useRef } from "react";

const deployments = [
  { platform: "AWS", role: "EC2 · Lambda · S3", project: "HRXpert" },
  { platform: "Azure", role: "Vision + OpenAI", project: "PowerUp" },
  { platform: "Vercel", role: "Web front ends", project: "KairosAI" },
  { platform: "Kubernetes", role: "Blue/green rollouts", project: "Decks" },
  { platform: "Supabase", role: "Managed Postgres", project: "Trading Ops" },
  { platform: "RunPod", role: "Cloud GPU training", project: "EpochsLab" },
  { platform: "GitHub Actions", role: "CI/CD on push", project: "All" },
  { platform: "App Store · Play", role: "Release pipelines", project: "PowerUp" },
];

const stats = [
  { value: "3", label: "Clouds in production" },
  { value: "2", label: "App stores shipped" },
  { value: "0", label: "Critical vulnerabilities" },
];

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeLocation, setActiveLocation] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLocation((prev) => (prev + 1) % deployments.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-foreground text-background overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-background/60 mb-6">
              <span className="w-8 h-px bg-background/30" />
              Why us
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              A demo is easy.
              <br />
              <span className="text-background/50">Production is the job.</span>
            </h2>
            <p className="text-xl text-background/60 leading-relaxed mb-6">
              Most small AI teams can build something impressive. Far fewer can make it
              reliable, secure and stable once real users show up — because that work is
              a different discipline, and it&apos;s usually somebody else&apos;s problem.
            </p>
            <p className="text-xl text-background/60 leading-relaxed mb-12">
              We do both. The AI and product work, and the DevOps and infrastructure that
              makes it hold, under one team. No handoff, no second vendor, and no gap
              where the thing that breaks lives.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-4xl lg:text-5xl font-display mb-2">{stat.value}</div>
                  <div className="text-sm text-background/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Deployment list */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="border border-background/10">
              {/* Header */}
              <div className="px-6 py-4 border-b border-background/10 flex items-center justify-between">
                <span className="text-sm font-mono text-background/60">Where we deploy</span>
                <span className="flex items-center gap-2 text-xs font-mono text-background/60">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  In production
                </span>
              </div>

              {/* Deployments */}
              <div>
                {deployments.map((deployment, index) => (
                  <div
                    key={deployment.platform}
                    className={`px-6 py-5 border-b border-background/5 last:border-b-0 flex items-center justify-between transition-all duration-300 ${
                      activeLocation === index ? "bg-background/5" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span 
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          activeLocation === index ? "bg-background" : "bg-background/20"
                        }`}
                      />
                      <div>
                        <div className="font-medium">{deployment.platform}</div>
                        <div className="text-sm text-background/60">{deployment.role}</div>
                      </div>
                    </div>
                    <span className="font-mono text-sm text-background/60">{deployment.project}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

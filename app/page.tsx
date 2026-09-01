import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { ServicesSection } from "@/components/landing/services-section";
import { InfrastructureSection } from "@/components/landing/infrastructure-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { SecuritySection } from "@/components/landing/security-section";
import { FaqSection } from "@/components/landing/faq-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";
import { projectLinks, projectTeasers } from "@/lib/projects";

// The order is a sales argument, not a feature list: what we do -> why us -> proof ->
// who we are -> how it goes -> can you do my thing -> what I keep -> what it costs ->
// talk to us. See docs/Homepage-Copy.md for the reasoning behind each section.
//
// Several components keep their original filenames but now carry different content:
//   InfrastructureSection  -> "A demo is easy. Production is the job."  (#, inverted)
//   TestimonialsSection    -> "Selected work"                           (#work)
//   FeaturesSection        -> "Four engineers. Every layer."            (#features)
//   IntegrationsSection    -> "Capabilities & stack"                    (#stack)
//   SecuritySection        -> "You own it. All of it."                  (#ownership)
export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <InfrastructureSection />
      <TestimonialsSection projects={projectTeasers} />
      <FeaturesSection />
      <HowItWorksSection />
      <IntegrationsSection />
      <SecuritySection />
      <FaqSection />
      <CtaSection />
      <FooterSection workLinks={projectLinks} />
    </main>
  );
}

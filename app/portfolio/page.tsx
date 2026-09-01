import type { Metadata } from "next";

import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { PortfolioHero } from "@/components/portfolio/portfolio-hero";
import { ProjectCard } from "@/components/portfolio/project-card";
import { PortfolioCta } from "@/components/portfolio/portfolio-cta";
import { portfolioIndex, projectCards, projectLinks } from "@/lib/projects";

export const metadata: Metadata = {
  title: portfolioIndex.pageTitle,
  description: portfolioIndex.metaDescription,
};

export default function PortfolioIndexPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />
      <PortfolioHero />

      <section aria-label="Case studies" className="relative pb-8">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <ul>
            {projectCards.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </ul>
        </div>
      </section>

      <PortfolioCta />
      <FooterSection workLinks={projectLinks} />
    </main>
  );
}

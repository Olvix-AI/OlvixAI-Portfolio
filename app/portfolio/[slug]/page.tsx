import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { ProjectHero } from "@/components/portfolio/project-hero";
import { ProjectMeta } from "@/components/portfolio/project-meta";
import { ProjectSection, Prose } from "@/components/portfolio/project-section";
import { CapabilityGroups } from "@/components/portfolio/capability-groups";
import { StackTable } from "@/components/portfolio/stack-table";
import { DecisionList } from "@/components/portfolio/decision-block";
import { ResultsTable } from "@/components/portfolio/results-table";
import { ScreenshotGallery } from "@/components/portfolio/screenshot-gallery";
import { ProjectNav } from "@/components/portfolio/project-nav";
import { getProject, getProjectNeighbours, projects } from "@/lib/projects";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Not found — OlvixAI" };
  }

  return {
    title: project.pageTitle,
    description: project.metaDescription,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  const neighbours = getProjectNeighbours(slug);

  if (!project || !neighbours) notFound();

  /**
   * Section numbers are counted over the sections that actually render, not fixed to
   * the template, so HRXpert (which has no "Our role" block in the copy) numbers
   * straight through instead of showing a gap.
   */
  let step = 0;
  const nextStep = () => String(++step).padStart(2, "0");

  const challengeStep = nextStep();
  const roleStep = project.role ? nextStep() : null;
  const builtStep = nextStep();
  const stackStep = nextStep();
  const decisionsStep = nextStep();
  const resultsStep = nextStep();
  const screenshotsStep = project.screenshots.length > 0 ? nextStep() : "";

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />

      <ProjectHero
        number={project.number}
        name={project.name}
        eyebrow={project.eyebrow}
        oneLiner={project.oneLiner}
      />

      <ProjectMeta rows={project.meta} />

      <ProjectSection id="challenge" step={challengeStep} heading="The challenge">
        <Prose paragraphs={project.challenge} />
      </ProjectSection>

      {project.role && roleStep ? (
        <ProjectSection id="role" step={roleStep} heading="Our role">
          <Prose paragraphs={project.role} />
        </ProjectSection>
      ) : null}

      <ProjectSection id="what-we-built" step={builtStep} heading="What we built">
        <CapabilityGroups intro={project.built.intro} groups={project.built.groups} />
      </ProjectSection>

      <ProjectSection id="stack" step={stackStep} heading="Stack">
        <StackTable rows={project.stack} />
      </ProjectSection>

      {/* The section that earns the work — tinted and ruled off from ordinary prose. */}
      <ProjectSection id="decisions" step={decisionsStep} heading="Decisions" tinted>
        <DecisionList decisions={project.decisions} />
      </ProjectSection>

      <ProjectSection id="results" step={resultsStep} heading="Results">
        <ResultsTable results={project.results} />
      </ProjectSection>

      <ScreenshotGallery
        screenshots={project.screenshots}
        projectName={project.name}
        step={screenshotsStep}
      />

      <ProjectNav prev={neighbours.prev} next={neighbours.next} />
      <FooterSection />
    </main>
  );
}

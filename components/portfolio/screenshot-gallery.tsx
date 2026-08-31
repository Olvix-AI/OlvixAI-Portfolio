"use client";

import Image from "next/image";
import type { Screenshot } from "@/lib/projects";
import { useReveal } from "./reveal";
import { MEASURE } from "./project-section";

/**
 * Renders nothing at all when there are no screenshots — not an empty grid, not a
 * placeholder. Every project's `screenshots` array is currently empty on purpose: the
 * assets in `docs/` contain real names, contact details and health data and need a
 * manual scrub before they can go in `public/`.
 *
 * `next.config.mjs` sets `images.unoptimized: true`, so whatever lands here ships at
 * full weight — resize and convert to WebP during the scrub.
 */
export function ScreenshotGallery({
  screenshots,
  projectName,
  step,
}: {
  screenshots: Screenshot[];
  projectName: string;
  step: string;
}) {
  const { ref, isVisible } = useReveal<HTMLElement>();

  if (screenshots.length === 0) return null;

  return (
    <section id="screenshots" ref={ref} className="relative py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={MEASURE}>
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            {step}
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-10 lg:mb-14">
            Screenshots
          </h2>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {screenshots.map((shot, index) => (
            <li
              key={shot.src}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <figure className="border border-foreground/10 bg-foreground/[0.02]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={shot.src}
                    alt={shot.alt || `${projectName} screenshot`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                {shot.caption ? (
                  <figcaption className="px-5 py-4 border-t border-foreground/10 text-sm font-mono text-muted-foreground">
                    {shot.caption}
                  </figcaption>
                ) : null}
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

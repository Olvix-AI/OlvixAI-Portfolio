"use client";

import Image from "next/image";
import type { Screenshot } from "@/lib/projects";
import { useReveal } from "./reveal";
import { MEASURE } from "./project-section";

/**
 * Renders nothing at all when there are no screenshots — not an empty grid, not a
 * placeholder. Projects with no assets simply don't get the section.
 *
 * Layout is CSS multi-column rather than a grid. These captures range from a 2.04
 * landscape crop to a 1242x2208 phone screen, and a grid with a fixed aspect ratio
 * either crops the content away or leaves huge gaps. Columns let every image keep its
 * own height and pack naturally.
 *
 * `next.config.mjs` sets `images.unoptimized: true`, so whatever lands here ships at
 * full weight — convert to WebP and resize before this goes anywhere public.
 */
/**
 * `next/link` prefixes `basePath` for you. `next/image` with `unoptimized: true` does
 * NOT — it passes `src` through verbatim, so on GitHub Pages the browser asked for
 * `/work/...` instead of `/OlvixAI-Portfolio/work/...` and every image 404'd while the
 * files themselves were sitting there fine.
 *
 * Same env var `next.config.mjs` reads, inlined at build time: empty locally, so paths
 * stay root-relative for `npm run dev`.
 *
 * Worth knowing how this got missed: verifying it by fetching `<basePath><src>` proves
 * the file exists, not that the link in the markup resolves. Check the `src` attribute
 * in the built HTML and fetch exactly that.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

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

        <div className="columns-1 md:columns-2 gap-6 lg:gap-8 [column-fill:balance]">
          {screenshots.map((shot, index) => (
            <figure
              key={shot.src}
              // `break-inside-avoid` stops a card being split across two columns.
              className={`mb-6 lg:mb-8 break-inside-avoid border border-foreground/10 bg-foreground/[0.02] transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <Image
                src={`${BASE_PATH}${shot.src}`}
                alt={shot.alt || `${projectName} screenshot`}
                width={shot.width}
                height={shot.height}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="w-full h-auto block"
              />
              {shot.caption ? (
                <figcaption className="px-5 py-4 border-t border-foreground/10 text-sm font-mono text-muted-foreground">
                  {shot.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

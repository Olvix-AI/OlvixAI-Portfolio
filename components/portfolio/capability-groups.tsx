"use client";

import type { CapabilityGroup } from "@/lib/projects";
import { Prose } from "./project-section";

/**
 * "What we built". Groups come in three shapes across the four projects — pure prose,
 * pure list, and list-with-prose-after — so `intro`, `items` and `outro` are all
 * optional and render in that order.
 */
export function CapabilityGroups({ intro, groups }: { intro?: string; groups: CapabilityGroup[] }) {
  return (
    <div className="space-y-14 lg:space-y-20">
      {intro ? <p className="text-lg leading-relaxed text-foreground/70">{intro}</p> : null}

      {groups.map((group, index) => (
        <div key={group.title ?? index} className="space-y-6">
          {group.title ? (
            <h3 className="font-display text-2xl lg:text-3xl tracking-tight">
              {group.title}
              {group.lede ? (
                <span className="font-sans text-lg lg:text-xl text-muted-foreground">
                  {" — "}
                  {group.lede}
                </span>
              ) : null}
            </h3>
          ) : null}

          {group.intro ? <Prose paragraphs={group.intro} /> : null}

          {group.items ? (
            <ul className="border-t border-foreground/10">
              {group.items.map((item) => (
                <li key={item.title} className="py-5 border-b border-foreground/10">
                  <span className="font-medium text-foreground">{item.title}</span>
                  <span className="text-muted-foreground"> — </span>
                  <span className="text-foreground/70 leading-relaxed">{item.body}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {group.outro ? <Prose paragraphs={group.outro} /> : null}
        </div>
      ))}
    </div>
  );
}

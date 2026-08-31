"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Copied verbatim in behaviour from `components/landing/metrics-section.tsx`, which is
 * being removed from the home page. Deliberately a copy rather than an import so the
 * portfolio does not depend on a file that is on its way out.
 *
 * Counts from 0 on the first intersection, eased, and never re-runs. `count` starts at
 * 0 on both server and client, so there is nothing nondeterministic in the SSR output —
 * `performance.now()` only ever runs inside the observer callback.
 *
 * Non-integer figures are expressed as an integer plus a `suffix` (92 + ".3%"), the
 * same trick the original metrics grid used for "99.99%".
 */
export function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  className = "text-6xl lg:text-8xl font-display tracking-tight",
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return (
    <div ref={ref} className={className}>
      {prefix}
      {count.toLocaleString("en-US")}
      {suffix}
    </div>
  );
}

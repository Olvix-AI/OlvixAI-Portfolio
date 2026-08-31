"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The landing sections each hand-roll this IntersectionObserver in a `useEffect`.
 * The portfolio has a dozen small sections rather than one big one, so the same
 * observer lives here once instead of being copy-pasted a dozen times. Behaviour is
 * identical to the landing convention: fire once on entry, never reset.
 *
 * Returns `false` on the server and on first paint, so nothing here is
 * nondeterministic during SSR — the observer only ever runs in the browser.
 *
 * Callers pair it with the standard transition:
 *   `transition-all duration-700` + `opacity-100 translate-y-0` / `opacity-0 translate-y-4`
 * and stagger with an inline `style={{ transitionDelay: \`${i * 100}ms\` }}`.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.1) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

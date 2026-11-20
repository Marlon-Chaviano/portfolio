"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function ScrollReveals({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const section = root.current;
    if (!section || !("IntersectionObserver" in window)) return;
    const items = section.querySelectorAll<HTMLElement>("[data-reveal]");
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scrollLinkedCards = CSS.supports("view-timeline-name", "--project-entry")
      && CSS.supports("animation-range", "entry 15% entry 85%");
    let observer: IntersectionObserver | undefined;

    function observeEntries() {
      observer?.disconnect();
      if (preference.matches) {
        items.forEach(item => delete item.dataset.arrival);
        return;
      }

      // IntersectionObserver percentages resolve against width. Use the viewport
      // height so portrait and landscape trigger at the same reading position.
      const bottomInset = Math.round(window.innerHeight * 0.22);
      observer = new IntersectionObserver((entries, current) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.arrival = "visible";
          current.unobserve(entry.target);
        }
      }, { rootMargin: `0px 0px -${bottomInset}px 0px` });

      for (const item of items) {
        if (item.dataset.arrival === "visible" || (scrollLinkedCards && item.dataset.reveal === "project")) continue;
        item.dataset.arrival = "waiting";
        observer.observe(item);
      }
    }
    observeEntries();
    window.addEventListener("resize", observeEntries);
    preference.addEventListener("change", observeEntries);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", observeEntries);
      preference.removeEventListener("change", observeEntries);
      items.forEach(item => delete item.dataset.arrival);
    };
  }, []);
  return <div ref={root} className="home-sections">{children}</div>;
}

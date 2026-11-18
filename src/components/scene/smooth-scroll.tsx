"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/** Eased wheel scrolling on desktop pointers; native scrolling everywhere else. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.12 });
    return () => lenis.destroy();
  }, []);

  return null;
}

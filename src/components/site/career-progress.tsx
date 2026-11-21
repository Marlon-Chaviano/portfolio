"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function CareerEntryContent({ children }: { children: ReactNode }) {
  const content = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: content, offset: ["start 86%", "start 44%"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <div ref={content} className="editorial-content">
      <motion.div className="career-copy" style={{ y }}>{children}</motion.div>
    </div>
  );
}

/** The rail itself is the scroll target, so its fill tracks the viewport midpoint. */
export function CareerProgress() {
  const rail = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: rail, offset: ["start center", "end center"] });

  return (
    <div ref={rail} aria-hidden="true" className="career-rail">
      <motion.span className="career-fill" style={{ scaleY: scrollYProgress }} />
    </div>
  );
}

// Center each marker’s highlight on the same reading line as the rail’s fill.
export function CareerMarker() {
  const marker = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({ target: marker, offset: ["center 60%", "center 40%"] });
  const reached = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);
  const halo = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.7, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1.5]);

  return (
    <span ref={marker} className="career-marker" aria-hidden="true">
      <motion.span className="career-marker-core" style={{ opacity: reached }} />
      <motion.span className="career-marker-halo" style={{ opacity: halo, scale }} />
    </span>
  );
}

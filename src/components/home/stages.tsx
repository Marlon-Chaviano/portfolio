"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

export type Stage = { title: string; body: string; tools: string[] };

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The process, pinned: the section holds the screen while scrolling walks
 * through its stages, lighting one name at a time and swapping the detail.
 */
export function Stages({ stages, index, label, intro }: { stages: Stage[]; index: string; label: string; intro: string }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActive(Math.min(stages.length - 1, Math.floor(value * stages.length)));
  });

  const current = stages[active];

  return (
    <section ref={ref} aria-label={label} className="relative" style={{ height: `${stages.length * 70}svh` }}>
      <div className="sticky top-0 flex h-svh flex-col justify-center pt-14">
        <div className="relative flex items-baseline justify-between gap-10 pt-5">
          <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-line" />
          <motion.span aria-hidden style={{ scaleX: scrollYProgress }} className="absolute inset-x-0 top-0 h-px origin-left bg-fg" />
          <h2 className="label flex gap-3 text-muted">
            <span className="text-faint">{index}</span>
            <span>{label}</span>
          </h2>
          <p className="hidden max-w-md text-sm leading-relaxed text-muted lg:block">{intro}</p>
          <p aria-hidden className="label text-faint tabular-nums">
            <span className="text-fg">{pad(active + 1)}</span> / {pad(stages.length)}
          </p>
        </div>

        <div className="mt-8 grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end">
          <ol className="display text-[clamp(2.25rem,min(7vw,10.5svh),6.5rem)]">
            {stages.map((stage, i) => (
              <li key={stage.title} className={`transition-colors duration-500 ${i === active ? "text-fg" : "text-line"}`}>
                <h3>{stage.title}</h3>
                <p className="sr-only">{stage.body}</p>
              </li>
            ))}
          </ol>

          <div aria-hidden key={active} className="rise lg:pb-3" style={{ animationDuration: "450ms", animationDelay: "0ms" }}>
            <p className="max-w-md text-xl leading-snug sm:text-2xl">{current.body}</p>
            <p className="label mt-5 min-h-4 text-faint">{current.tools.join(" · ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

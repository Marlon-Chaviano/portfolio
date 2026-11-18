"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/** The tools in use as two full-bleed lines that slide past each other as the page scrolls. */
export function StackDrift({ items }: { items: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const still = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const left = useTransform(scrollYProgress, [0, 1], [0, -460]);
  const right = useTransform(scrollYProgress, [0, 1], [-460, 0]);
  const half = Math.ceil(items.length / 2);
  const rows = [items.slice(0, half), items.slice(half)];

  return (
    <div ref={ref} className="mx-[calc(50%-50vw)] overflow-clip">
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {rows.map((row, i) => (
        <motion.p
          key={i}
          aria-hidden
          style={still ? undefined : { x: i ? right : left }}
          className={`display flex w-max py-[0.06em] text-[clamp(3rem,9vw,8rem)] whitespace-nowrap ${i ? "text-faint" : ""}`}
        >
          {[...row, ...row].map((tool, j) => (
            <span key={j} className="flex items-center">
              {tool}
              <span className="mx-[0.3em] size-[0.14em] bg-current" />
            </span>
          ))}
        </motion.p>
      ))}
    </div>
  );
}

"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

function Line({ text, index, scrollY, still }: { text: string; index: number; scrollY: MotionValue<number>; still: boolean }) {
  const x = useTransform(scrollY, [0, 900], ["0%", `${index % 2 ? 9 : -9}%`]);
  return (
    // The padding keeps accents and descenders inside the clip.
    <motion.span style={still ? undefined : { x }} className="-my-[0.14em] block overflow-clip py-[0.14em]">
      <span className="line-up block" style={{ "--i": index } as React.CSSProperties}>
        {text}
      </span>
    </motion.span>
  );
}

/**
 * The home headline. Each line rises into place on load; as the page scrolls
 * the lines pull apart in opposite directions and the whole block dims.
 */
export function HeroTitle({ lines }: { lines: string[] }) {
  const still = Boolean(useReducedMotion());
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 700], [1, 0.12]);

  return (
    <motion.h1 style={still ? undefined : { opacity }} className="display text-[clamp(2.75rem,6.6vw,6.25rem)]">
      {lines.map((line, i) => (
        <Line key={line} text={line} index={i} scrollY={scrollY} still={still} />
      ))}
    </motion.h1>
  );
}

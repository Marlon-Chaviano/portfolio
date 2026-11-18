"use client";

import { Fragment, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

function Word({ text, progress, range, still }: { text: string; progress: MotionValue<number>; range: [number, number]; still: boolean }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return <motion.span style={still ? undefined : { opacity }}>{text}</motion.span>;
}

/** A paragraph that is read by scrolling: each word darkens as it passes the middle of the screen. */
export function Manifesto({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const still = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className="title text-[clamp(1.75rem,4.3vw,4rem)]">
      {words.map((word, i) => (
        <Fragment key={i}>
          <Word text={word} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} still={still} />{" "}
        </Fragment>
      ))}
    </p>
  );
}

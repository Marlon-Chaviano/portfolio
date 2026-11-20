"use client";

import { Fragment, useRef, type CSSProperties } from "react";
import { motion, useScroll, useTransform, type MotionStyle } from "motion/react";

export function ScrollInkText({ text, intro = false }: { text: string; intro?: boolean }) {
  const paragraph = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");
  const { scrollYProgress } = useScroll({
    target: paragraph,
    offset: intro ? ["start 48%", "end 18%"] : ["start center", "end center"],
  });
  const position = useTransform(scrollYProgress, [0, 1], [0, words.length]);

  return (
    <motion.p ref={paragraph} className={intro ? "profile-statement" : undefined} style={{ "--read-position": position } as MotionStyle}>
      {words.map((word, index) => (
        <Fragment key={index}>
          <span className="profile-word" style={{ "--word-order": index } as CSSProperties}>
            {word}<span aria-hidden="true" className="profile-ink" data-word={word} />
          </span>{index < words.length - 1 && " "}
        </Fragment>
      ))}
    </motion.p>
  );
}

"use client";

import { useSyncExternalStore } from "react";
import RotatingText from "../bits/RotatingText";

const noop = () => () => {};

/**
 * Cycles through a list of phrases. The first phrase is what gets prerendered;
 * the animated version takes over once the page is interactive.
 */
export function RotatingWords({ words, className }: { words: string[]; className: string }) {
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  if (!mounted) return <span className={className}>{words[0]}</span>;
  return <RotatingText texts={words} rotationInterval={2600} staggerDuration={0.015} mainClassName={className} />;
}

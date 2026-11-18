"use client";

import type { ReactNode } from "react";
import ClickSpark from "../bits/ClickSpark";

/** A small burst wherever the visitor clicks. */
export function Sparks({ children }: { children: ReactNode }) {
  return (
    <ClickSpark sparkColor="#8a8a8a" sparkSize={8} sparkRadius={18} sparkCount={6} duration={420}>
      {children}
    </ClickSpark>
  );
}

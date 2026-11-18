"use client";

import type { ComponentProps } from "react";
import Magnet from "../bits/Magnet";
import { MoveLink } from "./move-link";

/** A call-to-action that leans toward the pointer. */
export function MagnetLink(props: ComponentProps<typeof MoveLink>) {
  return (
    <Magnet padding={40} magnetStrength={4}>
      <MoveLink {...props} />
    </Magnet>
  );
}

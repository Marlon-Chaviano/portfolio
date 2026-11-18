"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { routeIndex } from "@/lib/routes";

/**
 * A link that knows which way it moves across the board, so the page
 * transition slides forward or back to match the nav order.
 */
export function MoveLink({ href, ...props }: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const pathname = usePathname();
  const forward = routeIndex(href) >= routeIndex(pathname);
  return <Link href={href} transitionTypes={[forward ? "move-forward" : "move-back"]} {...props} />;
}

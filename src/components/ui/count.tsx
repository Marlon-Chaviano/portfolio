"use client";

import { useSyncExternalStore } from "react";
import CountUp from "../bits/CountUp";

const noop = () => () => {};

/** A number that counts up when it scrolls into view. The final value is what gets prerendered. */
export function Count({ to, locale }: { to: number; locale: string }) {
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  if (!mounted) return <span>{to.toLocaleString(locale === "es" ? "es-ES" : "en-US")}</span>;
  return <CountUp to={to} duration={1.4} separator={locale === "es" ? "." : ","} trigger="view" />;
}

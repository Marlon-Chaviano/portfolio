"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useSyncExternalStore } from "react";

const DotGrid = dynamic(() => import("../bits/DotGrid"), { ssr: false });

/** The animation is a garnish: skip it when the visitor or the device asks for less. */
function shouldAnimate() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (connection?.saveData) return false;
  if ((navigator.hardwareConcurrency ?? 8) <= 2) return false;
  return true;
}

const DARK = "(prefers-color-scheme: dark)";
const subscribeScheme = (notify: () => void) => {
  const query = window.matchMedia(DARK);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};

/** One quiet background for the whole site: a grey dot grid that darkens under the pointer. */
export function BackgroundHost() {
  const [live, setLive] = useState(false);
  const dark = useSyncExternalStore(subscribeScheme, () => window.matchMedia(DARK).matches, () => false);

  // Mount after the page has painted so the canvas never competes with the text.
  useEffect(() => {
    if (!shouldAnimate()) return;
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const id = idle(() => setLive(true));
    return () => cancel(id);
  }, []);

  return (
    <div aria-hidden className={`pointer-events-none fixed inset-0 z-0 ${live ? "" : "poster"}`}>
      {live && (
        <div key={dark ? "dark" : "light"} className="rise absolute inset-0" style={{ animationDuration: "1400ms" }}>
          <DotGrid
            dotSize={1.5}
            gap={32}
            baseColor={dark ? "#262626" : "#d4d4d4"}
            activeColor={dark ? "#f0f0f0" : "#0e0e0e"}
            proximity={150}
            glow={0}
            dpr={1.5}
          />
        </div>
      )}
    </div>
  );
}

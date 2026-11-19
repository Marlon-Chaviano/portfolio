import { useSyncExternalStore } from "react";

const desktopQuery = "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (not (any-pointer: coarse))";

export const hasDesktopInteractions = () =>
  typeof window !== "undefined" && window.matchMedia(desktopQuery).matches;

function subscribe(listener: () => void) {
  const media = window.matchMedia(desktopQuery);
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}

export const useDesktopInteractions = () =>
  useSyncExternalStore(subscribe, hasDesktopInteractions, () => false);

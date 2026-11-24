"use client";

import { useLayoutEffect, useRef, type ComponentPropsWithoutRef } from "react";

export function ArticleVideo(props: ComponentPropsWithoutRef<"video">) {
  const ref = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const video = ref.current;
    if (!video) return;

    const pause = () => video.pause();
    window.addEventListener("pagehide", pause);
    return () => {
      window.removeEventListener("pagehide", pause);
      // Next can keep the article mounted while another route is visible.
      pause();
    };
  }, []);

  return <video {...props} ref={ref} />;
}

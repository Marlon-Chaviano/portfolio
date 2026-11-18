"use client";

import dynamic from "next/dynamic";

const TargetCursor = dynamic(() => import("../bits/TargetCursor"), { ssr: false });

/** Corner brackets that lock onto links and buttons. Fine pointers only. */
export function Cursor() {
  return (
    <TargetCursor
      targetSelector="a[href], button, [data-cursor]"
      cursorColor="#ffffff"
      blendMode="difference"
      size={26}
      cornerSize={8}
      thickness={1.5}
      padding={5}
      spinDuration={8}
      hideDefaultCursor={false}
    />
  );
}

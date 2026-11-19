import type { ReactNode } from "react";

export function ToolCarousel({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="tool-carousel" role="group" aria-label={label} tabIndex={0} data-lenis-prevent-horizontal>
      <div className="tool-carousel-track">
        <ul role="list" className="tool-carousel-list">{children}</ul>
        <ul aria-hidden="true" className="tool-carousel-list tool-carousel-copy">{children}</ul>
      </div>
    </div>
  );
}

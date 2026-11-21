import { coreTools } from "@/content/platform-tools";
import { BrandIcon } from "@/components/ui/brand-icon";
import "./tool-carousel.css";

export function ToolCarousel({ label, pause }: { label: string; pause: string }) {
  const tools = coreTools.map((name) => (
    <li key={name} className="tool-carousel-item">
      <BrandIcon name={name} size={26} />
      <span className="whitespace-nowrap text-xs font-medium">{name}</span>
    </li>
  ));
  return (
    <div className="tool-carousel" role="group" aria-label={label} tabIndex={0} data-lenis-prevent-horizontal>
      <label className="tool-carousel-control" title={pause}>
        <input type="checkbox" className="sr-only" aria-label={pause} />
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
          <path className="tools-pause" d="M3 2h3v12H3zM10 2h3v12h-3z" />
          <path className="tools-play" d="M4 2l9 6-9 6z" />
        </svg>
      </label>
      <div className="tool-carousel-track">
        <ul role="list" className="tool-carousel-list">{tools}</ul>
        <ul aria-hidden="true" className="tool-carousel-list tool-carousel-copy">{tools}</ul>
      </div>
    </div>
  );
}

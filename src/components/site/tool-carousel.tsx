import { coreTools } from "@/content/platform-tools";
import { BrandIcon } from "@/components/ui/brand-icon";
import "./tool-carousel.css";

export function ToolCarousel({ label }: { label: string }) {
  const tools = coreTools.map((name) => (
    <li key={name} className="tool-carousel-item">
      <BrandIcon name={name} size={26} />
      <span className="whitespace-nowrap text-xs font-medium">{name}</span>
    </li>
  ));
  return (
    <div className="tool-carousel" role="group" aria-label={label} tabIndex={0} data-lenis-prevent-horizontal>
      <div className="tool-carousel-track">
        <ul role="list" className="tool-carousel-list">{tools}</ul>
        <ul aria-hidden="true" className="tool-carousel-list tool-carousel-copy">{tools}</ul>
      </div>
    </div>
  );
}

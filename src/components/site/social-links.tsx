import { site, socialLinks } from "@/content/site";
import { BrandIcon } from "@/components/ui/brand-icon";

const names: Record<string, string> = { github: "GitHub", x: "X", leetcode: "LeetCode", linkedin: "LinkedIn", whatsapp: "WhatsApp" };

/** Compact social icons in the page; plain text links in the footer. */
export function SocialLinks({ variant = "icons", includeWhatsApp = false }: { variant?: "icons" | "text"; includeWhatsApp?: boolean }) {
  const links = socialLinks().filter(([name]) => variant === "text" || name !== "leetcode");
  if (includeWhatsApp && site.whatsapp) links.push(["whatsapp", `https://wa.me/${site.whatsapp}`]);

  return (
    <ul className={variant === "text" ? "space-y-1.5 text-sm" : "flex flex-wrap gap-2"}>
      {links.map(([name, url]) => (
        <li key={name}>
          <a href={url} target="_blank" rel="me noopener noreferrer" className={variant === "text" ? "text-muted transition-colors hover:text-fg" : "social-link"} aria-label={name === "x" ? "X / Twitter" : names[name] ?? name} title={names[name] ?? name}>
            {variant === "icons" ? <BrandIcon name={name} size={20} monochrome /> : names[name] ?? name}
          </a>
        </li>
      ))}
    </ul>
  );
}

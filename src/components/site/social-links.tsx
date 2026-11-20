import { site, socialLinks } from "@/content/site";
import { BrandIcon } from "@/components/ui/brand-icon";

const names: Record<string, string> = { github: "GitHub", x: "X", leetcode: "LeetCode", linkedin: "LinkedIn", whatsapp: "WhatsApp" };

export function SocialLinks({ variant = "icons", includeWhatsApp = false }: { variant?: "icons" | "footer"; includeWhatsApp?: boolean }) {
  const footer = variant === "footer";
  const links = socialLinks().filter(([name]) => footer || name !== "leetcode");
  if (includeWhatsApp && site.whatsapp) links.push(["whatsapp", `https://wa.me/${site.whatsapp}`]);

  return (
    <ul role="list" className={footer ? "flex" : "flex flex-wrap gap-2"}>
      {links.map(([name, url]) => (
        <li key={name}>
          <a href={url} target="_blank" rel="me noopener noreferrer" className={footer ? "inline-flex size-11 items-center justify-center" : "social-link"} aria-label={name === "x" ? "X / Twitter" : names[name] ?? name} title={names[name] ?? name}>
            <BrandIcon name={name} size={footer ? 18 : 20} monochrome />
          </a>
        </li>
      ))}
    </ul>
  );
}

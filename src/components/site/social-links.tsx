import { site, socialLinks } from "@/content/site";
import { BrandIcon } from "@/components/ui/brand-icon";

const names: Record<string, string> = { github: "GitHub", x: "X", leetcode: "LeetCode", linkedin: "LinkedIn", whatsapp: "WhatsApp" };

/** The footer shows names on wide layouts and icons on small screens. */
export function SocialLinks({ variant = "icons", includeWhatsApp = false }: { variant?: "icons" | "footer"; includeWhatsApp?: boolean }) {
  const footer = variant === "footer";
  const links = socialLinks().filter(([name]) => footer || name !== "leetcode");
  if (includeWhatsApp && site.whatsapp) links.push(["whatsapp", `https://wa.me/${site.whatsapp}`]);

  return (
    <ul role="list" className={footer ? "footer-socials flex gap-x-5 text-sm" : "flex flex-wrap gap-2"}>
      {links.map(([name, url]) => (
        <li key={name}>
          <a href={url} target="_blank" rel="me noopener noreferrer" className={footer ? "footer-social-link inline-flex min-h-11 items-center text-muted transition-colors hover:text-fg" : "social-link"} aria-label={name === "x" ? "X / Twitter" : names[name] ?? name} title={names[name] ?? name}>
            {footer ? (
              <>
                <span className="footer-social-icon"><BrandIcon name={name} size={18} monochrome /></span>
                <span className="footer-social-name">{names[name] ?? name}</span>
              </>
            ) : (
              <BrandIcon name={name} size={20} monochrome />
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}

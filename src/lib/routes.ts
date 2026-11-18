import { stripLocale } from "./i18n";

export type NavKey = "home" | "work" | "about" | "library" | "blog" | "contact";

export const navRoutes: { key: NavKey; path: string }[] = [
  { key: "home", path: "" },
  { key: "work", path: "/work" },
  { key: "about", path: "/about" },
  { key: "library", path: "/library" },
  { key: "blog", path: "/blog" },
  { key: "contact", path: "/contact" },
];

/** The nav section a URL belongs to: "/es/work/diodi" -> "work". */
export function sectionOf(pathname: string): NavKey {
  const path = stripLocale(pathname).replace(/\/$/, "");
  const match = navRoutes
    .slice(1)
    .find((r) => path === r.path || path.startsWith(`${r.path}/`));
  return match?.key ?? "home";
}

/** Position in the nav order (detail pages sit just after their index), used to pick a transition direction. */
export const routeIndex = (pathname: string): number => {
  const path = stripLocale(pathname).replace(/\/$/, "");
  const section = sectionOf(pathname);
  const index = navRoutes.findIndex((r) => r.key === section);
  return path === navRoutes[index].path ? index : index + 0.5;
};

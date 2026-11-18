export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** A string written once per language. */
export type Localized = Record<Locale, string>;

export const otherLocale = (locale: Locale): Locale =>
  locale === "en" ? "es" : "en";

/** Strip the leading locale segment: "/es/work/diodi" -> "/work/diodi". */
export const stripLocale = (pathname: string): string => {
  const [, first, ...rest] = pathname.split("/");
  if (first && isLocale(first)) return rest.length ? `/${rest.join("/")}` : "";
  return pathname === "/" ? "" : pathname;
};

export const localeOf = (pathname: string): Locale => {
  const first = pathname.split("/")[1] ?? "";
  return isLocale(first) ? first : defaultLocale;
};

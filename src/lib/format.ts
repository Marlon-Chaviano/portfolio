import type { Locale } from "./i18n";

/** "2026-11-16" -> "November 16, 2026" / "16 de noviembre de 2026". */
export const formatDate = (date: string, locale: Locale) =>
  new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));

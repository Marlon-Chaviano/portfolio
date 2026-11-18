import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { en } from "@/i18n/en";
import { es } from "@/i18n/es";
import { isLocale, type Locale } from "./i18n";

const dictionaries = { en, es };

export async function getLocale(): Promise<Locale> {
  const locale = await lang();
  if (!isLocale(locale)) notFound();
  return locale;
}

export async function getDict() {
  const locale = await getLocale();
  return { locale, t: dictionaries[locale] };
}

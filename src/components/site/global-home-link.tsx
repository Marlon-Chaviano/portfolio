"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { defaultLocale, isLocale, type Localized } from "@/lib/i18n";

const subscribe = () => () => {};

function getLocale() {
  const segment = window.location.pathname.split("/")[1];
  if (isLocale(segment)) return segment;

  return navigator.languages
    .map((language) => language.slice(0, 2).toLowerCase())
    .find(isLocale) ?? defaultLocale;
}

export function GlobalHomeLink({ labels }: { labels: Localized }) {
  const locale = useSyncExternalStore(subscribe, getLocale, () => defaultLocale);
  return (
    <Link href={`/${locale}`} lang={locale} className="btn not-found-home">
      ← {labels[locale]}
    </Link>
  );
}

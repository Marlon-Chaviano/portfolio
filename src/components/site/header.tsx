"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { otherLocale, stripLocale, type Locale } from "@/lib/i18n";
import { navRoutes, sectionOf, type NavKey } from "@/lib/routes";
import { SoundToggle } from "../sound/sound";
import { MoveLink } from "../ui/move-link";
import { openPalette } from "./command-palette";

type Labels = Record<NavKey, string> & {
  menu: string;
  close: string;
  language: string;
  languageLabel: string;
  search: string;
  soundOn: string;
  soundOff: string;
  soundHint: string;
};

/** A ruled bar: square cells split by hairlines, the current page marked with a rule underneath. */
export function Header({ locale, name, labels }: { locale: Locale; name: string; labels: Labels }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const active = sectionOf(pathname);
  const switchHref = `/${otherLocale(locale)}${stripLocale(pathname)}`;
  const cell = "flex items-center border-l border-line px-4 transition-colors hover:text-fg";

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/80 text-fg backdrop-blur-md"
    >
      <div className="site-navbar mx-auto flex h-14 max-w-[1320px] items-stretch justify-between pl-5 sm:pl-10">
        <MoveLink href={`/${locale}`} className="display flex items-center pr-5 text-xl">
          {name}
        </MoveLink>

        <nav aria-label="Main" className="hidden items-stretch lg:flex">
          {navRoutes.slice(1).map((route) => (
            <MoveLink
              key={route.key}
              href={`/${locale}${route.path}`}
              aria-current={route.key === active ? "page" : undefined}
              data-sound="tab"
              className="flex items-center px-4 text-sm text-muted transition-colors hover:text-fg aria-[current=page]:text-fg aria-[current=page]:shadow-[inset_0_-2px_0_var(--fg)]"
            >
              {labels[route.key]}
            </MoveLink>
          ))}
        </nav>

        <div className="label flex items-stretch text-faint">
          <button type="button" onClick={openPalette} className={`${cell} hidden gap-2 uppercase sm:flex`}>
            <span className="text-fg">{labels.search}</span>
            <kbd>⌘K</kbd>
          </button>
          <span className={cell}>
            <SoundToggle on={labels.soundOn} off={labels.soundOff} hint={labels.soundHint} />
          </span>
          <Link href={switchHref} hrefLang={otherLocale(locale)} lang={otherLocale(locale)} title={labels.languageLabel} className={cell}>
            {otherLocale(locale).toUpperCase()}
            <span className="sr-only"> — {labels.language}</span>
          </Link>
          <button
            type="button"
            className={`${cell} text-fg uppercase lg:hidden`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? labels.close : labels.menu}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Main" className="site-mobile-menu fixed inset-x-0 top-14 flex h-[calc(100dvh-3.5rem)] flex-col overflow-y-auto bg-bg px-5 sm:px-10 lg:hidden">
          {navRoutes.map((route) => (
            <MoveLink
              key={route.key}
              href={`/${locale}${route.path}`}
              aria-current={route.key === active ? "page" : undefined}
              onClick={() => setOpen(false)}
              className="display -mx-5 shrink-0 border-b border-line px-5 py-4 text-4xl text-faint aria-[current=page]:text-fg sm:-mx-10 sm:px-10"
            >
              {labels[route.key]}
            </MoveLink>
          ))}
        </nav>
      )}
    </header>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toggleSound } from "../sound/sound";

const OPEN_EVENT = "palette:open";
export const openPalette = () => window.dispatchEvent(new Event(OPEN_EVENT));

export type PaletteItem = {
  group: string;
  label: string;
  hint?: string;
  href?: string;
  action?: "sound";
};

/** ⌘K: every page, case study, post and action, one keystroke away. */
export function CommandPalette({
  items,
  placeholder,
  empty,
  hint,
}: {
  items: PaletteItem[];
  placeholder: string;
  empty: string;
  hint: string;
}) {
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);

  const q = query.trim().toLowerCase();
  const results = q
    ? items.filter((item) => `${item.label} ${item.hint ?? ""} ${item.group}`.toLowerCase().includes(q))
    : items;
  const selected = Math.min(index, Math.max(results.length - 1, 0));

  useEffect(() => {
    const open = () => {
      setQuery("");
      setIndex(0);
      dialog.current?.showModal();
    };
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialog.current?.open) dialog.current.close();
        else open();
      }
    };
    window.addEventListener(OPEN_EVENT, open);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_EVENT, open);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const run = (item: PaletteItem | undefined) => {
    if (!item) return;
    dialog.current?.close();
    if (item.action === "sound") toggleSound();
    else if (item.href) router.push(item.href);
  };

  return (
    <dialog
      ref={dialog}
      data-lenis-prevent
      aria-label={placeholder}
      className="m-auto mt-[14vh] w-[min(92vw,560px)] border border-fg bg-bg p-0 text-fg"
      onClick={(event) => {
        if (event.target === dialog.current) dialog.current?.close();
      }}
    >
      <input
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setIndex(0);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setIndex((selected + 1) % Math.max(results.length, 1));
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setIndex((selected - 1 + results.length) % Math.max(results.length, 1));
          } else if (event.key === "Enter") {
            event.preventDefault();
            run(results[selected]);
          }
        }}
        placeholder={placeholder}
        aria-label={placeholder}
        autoComplete="off"
        spellCheck={false}
        className="w-full border-b border-line bg-transparent px-5 py-4 text-base outline-none placeholder:text-muted"
      />
      <ul role="listbox" className="max-h-[50vh] overflow-y-auto py-2">
        {results.length === 0 && <li className="px-4 py-6 font-mono text-sm text-muted">{empty}</li>}
        {results.map((item, i) => (
          <li key={`${item.group}-${item.label}`} role="option" aria-selected={i === selected}>
            <button
              type="button"
              onClick={() => run(item)}
              onPointerMove={() => setIndex(i)}
              className={`flex w-full items-baseline justify-between gap-4 px-5 py-2.5 text-left text-sm ${
                i === selected ? "bg-fg text-bg" : ""
              }`}
            >
              <span>{item.label}</span>
              <span className="label opacity-50">{item.hint ?? item.group}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="label border-t border-line px-4 py-3 text-muted">{hint}</p>
    </dialog>
  );
}

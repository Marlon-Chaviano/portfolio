"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import type { BookCategory } from "@/content/books";

type Shelf = { id: BookCategory; label: string; content: ReactNode };

export function LibraryTabs({ shelves, label }: { shelves: Shelf[]; label: string }) {
  const [selected, setSelected] = useState<BookCategory>("software");
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case "ArrowRight": next = (index + 1) % shelves.length; break;
      case "ArrowLeft": next = (index - 1 + shelves.length) % shelves.length; break;
      case "Home": next = 0; break;
      case "End": next = shelves.length - 1; break;
      default: return;
    }
    event.preventDefault();
    setSelected(shelves[next].id);
    buttons.current[next]?.focus();
  }

  return (
    <>
      <div className="library-tab-bar" role="tablist" aria-label={label}>
        {shelves.map((shelf, index) => (
          <button
            key={shelf.id}
            ref={(button) => { buttons.current[index] = button; }}
            id={`${id}-tab-${shelf.id}`}
            type="button"
            role="tab"
            aria-selected={selected === shelf.id}
            aria-controls={`${id}-panel-${shelf.id}`}
            tabIndex={selected === shelf.id ? 0 : -1}
            onClick={() => setSelected(shelf.id)}
            onKeyDown={(event) => navigate(event, index)}
            className={`min-h-12 border-b-2 px-4 py-3 text-sm hover:text-fg sm:px-6 sm:text-base ${selected === shelf.id ? "border-fg text-fg" : "border-transparent text-muted"}`}
          >
            {shelf.label}
          </button>
        ))}
      </div>
      {shelves.map((shelf) => (
        <div
          key={shelf.id}
          id={`${id}-panel-${shelf.id}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${shelf.id}`}
          tabIndex={0}
          hidden={selected !== shelf.id}
        >
          {shelf.content}
        </div>
      ))}
    </>
  );
}

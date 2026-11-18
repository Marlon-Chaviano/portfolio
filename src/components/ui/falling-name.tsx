"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Piece = { char: string; x: number; y: number; w: number; h: number };
type Scene = { pieces: Piece[]; fontSize: string; lineHeight: string };
type Body = { x: number; y: number; vx: number; vy: number; a: number; va: number; r: number; docked: boolean };

const HEADER = 56;
const GRAVITY = 1500;
const MAX_SPEED = 3600;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Where each letter sits on the page right now, so its loose copy can start from the same spot. */
function measure(title: HTMLElement): Scene {
  const style = getComputedStyle(title);
  return {
    fontSize: style.fontSize,
    lineHeight: style.lineHeight,
    pieces: [...title.querySelectorAll<HTMLElement>("[data-letter]")].map((el) => {
      const box = el.getBoundingClientRect();
      return { char: el.textContent ?? "", x: box.left + box.width / 2, y: box.top + window.scrollY + box.height / 2, w: box.width, h: box.height };
    }),
  };
}

/**
 * The page title, letter by letter. A few seconds in the letters come loose:
 * they drift weightless around the top of the page, then gravity returns and
 * they settle on the rule under the header, which they never cross. Each one
 * can be grabbed and thrown, scrolling knocks them back into the air, and
 * dropping a letter on the gap it left puts it back in the title.
 */
export function FallingName({ name, labels }: { name: string; labels: { hint: string; drop: string; reset: string } }) {
  const title = useRef<HTMLHeadingElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<Scene | null>(null);
  const [docked, setDocked] = useState<number[]>([]);
  const words = name.split(" ");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => title.current && setScene(measure(title.current)), 3400);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const root = layer.current;
    if (!scene || !root) return;

    const nodes = [...root.children] as HTMLElement[];
    const bodies: Body[] = scene.pieces.map((piece) => ({
      x: piece.x,
      y: piece.y,
      vx: (Math.random() - 0.5) * 520,
      vy: -120 - Math.random() * 260,
      a: 0,
      va: (Math.random() - 0.5) * 5,
      r: Math.max(piece.w, piece.h * 0.8) / 2,
      docked: false,
    }));
    // Everything is in page coordinates; the floor is the top of whatever follows the header.
    const below = title.current?.closest("header")?.nextElementSibling;
    const pointer = { x: 0, y: 0 };
    const born = performance.now();
    let grabbed = -1;
    let last = born;
    let lastScroll = window.scrollY;
    let frame = 0;

    const down = (event: PointerEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-i]");
      if (!target) return;
      grabbed = Number(target.dataset.i);
      pointer.x = event.clientX;
      pointer.y = event.clientY + window.scrollY;
      target.setPointerCapture(event.pointerId);
      event.preventDefault();
    };
    const move = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY + window.scrollY;
    };
    // Let go over the gap the letter left and it slots back into the title.
    const release = () => {
      const body = bodies[grabbed];
      const piece = scene.pieces[grabbed];
      grabbed = -1;
      if (!body) return;
      if (Math.hypot(body.x - piece.x, body.y - piece.y) > Math.max(36, piece.h * 0.45)) return;
      body.docked = true;
      if (bodies.every((b) => b.docked)) {
        setDocked([]);
        setScene(null);
      } else {
        setDocked(bodies.flatMap((b, i) => (b.docked ? [i] : [])));
      }
    };
    // Scrolling shakes the page: everything that is not being held gets tossed upward.
    const scroll = () => {
      const delta = Math.min(90, Math.abs(window.scrollY - lastScroll));
      lastScroll = window.scrollY;
      bodies.forEach((body, i) => {
        if (i === grabbed || body.docked) return;
        body.vy -= delta * 9;
        body.vx += (Math.random() - 0.5) * delta * 6;
        body.va += (Math.random() - 0.5) * delta * 0.08;
      });
    };

    const step = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      const width = window.innerWidth;
      const floor = below ? below.getBoundingClientRect().top + window.scrollY : window.innerHeight;
      // Weightless at first, then gravity fades in.
      const gravity = GRAVITY * clamp((now - born - 500) / 4000, 0, 1);

      bodies.forEach((body, i) => {
        if (body.docked) return;
        if (i === grabbed) {
          // Chasing the pointer sets the velocity, so letting go throws the letter.
          body.vx = clamp((pointer.x - body.x) * 18, -MAX_SPEED, MAX_SPEED);
          body.vy = clamp((pointer.y - body.y) * 18, -MAX_SPEED, MAX_SPEED);
          body.va *= 0.9;
        } else {
          body.vy += gravity * dt;
        }
        body.x += body.vx * dt;
        body.y += body.vy * dt;
        body.a += body.va * dt;

        if (body.x < body.r) {
          body.x = body.r;
          body.vx = Math.abs(body.vx) * 0.6;
        } else if (body.x > width - body.r) {
          body.x = width - body.r;
          body.vx = -Math.abs(body.vx) * 0.6;
        }
        if (body.y < HEADER + body.r) {
          body.y = HEADER + body.r;
          body.vy = Math.abs(body.vy) * 0.6;
        } else if (body.y > floor - body.r) {
          body.y = floor - body.r;
          body.vy = Math.abs(body.vy) < 60 ? 0 : -Math.abs(body.vy) * 0.45;
          body.vx *= 0.985;
          body.va += (body.vx / body.r - body.va) * 0.15;
        }
        body.va *= 0.995;
      });

      for (let pass = 0; pass < 2; pass++) {
        for (let i = 0; i < bodies.length; i++) {
          for (let j = i + 1; j < bodies.length; j++) {
            const a = bodies[i];
            const b = bodies[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const distance = Math.hypot(dx, dy);
            const reach = a.r + b.r;
            if (a.docked || b.docked || distance === 0 || distance >= reach) continue;
            const nx = dx / distance;
            const ny = dy / distance;
            const overlap = (reach - distance) / 2;
            a.x -= nx * overlap;
            a.y -= ny * overlap;
            b.x += nx * overlap;
            b.y += ny * overlap;
            const closing = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
            if (closing >= 0) continue;
            const impulse = (-1.5 * closing) / 2;
            a.vx -= impulse * nx;
            a.vy -= impulse * ny;
            b.vx += impulse * nx;
            b.vy += impulse * ny;
            const spin = ((b.vx - a.vx) * -ny + (b.vy - a.vy) * nx) * 0.002;
            a.va += spin;
            b.va -= spin;
          }
        }
      }

      bodies.forEach((body, i) => {
        if (body.docked) return;
        const piece = scene.pieces[i];
        nodes[i].style.transform = `translate3d(${body.x - piece.w / 2}px, ${body.y - piece.h / 2}px, 0) rotate(${body.a}rad)`;
      });
      frame = requestAnimationFrame(step);
    };

    root.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    window.addEventListener("scroll", scroll, { passive: true });
    frame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("scroll", scroll);
    };
  }, [scene]);

  return (
    <div className="min-w-0">
      <h1 ref={title} aria-label={name} className="display page-title rise" style={{ "--i": 1 } as React.CSSProperties}>
        {words.map((word, w) => {
          const offset = words.slice(0, w).join("").length;
          return (
            <Fragment key={w}>
              <span aria-hidden className="inline-block whitespace-nowrap">
                {[...word].map((char, i) => (
                  <span
                    key={i}
                    data-letter
                    className={`inline-block transition-colors duration-700 ${scene && !docked.includes(offset + i) ? "text-line" : ""}`}
                  >
                    {char}
                  </span>
                ))}
              </span>{" "}
            </Fragment>
          );
        })}
      </h1>

      <p className="label mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-faint">
        {scene && <span>{labels.hint}</span>}
        <button
          type="button"
          onClick={() => {
            setDocked([]);
            setScene(scene ? null : title.current && measure(title.current));
          }}
          className="link uppercase text-muted transition-colors hover:text-fg"
        >
          {scene ? `↺ ${labels.reset}` : `↓ ${labels.drop}`}
        </button>
      </p>

      {scene &&
        createPortal(
          <div ref={layer} aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-40 h-0">
            {scene.pieces.map((piece, i) => (
              <span
                key={i}
                data-i={i}
                className="display pointer-events-auto absolute top-0 left-0 cursor-grab touch-none select-none will-change-transform active:cursor-grabbing"
                style={{
                  width: piece.w,
                  height: piece.h,
                  fontSize: scene.fontSize,
                  lineHeight: scene.lineHeight,
                  display: docked.includes(i) ? "none" : undefined,
                  transform: `translate3d(${piece.x - piece.w / 2}px, ${piece.y - piece.h / 2}px, 0)`,
                }}
              >
                {piece.char}
              </span>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
}

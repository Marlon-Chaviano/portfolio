"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Dict } from "@/i18n/en";
import { INITIAL, isSolved, moveTile, neighbors, shuffleBoard } from "@/lib/puzzle";
import type { PuzzleScene } from "./puzzle-scene";
import { PuzzleCelebration } from "./puzzle-celebration";

export function TilePuzzle({ labels }: { labels: Dict["about"]["puzzle"] }) {
  const [game, setGame] = useState({ board: [...INITIAL], moves: 0 });
  const [rendered, setRendered] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const boardElement = useRef<HTMLDivElement>(null);
  const scene = useRef<PuzzleScene | null>(null);
  const latest = useRef(game.board);
  const hint = useId();
  const solved = isSolved(game.board);
  const empty = game.board.indexOf(0);

  useEffect(() => {
    latest.current = game.board;
    scene.current?.update(game.board);
  }, [game.board]);

  // The native buttons are the game. WebGL is an enhancement loaded near view.
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let cancelled = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      import("./puzzle-scene").then(({ createPuzzleScene }) => {
        if (cancelled) return;
        try {
          scene.current = createPuzzleScene(element, latest.current, () => setRendered(false));
          setRendered(true);
        } catch {
          // CSS tiles remain playable when WebGL is unavailable.
        }
      }).catch(() => { /* Keep the functional HTML board on a failed download. */ });
    }, { rootMargin: "160px" });
    observer.observe(element);
    return () => {
      cancelled = true;
      observer.disconnect();
      scene.current?.dispose();
      scene.current = null;
    };
  }, []);

  const move = (tile: number) => setGame((current) => {
    if (isSolved(current.board)) return current;
    const board = moveTile(current.board, tile);
    return board === current.board ? current : { board, moves: current.moves + 1 };
  });

  return (
    <div className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <div>
        <h3 className="title max-w-xs text-3xl">{labels.title}</h3>
        <p id={hint} className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{labels.hint}</p>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{labels.keyboard}</p>
        <p role="status" className={`mt-6 min-h-12 text-sm tabular-nums ${solved ? "puzzle-success" : ""}`}>
          {solved && <span className="mb-1 block text-lg font-semibold">{labels.solved}</span>}
          <span className={solved ? "text-muted" : ""}>{game.moves} {game.moves === 1 ? labels.move : labels.moves}</span>
        </p>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn btn-primary min-h-11" onClick={() => setGame({ board: shuffleBoard(), moves: 0 })}>{solved ? labels.again : labels.shuffle}</button>
          <button type="button" className="btn min-h-11" onClick={() => setGame({ board: [...INITIAL], moves: 0 })}>{labels.reset}</button>
        </div>
      </div>
      <div ref={boardElement} className="puzzle-board" data-rendered={rendered} data-solved={solved}>
        <div ref={host} aria-hidden="true" className="pointer-events-none absolute inset-0" />
        <div
          role="group"
          aria-label={labels.board}
          aria-describedby={hint}
          className="puzzle-tiles"
          onKeyDown={(event) => {
            // Arrow direction is the tile's motion into the empty space.
            const from = { ArrowUp: empty + 3, ArrowDown: empty - 3, ArrowLeft: empty + 1, ArrowRight: empty - 1 }[event.key];
            if (from === undefined) return;
            event.preventDefault();
            if (neighbors(empty).includes(from)) move(game.board[from]);
          }}
        >
          {INITIAL.filter(Boolean).map((tile) => {
            const position = game.board.indexOf(tile);
            return (
              <button
                key={tile}
                type="button"
                aria-label={`${labels.tile} ${tile}, ${labels.position} ${position + 1}`}
                aria-disabled={solved || !neighbors(empty).includes(position)}
                onClick={(event) => { event.currentTarget.focus(); move(tile); }}
                className="puzzle-tile"
                style={{ transform: `translate(calc((100% + 8px) * ${position % 3}), calc((100% + 8px) * ${Math.floor(position / 3)}))` }}
              >{tile}</button>
            );
          })}
          {solved && <span aria-hidden="true" className="puzzle-complete-mark"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="m5 12 4 4L19 6" /></svg></span>}
        </div>
      </div>
      {solved && <PuzzleCelebration board={boardElement} />}
    </div>
  );
}

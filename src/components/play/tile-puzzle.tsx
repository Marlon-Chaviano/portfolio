"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { Dict } from "@/i18n/en";
import { INITIAL, isSolved, moveTile, neighbors, shuffleBoard } from "@/lib/puzzle";
import type { PuzzleScene } from "./puzzle-scene";
import { celebratePuzzle } from "./puzzle-celebration";

export function TilePuzzle({ labels }: { labels: Dict["about"]["puzzle"] }) {
  const [game, setGame] = useState({ board: [...INITIAL], moves: 0 });
  const [rendered, setRendered] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const boardElement = useRef<HTMLDivElement>(null);
  const scene = useRef<PuzzleScene | null>(null);
  const currentGame = useRef(game);
  const stopCelebration = useRef<ReturnType<typeof celebratePuzzle>>(undefined);
  const hint = useId();
  const solved = isSolved(game.board);
  const empty = game.board.indexOf(0);

  useEffect(() => {
    scene.current?.update(game.board);
  }, [game.board]);

  useLayoutEffect(() => () => {
    stopCelebration.current?.();
    stopCelebration.current = undefined;
  }, []);

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
          scene.current = createPuzzleScene(element, currentGame.current.board, () => setRendered(false));
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

  function updateGame(next: typeof game) {
    currentGame.current = next;
    setGame(next);
  }

  function restart(board: number[]) {
    stopCelebration.current?.();
    stopCelebration.current = undefined;
    updateGame({ board, moves: 0 });
  }

  function move(tile: number) {
    const current = currentGame.current;
    if (isSolved(current.board)) return;
    const board = moveTile(current.board, tile);
    if (board === current.board) return;

    updateGame({ board, moves: current.moves + 1 });
    if (isSolved(board)) stopCelebration.current = celebratePuzzle(boardElement.current);
  }

  return (
    <div className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <div>
        <h3 className="title max-w-xs text-3xl">{labels.title}</h3>
        <p id={hint} className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{labels.hint}</p>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{labels.keyboard}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" className="btn btn-primary min-h-11" onClick={() => restart(shuffleBoard())}>{solved ? labels.again : labels.shuffle}</button>
          <button type="button" className="btn min-h-11" onClick={() => restart([...INITIAL])}>{labels.reset}</button>
        </div>
      </div>
      <div className="mx-auto w-full max-w-96">
        <div role="status" className="flex min-h-12 items-center gap-3 border-b border-line pb-2">
          {solved && <p className="title text-2xl sm:text-3xl">{labels.solved}</p>}
          <p className="label ml-auto shrink-0 text-muted tabular-nums">{game.moves} {game.moves === 1 ? labels.move : labels.moves}</p>
        </div>
        <div ref={boardElement} className="puzzle-board" data-rendered={rendered}>
          <div ref={host} aria-hidden="true" className="pointer-events-none absolute inset-0" />
          <div
            role="group"
            aria-label={labels.board}
            aria-describedby={hint}
            className="puzzle-tiles"
            onKeyDown={(event) => {
              // Arrow direction is the tile's motion into the empty space.
              const board = currentGame.current.board;
              const empty = board.indexOf(0);
              const from = { ArrowUp: empty + 3, ArrowDown: empty - 3, ArrowLeft: empty + 1, ArrowRight: empty - 1 }[event.key];
              if (from === undefined) return;
              event.preventDefault();
              if (neighbors(empty).includes(from)) move(board[from]);
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
      </div>
    </div>
  );
}

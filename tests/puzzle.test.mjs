import { test } from "node:test";
import assert from "node:assert/strict";
import { INITIAL, SOLVED, isSolved, moveTile, shuffleBoard } from "../src/lib/puzzle.ts";

test("the introductory board can be solved in two moves", () => {
  assert.equal(isSolved(INITIAL), false);
  const first = moveTile(INITIAL, 5);
  assert.equal(first[4], 5);
  assert.deepEqual(moveTile(first, 8), SOLVED);
  assert.equal(isSolved(moveTile(first, 8)), true);
  assert.deepEqual(INITIAL, [1, 2, 3, 4, 0, 6, 7, 5, 8]);
});

test("non-adjacent tiles and the empty space do not move", () => {
  assert.equal(moveTile(INITIAL, 1), INITIAL);
  assert.equal(moveTile(INITIAL, 0), INITIAL);
  // Slots 2 and 3 are consecutive but lie on opposite edges of the board.
  const edge = [1, 2, 0, 4, 5, 3, 7, 8, 6];
  assert.equal(moveTile(edge, 4), edge);
});

test("every shuffled game is unsolved, complete and mathematically solvable", () => {
  let seed = 2026;
  const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 2 ** 32; };
  for (let game = 0; game < 500; game++) {
    const board = shuffleBoard(random);
    assert.deepEqual([...board].sort(), [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    assert.equal(isSolved(board), false);
    const numbered = board.filter(Boolean);
    let inversions = 0;
    numbered.forEach((tile, index) => {
      inversions += numbered.slice(index + 1).filter((next) => next < tile).length;
    });
    assert.equal(inversions % 2, 0, "An odd-width puzzle must have even inversion parity");
  }
});

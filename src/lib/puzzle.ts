export const SOLVED = [1, 2, 3, 4, 5, 6, 7, 8, 0];
export const INITIAL = [1, 2, 3, 4, 0, 6, 7, 5, 8];

export function neighbors(index: number) {
  return [index - 3, index + 3, index % 3 > 0 ? index - 1 : -1, index % 3 < 2 ? index + 1 : -1]
    .filter((next) => next >= 0 && next < 9);
}

export function moveTile(board: number[], tile: number) {
  const from = board.indexOf(tile);
  const empty = board.indexOf(0);
  if (tile === 0 || !neighbors(empty).includes(from)) return board;
  const next = [...board];
  [next[from], next[empty]] = [next[empty], next[from]];
  return next;
}

export const isSolved = (board: number[]) => board.every((tile, index) => tile === SOLVED[index]);

/** Legal moves from the solution guarantee a solvable puzzle. */
export function shuffleBoard(random = Math.random) {
  let board = [...SOLVED];
  let previous = -1;
  for (let step = 0; step < 36; step++) {
    const empty = board.indexOf(0);
    const choices = neighbors(empty).filter((index) => index !== previous);
    const next = choices[Math.floor(random() * choices.length)];
    board = moveTile(board, board[next]);
    previous = empty;
  }
  return isSolved(board) ? [...INITIAL] : board;
}

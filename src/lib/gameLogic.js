/**
 * Pure game-logic helpers for Tic-Tac-Toe.
 *
 * The board is represented as a flat array of 9 cells (index 0-8), read
 * left-to-right, top-to-bottom. Keeping it flat (rather than a nested
 * row/column matrix) removes an entire class of indexing bugs and makes
 * derived values (winner, draw, undo) trivial to compute from a single
 * source of truth: the ordered list of moves.
 *
 *   0 | 1 | 2
 *   3 | 4 | 5
 *   6 | 7 | 8
 */

export const BOARD_SIZE = 9;
export const GRID_DIMENSION = 3;

export const SYMBOLS = {
  X: "X",
  O: "O",
};

/** All 8 index triples that constitute a win. */
export const WINNING_LINES = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal ↘
  [2, 4, 6], // diagonal ↙
];

export function createEmptyBoard() {
  return Array(BOARD_SIZE).fill(null);
}

/**
 * Derives the board from an ordered list of moves. The move list is the
 * single source of truth for game state; the board is always recomputed
 * from it rather than mutated directly, which makes undo a one-line
 * operation (drop the last move) instead of a separate code path.
 */
export function buildBoardFromMoves(moves) {
  const board = createEmptyBoard();
  for (const move of moves) {
    board[move.index] = move.symbol;
  }
  return board;
}

/**
 * Returns { symbol, line } for the first completed line found, or null.
 */
export function getWinner(board) {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { symbol: board[a], line };
    }
  }
  return null;
}

export function isBoardFull(board) {
  return board.every((cell) => cell !== null);
}

export function getNextSymbol(moveCount) {
  return moveCount % 2 === 0 ? SYMBOLS.X : SYMBOLS.O;
}

export function indexToCoordinates(index) {
  return {
    row: Math.floor(index / GRID_DIMENSION),
    col: index % GRID_DIMENSION,
  };
}

/** Human-readable, 1-indexed position for move history & aria-labels. */
export function indexToLabel(index) {
  const { row, col } = indexToCoordinates(index);
  return `row ${row + 1}, column ${col + 1}`;
}

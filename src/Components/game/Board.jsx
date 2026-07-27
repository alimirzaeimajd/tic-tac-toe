import { useRef } from "react";
import Square from "./Square";
import WinningLine from "./WinningLine";
import { GRID_DIMENSION, BOARD_SIZE } from "../../lib/gameLogic";

const ARROW_DELTAS = {
  ArrowUp: -GRID_DIMENSION,
  ArrowDown: GRID_DIMENSION,
  ArrowLeft: -1,
  ArrowRight: 1,
};

// The board container is `rounded-xl` with `overflow-hidden`. Relying on
// clipping alone to round the four corner cells leaves a faint jagged
// seam at the corner (most visible bottom-right), because the clipped
// cell still has square geometry underneath. Rounding the corner cells
// themselves to match removes that seam entirely.
const CORNER_ROUNDING = {
  0: "rounded-tl-xl",
  2: "rounded-tr-xl",
  6: "rounded-bl-xl",
  8: "rounded-br-xl",
};

export default function Board({ board, lastMove, winnerInfo, isGameOver, onPlay }) {
  const cellRefs = useRef([]);

  function handleKeyDown(event, index) {
    const delta = ARROW_DELTAS[event.key];
    if (delta === undefined) return;

    // Prevent left/right from wrapping across row boundaries.
    const isHorizontal = event.key === "ArrowLeft" || event.key === "ArrowRight";
    const col = index % GRID_DIMENSION;
    if (isHorizontal) {
      if (event.key === "ArrowLeft" && col === 0) return;
      if (event.key === "ArrowRight" && col === GRID_DIMENSION - 1) return;
    }

    const nextIndex = index + delta;
    if (nextIndex < 0 || nextIndex >= BOARD_SIZE) return;

    event.preventDefault();
    cellRefs.current[nextIndex]?.focus();
  }

  return (
    <div
      role="grid"
      aria-label="Tic-tac-toe board"
      className="relative grid aspect-square w-full grid-cols-3 grid-rows-3 divide-x divide-y divide-board-line overflow-hidden rounded-xl border border-border bg-board shadow-soft"
    >
      {board.map((value, index) => (
        <Square
          key={index}
          ref={(el) => (cellRefs.current[index] = el)}
          index={index}
          value={value}
          disabled={isGameOver}
          isLastMove={lastMove?.index === index}
          isWinningCell={Boolean(winnerInfo?.line.includes(index))}
          roundedClassName={CORNER_ROUNDING[index]}
          onClick={() => onPlay(index)}
          onKeyDown={(event) => handleKeyDown(event, index)}
        />
      ))}
      {winnerInfo && <WinningLine line={winnerInfo.line} symbol={winnerInfo.symbol} />}
    </div>
  );
}

import { indexToCoordinates } from "../../lib/gameLogic";

const CELL_SPAN = 100 / 3;

function cellCenter(index) {
  const { row, col } = indexToCoordinates(index);
  return {
    x: col * CELL_SPAN + CELL_SPAN / 2,
    y: row * CELL_SPAN + CELL_SPAN / 2,
  };
}

// How far past each winning cell's center to extend the drawn line,
// as a fraction of the start-to-end segment length, so it reads like a
// hand-drawn strike rather than stopping dead at the cell centers.
const OVERSHOOT_RATIO = 0.18;

/**
 * Draws an animated line through the three winning cells. This is the
 * app's signature moment: rather than just recoloring cells, the win is
 * marked the way a person marks a line on paper.
 */
export default function WinningLine({ line, symbol }) {
  const [start, , end] = line.map(cellCenter);
  const dx = end.x - start.x;
  const dy = end.y - start.y;

  const x1 = start.x - dx * OVERSHOOT_RATIO;
  const y1 = start.y - dy * OVERSHOOT_RATIO;
  const x2 = end.x + dx * OVERSHOOT_RATIO;
  const y2 = end.y + dy * OVERSHOOT_RATIO;

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        pathLength={1}
        className={symbol === "X" ? "stroke-x" : "stroke-o"}
        strokeWidth={2.5}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        style={{
          strokeDasharray: 1,
          strokeDashoffset: 1,
          animation: "draw-line 0.5s 0.15s cubic-bezier(0.65, 0, 0.35, 1) forwards",
        }}
      />
    </svg>
  );
}

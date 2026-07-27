import { Square } from "./Square";

export function Board({ squares, xIsNext, winner, winningLine, onPlay }) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 p-4 rounded-2xl bg-muted/50 border shadow-inner mx-auto w-max">
      {squares.map((square, i) => (
        <Square
          key={i}
          index={i}
          value={square}
          onClick={() => onPlay(i)}
          disabled={!!winner}
          isWinningSquare={winningLine.includes(i)}
          xIsNext={xIsNext}
        />
      ))}
    </div>
  );
}

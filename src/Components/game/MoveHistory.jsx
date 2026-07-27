import { Circle, ListTree, X as XIcon } from "lucide-react";
import { indexToLabel } from "../../lib/gameLogic";
import { cx } from "../../lib/utils";

export default function MoveHistory({ moves, players }) {
  const orderedMoves = [...moves].reverse();

  return (
    <section
      aria-label="Move history"
      className="flex flex-col rounded-xl border border-border bg-card"
    >
      <h2 className="border-b border-border px-4 py-3 font-display text-sm font-semibold text-foreground">
        Move history
      </h2>

      {orderedMoves.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4 py-10 text-center">
          <ListTree className="h-6 w-6 text-muted-foreground/50" strokeWidth={1.5} aria-hidden="true" />
          <p className="text-sm text-muted-foreground">No moves yet — make the first move.</p>
        </div>
      ) : (
        <ol className="max-h-64 overflow-y-auto p-2">
          {orderedMoves.map((move) => {
            const isX = move.symbol === "X";
            return (
              <li
                key={move.moveNumber}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm"
              >
                <span
                  className={cx(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-[11px] font-medium",
                    isX ? "bg-x-soft text-x" : "bg-o-soft text-o"
                  )}
                  aria-hidden="true"
                >
                  {isX ? (
                    <XIcon className="h-3.5 w-3.5" strokeWidth={3} />
                  ) : (
                    <Circle className="h-3.5 w-3.5" strokeWidth={3} />
                  )}
                </span>
                <span className="min-w-0 flex-1 truncate text-foreground">
                  {players[move.symbol].name}
                </span>
                <span className="shrink-0 font-mono text-xs text-muted-foreground">
                  {indexToLabel(move.index)}
                </span>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}

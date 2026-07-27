import { Circle, Minus, X as XIcon } from "lucide-react";
import { cx } from "../../lib/utils";

export default function StatusBar({ currentSymbol, currentPlayerName, winnerInfo, isDraw, winnerName }) {
  if (winnerInfo) {
    const isX = winnerInfo.symbol === "X";
    return (
      <div
        role="status"
        aria-live="polite"
        className={cx(
          "flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium",
          isX ? "bg-x-soft text-x" : "bg-o-soft text-o"
        )}
      >
        {isX ? (
          <XIcon className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
        ) : (
          <Circle className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
        )}
        {winnerName} wins the round
      </div>
    );
  }

  if (isDraw) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-center justify-center gap-2 rounded-lg bg-warning-soft px-4 py-2.5 text-sm font-medium text-warning"
      >
        <Minus className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
        It's a draw
      </div>
    );
  }

  const isX = currentSymbol === "X";
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground"
    >
      {isX ? (
        <XIcon className="h-4 w-4 text-x" strokeWidth={3} aria-hidden="true" />
      ) : (
        <Circle className="h-4 w-4 text-o" strokeWidth={3} aria-hidden="true" />
      )}
      <span className="text-muted-foreground">Turn:</span> {currentPlayerName}
    </div>
  );
}

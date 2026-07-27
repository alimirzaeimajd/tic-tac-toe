import { cn } from "../../utils/cn";
import { XToken, OToken } from "../icons/Tokens";
import { Trophy, Ban } from "lucide-react";

export function GameStatus({ winner, isDraw, xIsNext }) {
  return (
    <div className="flex items-center justify-center h-12 mb-6" aria-live="polite">
      {winner ? (
        <div className="flex items-center gap-3 text-xl font-bold animate-pop text-success">
          <Trophy className="h-6 w-6" />
          <span>Winner:</span>
          {winner === "X" ? (
            <XToken className="h-6 w-6 text-x-color" />
          ) : (
            <OToken className="h-6 w-6 text-o-color" />
          )}
        </div>
      ) : isDraw ? (
        <div className="flex items-center gap-2 text-xl font-bold text-muted-foreground animate-pop">
          <Ban className="h-5 w-5" />
          It's a Draw!
        </div>
      ) : (
        <div className="flex items-center gap-2 text-lg font-medium text-muted-foreground">
          Current Turn:
          <span
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-md border bg-card shadow-sm transition-colors",
              xIsNext
                ? "text-x-color border-x-color/30 bg-x-color/10"
                : "text-o-color border-o-color/30 bg-o-color/10"
            )}
          >
            {xIsNext ? <XToken className="h-4 w-4" /> : <OToken className="h-4 w-4" />}
          </span>
        </div>
      )}
    </div>
  );
}

import { memo } from "react";
import { cn } from "../../utils/cn";
import { XToken, OToken } from "../icons/Tokens";

export const Square = memo(function Square({
  value,
  onClick,
  disabled,
  isWinningSquare,
  xIsNext,
  index,
}) {
  return (
    <button
      className={cn(
        "group relative flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center rounded-xl border-2 bg-card text-4xl shadow-sm transition-all duration-200 focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2",
        !value &&
          !disabled &&
          "hover:bg-muted focus-visible:bg-muted active:scale-95 cursor-pointer",
        isWinningSquare && "ring-2 ring-success bg-success/10 border-success/50",
        disabled && !value && "cursor-not-allowed opacity-50"
      )}
      onClick={onClick}
      disabled={disabled || value !== null}
      aria-label={value ? `Square ${index}, occupied by ${value}` : `Square ${index}, empty`}
    >
      {/* Placed Token */}
      {value === "X" && (
        <div className="w-1/2 h-1/2 text-x-color animate-pop">
          <XToken />
        </div>
      )}
      {value === "O" && (
        <div className="w-1/2 h-1/2 text-o-color animate-pop">
          <OToken />
        </div>
      )}

      {/* Ghost Token on Hover */}
      {!value && !disabled && (
        <div
          className={cn(
            "absolute w-1/2 h-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-20",
            xIsNext ? "text-x-color" : "text-o-color"
          )}
        >
          {xIsNext ? <XToken /> : <OToken />}
        </div>
      )}
    </button>
  );
});

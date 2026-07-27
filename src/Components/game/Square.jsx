import { forwardRef } from "react";
import { Circle, X as XIcon } from "lucide-react";
import { cx } from "../../lib/utils";
import { indexToLabel } from "../../lib/gameLogic";

const Square = forwardRef(function Square(
  { index, value, onClick, onKeyDown, isWinningCell, isLastMove, disabled, roundedClassName },
  ref
) {
  const position = indexToLabel(index);
  const ariaLabel = value
    ? `${value} placed at ${position}`
    : `Empty square, ${position}`;

  return (
    <button
      ref={ref}
      type="button"
      role="gridcell"
      aria-label={ariaLabel}
      disabled={disabled || Boolean(value)}
      onClick={onClick}
      onKeyDown={onKeyDown}
      data-index={index}
      className={cx(
        "group relative flex aspect-square items-center justify-center bg-board",
        "transition-colors duration-200 ease-out",
        "focus-visible:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
        !value && !disabled && "cursor-pointer hover:bg-accent/60",
        !value && disabled && "cursor-not-allowed",
        value && "cursor-default",
        isWinningCell && "bg-success-soft",
        isLastMove && !isWinningCell && "ring-1 ring-inset ring-foreground/10",
        roundedClassName
      )}
    >
      {value === "X" && (
        <span
          key={`x-${index}`}
          className="animate-pop-in flex h-full w-full items-center justify-center text-x"
        >
          <XIcon
            className="h-[34%] w-[34%] sm:h-[38%] sm:w-[38%]"
            strokeWidth={2.75}
            aria-hidden="true"
          />
        </span>
      )}
      {value === "O" && (
        <span
          key={`o-${index}`}
          className="animate-pop-in flex h-full w-full items-center justify-center text-o"
        >
          <Circle
            className="h-[30%] w-[30%] sm:h-[33%] sm:w-[33%]"
            strokeWidth={2.75}
            aria-hidden="true"
          />
        </span>
      )}
      {!value && !disabled && (
        <span
          className="pointer-events-none absolute h-[30%] w-[30%] rounded-full bg-muted-foreground/0 opacity-0 transition-opacity duration-150 group-hover:opacity-[0.08] group-hover:bg-foreground"
          aria-hidden="true"
        />
      )}
    </button>
  );
});

export default Square;

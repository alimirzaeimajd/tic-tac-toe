import { RotateCcw, Trash2, Undo2 } from "lucide-react";
import Button from "../ui/Button";
import { cx } from "../../lib/utils";

export default function Controls({
  canUndo,
  isGameOver,
  onUndo,
  onRestartRound,
  onResetMatch,
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button variant="secondary" size="sm" onClick={onUndo} disabled={!canUndo}>
        <Undo2 className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
        Undo
      </Button>

      <Button
        variant="primary"
        size="sm"
        onClick={onRestartRound}
        className={cx(isGameOver && "animate-pulse-once")}
      >
        <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
        New round
      </Button>

      <Button variant="destructive" size="sm" onClick={onResetMatch}>
        <Trash2 className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
        Reset match
      </Button>
    </div>
  );
}

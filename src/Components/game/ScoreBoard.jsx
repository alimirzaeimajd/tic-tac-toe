import { Card } from "../ui/Card";
import { cn } from "../../utils/cn";
import { XToken, OToken } from "../icons/Tokens";

export function ScoreBoard({ scores, xIsNext, isGameOver }) {
  const getHighlight = (isX) => {
    if (isGameOver) return "opacity-50";
    return isX === xIsNext
      ? "ring-2 ring-primary bg-primary/5 shadow-md scale-105"
      : "opacity-70 grayscale-[30%]";
  };

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <Card
        className={cn(
          "transition-all duration-300 flex flex-col items-center justify-center py-4",
          getHighlight(true)
        )}
      >
        <div className="flex items-center gap-2 mb-1 text-sm font-medium text-muted-foreground">
          <XToken className="w-4 h-4 text-x-color" /> Player X
        </div>
        <div className="text-3xl font-bold">{scores.X}</div>
      </Card>

      <Card
        className={cn(
          "transition-all duration-300 flex flex-col items-center justify-center py-4",
          getHighlight(false)
        )}
      >
        <div className="flex items-center gap-2 mb-1 text-sm font-medium text-muted-foreground">
          <OToken className="w-4 h-4 text-o-color" /> Player O
        </div>
        <div className="text-3xl font-bold">{scores.O}</div>
      </Card>

      <Card className="flex flex-col items-center justify-center py-4 opacity-80">
        <div className="text-sm font-medium text-muted-foreground mb-1">Draws</div>
        <div className="text-3xl font-bold text-muted-foreground">{scores.Draws}</div>
      </Card>
    </div>
  );
}

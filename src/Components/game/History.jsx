import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";
import { History as HistoryIcon, MapPin } from "lucide-react";

export function History({ history, currentMove, jumpTo }) {
  return (
    <Card className="h-full max-h-[500px] flex flex-col">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="flex items-center gap-2 text-lg">
          <HistoryIcon className="h-5 w-5 text-primary" />
          Move History
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-0">
        <ul className="p-4 space-y-2">
          {history.map((_, move) => {
            const isCurrent = move === currentMove;
            const description = move > 0 ? `Go to move #${move}` : "Go to game start";

            return (
              <li key={move}>
                <Button
                  variant={isCurrent ? "default" : "outline"}
                  className="w-full justify-start h-auto py-2.5 px-4"
                  onClick={() => jumpTo(move)}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  <span className="flex items-center gap-2 w-full">
                    {isCurrent && <MapPin className="h-4 w-4 shrink-0" />}
                    <span className={!isCurrent ? "ml-6" : ""}>{description}</span>
                  </span>
                </Button>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}

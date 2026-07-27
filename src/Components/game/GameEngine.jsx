import { RotateCcw, Trash2 } from "lucide-react";
import { useGameEngine } from "../../hooks/useGameEngine";
import { Button } from "../ui/Button";
import { ScoreBoard } from "./ScoreBoard";
import { GameStatus } from "./GameStatus";
import { Board } from "./Board";
import { History } from "./History";

export function GameEngine() {
  const {
    history,
    currentMove,
    currentBoard,
    xIsNext,
    winner,
    winningLine,
    isDraw,
    scores,
    handlePlay,
    jumpTo,
    startNewRound,
    resetScores,
  } = useGameEngine();

  const isGameOver = !!winner || isDraw;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Game Area */}
      <div className="lg:col-span-8 flex flex-col w-full max-w-2xl mx-auto">
        <ScoreBoard scores={scores} xIsNext={xIsNext} isGameOver={isGameOver} />

        <GameStatus winner={winner} isDraw={isDraw} xIsNext={xIsNext} />

        <Board
          squares={currentBoard}
          xIsNext={xIsNext}
          winner={winner}
          winningLine={winningLine}
          onPlay={handlePlay}
        />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button onClick={startNewRound} size="lg" className="gap-2 w-full sm:w-auto">
            <RotateCcw className="h-4 w-4" />
            {isGameOver ? "Play Again" : "Restart Round"}
          </Button>

          <Button
            onClick={resetScores}
            variant="outline"
            size="lg"
            className="gap-2 w-full sm:w-auto"
          >
            <Trash2 className="h-4 w-4" />
            Reset Scores
          </Button>
        </div>
      </div>

      {/* Right Column: History */}
      <div className="lg:col-span-4 w-full h-full max-w-2xl mx-auto mt-8 lg:mt-0">
        <History history={history} currentMove={currentMove} jumpTo={jumpTo} />
      </div>
    </div>
  );
}

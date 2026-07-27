import Header from "./components/layout/Header";
import Board from "./components/game/Board";
import StatusBar from "./components/game/StatusBar";
import PlayerCard from "./components/game/PlayerCard";
import Controls from "./components/game/Controls";
import MoveHistory from "./components/game/MoveHistory";
import { useTheme } from "./hooks/useTheme";
import { useSound } from "./hooks/useSound";
import { useTicTacToe } from "./hooks/useTicTacToe";

export default function App() {
  const { preference: themePreference, cyclePreference: cycleTheme } = useTheme();
  const sound = useSound();

  const {
    board,
    moves,
    lastMove,
    players,
    scores,
    currentSymbol,
    winnerInfo,
    isDraw,
    isGameOver,
    canUndo,
    playMove,
    undoLastMove,
    restartRound,
    resetMatch,
    updatePlayerName,
  } = useTicTacToe({
    onMove: sound.playMove,
    onWin: sound.playWin,
    onDraw: sound.playDraw,
    onUndo: sound.playUndo,
  });

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <div className="mx-auto w-full max-w-5xl px-4 pt-6 sm:px-6">
        <Header
          themePreference={themePreference}
          onCycleTheme={cycleTheme}
          soundEnabled={sound.enabled}
          onToggleSound={sound.toggleEnabled}
        />
      </div>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:items-start lg:gap-8 lg:py-10">
        <div className="mx-auto flex w-full max-w-md flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <PlayerCard
              symbol="X"
              name={players.X.name}
              score={scores.X}
              isActive={!isGameOver && currentSymbol === "X"}
              isWinner={isGameOver && winnerInfo?.symbol === "X"}
              onNameChange={updatePlayerName}
            />
            <PlayerCard
              symbol="O"
              name={players.O.name}
              score={scores.O}
              isActive={!isGameOver && currentSymbol === "O"}
              isWinner={isGameOver && winnerInfo?.symbol === "O"}
              onNameChange={updatePlayerName}
            />
          </div>

          <StatusBar
            currentSymbol={currentSymbol}
            currentPlayerName={players[currentSymbol].name}
            winnerInfo={winnerInfo}
            winnerName={winnerInfo ? players[winnerInfo.symbol].name : null}
            isDraw={isDraw}
          />

          <Board
            board={board}
            lastMove={lastMove}
            winnerInfo={winnerInfo}
            isGameOver={isGameOver}
            onPlay={playMove}
          />

          <div className="flex items-center justify-center gap-3 font-mono text-xs text-muted-foreground">
            <span>
              Draws: <span className="text-foreground">{scores.draws}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              Moves: <span className="text-foreground">{moves.length}</span>/9
            </span>
          </div>

          <Controls
            canUndo={canUndo}
            isGameOver={isGameOver}
            onUndo={undoLastMove}
            onRestartRound={restartRound}
            onResetMatch={resetMatch}
          />
        </div>

        <div className="w-full lg:w-80 lg:shrink-0">
          <MoveHistory moves={moves} players={players} />
        </div>
      </main>

      <footer className="mx-auto w-full max-w-5xl px-4 pb-8 pt-2 text-center text-xs text-muted-foreground sm:px-6">
        Built with React, Vite &amp; Tailwind CSS.
      </footer>
    </div>
  );
}

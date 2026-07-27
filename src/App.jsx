import { ThemeToggle } from "./components/ThemeToggle";
import { GameEngine } from "./components/game/GameEngine";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-300">
      <header className="sticky top-0 z-10 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto max-w-5xl px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
              T
            </div>
            <h1 className="text-xl font-semibold tracking-tight">Tic Tac Toe</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 container mx-auto max-w-5xl px-4 py-8 md:py-12 animate-fade">
        <GameEngine />
      </main>
    </div>
  );
}

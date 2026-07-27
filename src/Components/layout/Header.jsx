import { Volume2, VolumeX } from "lucide-react";
import ThemeToggle from "../ThemeToggle";
import IconButton from "../ui/IconButton";

export default function Header({
  themePreference,
  onCycleTheme,
  soundEnabled,
  onToggleSound,
}) {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-display text-base font-semibold text-primary-foreground"
          aria-hidden="true"
        >
          ×○
        </span>
        <div className="leading-tight">
          <h1 className="font-display text-[17px] font-semibold tracking-tight text-foreground">
            Tic-Tac-Toe
          </h1>
          <p className="text-xs text-muted-foreground">A quiet little rivalry</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <IconButton
          label={soundEnabled ? "Mute sound effects" : "Unmute sound effects"}
          onClick={onToggleSound}
        >
          {soundEnabled ? (
            <Volume2 className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
          ) : (
            <VolumeX className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
          )}
        </IconButton>
        <ThemeToggle preference={themePreference} onCycle={onCycleTheme} />
      </div>
    </header>
  );
}

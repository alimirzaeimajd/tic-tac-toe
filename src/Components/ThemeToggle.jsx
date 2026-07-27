import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { Button } from "./ui/Button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="rounded-full"
    >
      {theme === "dark" ? (
        <Moon className="h-5 w-5 text-muted-foreground transition-all hover:text-foreground" />
      ) : (
        <Sun className="h-5 w-5 text-muted-foreground transition-all hover:text-foreground" />
      )}
    </Button>
  );
}

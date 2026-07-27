import { Monitor, Moon, Sun } from "lucide-react";
import IconButton from "./ui/IconButton";

const ICONS = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

const LABELS = {
  light: "Light theme active — switch to dark",
  dark: "Dark theme active — switch to system",
  system: "Matching system theme — switch to light",
};

export default function ThemeToggle({ preference, onCycle }) {
  const Icon = ICONS[preference];

  return (
    <IconButton label={LABELS[preference]} onClick={onCycle}>
      <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
    </IconButton>
  );
}

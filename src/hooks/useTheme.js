import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "ttt:theme";
const THEME_ORDER = ["light", "dark", "system"];

/**
 * Stores the raw preference string ("light" | "dark" | "system") rather
 * than JSON, so it stays readable by the inline anti-flash script in
 * index.html, which runs before React (and this hook) ever mounts.
 */
function readStoredPreference() {
  if (typeof window === "undefined") return "system";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return THEME_ORDER.includes(stored) ? stored : "system";
  } catch {
    return "system";
  }
}

function getSystemPrefersDark() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

export function useTheme() {
  const [preference, setPreference] = useState(readStoredPreference);
  const [systemPrefersDark, setSystemPrefersDark] = useState(getSystemPrefersDark);

  // Track OS-level theme changes while "system" is selected.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event) => setSystemPrefersDark(event.matches);
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const resolvedTheme =
    preference === "system" ? (systemPrefersDark ? "dark" : "light") : preference;

  // Apply the resolved theme to <html> and persist the raw preference.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
    try {
      window.localStorage.setItem(STORAGE_KEY, preference);
    } catch {
      // Ignore write failures (e.g. storage disabled) — theming still
      // works for the current session.
    }
  }, [preference, resolvedTheme]);

  const cyclePreference = useCallback(() => {
    setPreference((current) => {
      const nextIndex = (THEME_ORDER.indexOf(current) + 1) % THEME_ORDER.length;
      return THEME_ORDER[nextIndex];
    });
  }, []);

  return { preference, resolvedTheme, setPreference, cyclePreference };
}

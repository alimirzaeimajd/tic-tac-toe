import { useCallback, useEffect, useRef, useState } from "react";

/**
 * useState backed by localStorage. Falls back to in-memory state only
 * (never throws) if storage is unavailable, e.g. private browsing mode
 * or server-side rendering.
 */
export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => readStorage(key, defaultValue));
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip the write on mount: we just read this value, no need to echo
    // it straight back to storage.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    writeStorage(key, value);
  }, [key, value]);

  const reset = useCallback(() => setValue(defaultValue), [defaultValue]);

  return [value, setValue, reset];
}

function readStorage(key, defaultValue) {
  if (typeof window === "undefined") return defaultValue;
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? defaultValue : JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

function writeStorage(key, value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or disabled — silently no-op, the app still works,
    // it just won't persist between sessions.
  }
}

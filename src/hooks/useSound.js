import { useCallback, useRef } from "react";
import { useLocalStorage } from "./useLocalStorage";

// Short, synthesized tones — no audio assets to ship or fetch.
const TONES = {
  moveX: [{ frequency: 520, duration: 0.07 }],
  moveO: [{ frequency: 400, duration: 0.07 }],
  win: [
    { frequency: 523.25, duration: 0.09 },
    { frequency: 659.25, duration: 0.09 },
    { frequency: 783.99, duration: 0.16 },
  ],
  draw: [
    { frequency: 349.23, duration: 0.11 },
    { frequency: 293.66, duration: 0.18 },
  ],
  undo: [{ frequency: 300, duration: 0.06 }],
};

export function useSound() {
  const [enabled, setEnabled] = useLocalStorage("ttt:sound", true);
  const contextRef = useRef(null);

  const getContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!contextRef.current) {
      contextRef.current = new AudioContextClass();
    }
    // Browsers suspend audio contexts until a user gesture resumes them.
    if (contextRef.current.state === "suspended") {
      contextRef.current.resume();
    }
    return contextRef.current;
  }, []);

  const play = useCallback(
    (toneName) => {
      if (!enabled) return;
      const context = getContext();
      if (!context) return;

      let startTime = context.currentTime;
      for (const { frequency, duration } of TONES[toneName] ?? []) {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(frequency, startTime);

        // Quick attack, gentle decay envelope so tones sound like soft
        // clicks/chimes rather than harsh beeps.
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.12, startTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        oscillator.connect(gain).connect(context.destination);
        oscillator.start(startTime);
        oscillator.stop(startTime + duration + 0.02);

        startTime += duration * 0.85;
      }
    },
    [enabled, getContext]
  );

  const toggleEnabled = useCallback(() => setEnabled((current) => !current), [setEnabled]);

  return {
    enabled,
    toggleEnabled,
    playMove: (symbol) => play(symbol === "X" ? "moveX" : "moveO"),
    playWin: () => play("win"),
    playDraw: () => play("draw"),
    playUndo: () => play("undo"),
  };
}

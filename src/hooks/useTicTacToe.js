import { useCallback, useEffect, useMemo, useRef } from "react";
import { useLocalStorage } from "./useLocalStorage";
import {
  buildBoardFromMoves,
  getNextSymbol,
  getWinner,
  isBoardFull,
} from "../lib/gameLogic";

const DEFAULT_PLAYERS = {
  X: { name: "Player 1" },
  O: { name: "Player 2" },
};

const DEFAULT_SCORES = { X: 0, O: 0, draws: 0 };

/**
 * Drives the entire game. The ordered `moves` list is the single source
 * of truth — board, current turn, winner, draw state, and move history
 * are all derived from it. This means undo, restart, and rendering can
 * never disagree with each other, which was a real bug in the original
 * implementation (editing a player's name never reached game state, and
 * the board stayed clickable after the game had already ended).
 */
export function useTicTacToe({ onMove, onWin, onDraw, onUndo } = {}) {
  const [players, setPlayers] = useLocalStorage("ttt:players", DEFAULT_PLAYERS);
  const [scores, setScores] = useLocalStorage("ttt:scores", DEFAULT_SCORES);
  const [moves, setMoves] = useLocalStorage("ttt:moves", []);

  // Guards against re-scoring the same finished round twice (e.g. if the
  // component re-renders while the game is already over).
  const hasScoredRoundRef = useRef(false);

  const board = useMemo(() => buildBoardFromMoves(moves), [moves]);
  const winnerInfo = useMemo(() => getWinner(board), [board]);
  const isDraw = !winnerInfo && moves.length > 0 && isBoardFull(board);
  const isGameOver = Boolean(winnerInfo) || isDraw;
  const currentSymbol = getNextSymbol(moves.length);
  const lastMove = moves.length > 0 ? moves[moves.length - 1] : null;

  useEffect(() => {
    if (!isGameOver) {
      hasScoredRoundRef.current = false;
      return;
    }
    if (hasScoredRoundRef.current) return;
    hasScoredRoundRef.current = true;

    if (winnerInfo) {
      setScores((current) => ({
        ...current,
        [winnerInfo.symbol]: current[winnerInfo.symbol] + 1,
      }));
      onWin?.(winnerInfo);
    } else {
      setScores((current) => ({ ...current, draws: current.draws + 1 }));
      onDraw?.();
    }
    // setScores is stable (state setter); omitting it keeps this effect
    // focused on the actual trigger, the game-over transition.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameOver, winnerInfo, onWin, onDraw]);

  const playMove = useCallback(
    (index) => {
      if (isGameOver || board[index] !== null) return;
      const symbol = currentSymbol;
      setMoves((current) => [...current, { index, symbol, moveNumber: current.length + 1 }]);
      onMove?.(symbol);
    },
    [board, currentSymbol, isGameOver, onMove, setMoves]
  );

  const undoLastMove = useCallback(() => {
    if (moves.length === 0) return;
    setMoves((current) => current.slice(0, -1));
    onUndo?.();
  }, [moves.length, onUndo, setMoves]);

  const restartRound = useCallback(() => {
    setMoves([]);
  }, [setMoves]);

  const resetMatch = useCallback(() => {
    setMoves([]);
    setScores(DEFAULT_SCORES);
  }, [setMoves, setScores]);

  const updatePlayerName = useCallback(
    (symbol, name) => {
      const trimmed = name.trim();
      setPlayers((current) => ({
        ...current,
        [symbol]: { ...current[symbol], name: trimmed || DEFAULT_PLAYERS[symbol].name },
      }));
    },
    [setPlayers]
  );

  return {
    board,
    moves,
    lastMove,
    players,
    scores,
    currentSymbol,
    winnerInfo,
    isDraw,
    isGameOver,
    canUndo: moves.length > 0,
    playMove,
    undoLastMove,
    restartRound,
    resetMatch,
    updatePlayerName,
  };
}

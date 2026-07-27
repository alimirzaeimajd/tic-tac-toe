import { useState, useCallback, useEffect } from "react";
import { calculateWinner } from "../utils/gameLogic";

const INITIAL_SCORES = { X: 0, O: 0, Draws: 0 };

export function useGameEngine() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [scores, setScores] = useState(() => {
    const saved = localStorage.getItem("tictactoe-scores");
    return saved ? JSON.parse(saved) : INITIAL_SCORES;
  });

  const currentBoard = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  const winnerData = calculateWinner(currentBoard);
  const winner = winnerData?.winner || null;
  const winningLine = winnerData?.line || [];

  const isDraw = !winner && currentBoard.every((square) => square !== null);

  useEffect(() => {
    localStorage.setItem("tictactoe-scores", JSON.stringify(scores));
  }, [scores]);

  const handlePlay = useCallback(
    (squareIndex) => {
      if (currentBoard[squareIndex] || winner) return;

      const nextBoard = [...currentBoard];
      nextBoard[squareIndex] = xIsNext ? "X" : "O";

      const nextHistory = [...history.slice(0, currentMove + 1), nextBoard];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);

      // Calculate score updates immediately based on the *new* board
      const newWinnerData = calculateWinner(nextBoard);
      const newDraw = !newWinnerData && nextBoard.every((s) => s !== null);

      if (newWinnerData) {
        setScores((prev) => ({ ...prev, [newWinnerData.winner]: prev[newWinnerData.winner] + 1 }));
      } else if (newDraw) {
        setScores((prev) => ({ ...prev, Draws: prev.Draws + 1 }));
      }
    },
    [currentBoard, winner, xIsNext, history, currentMove]
  );

  const jumpTo = useCallback((move) => {
    setCurrentMove(move);
  }, []);

  const startNewRound = useCallback(() => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }, []);

  const resetScores = useCallback(() => {
    setScores(INITIAL_SCORES);
    startNewRound();
  }, [startNewRound]);

  return {
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
  };
}

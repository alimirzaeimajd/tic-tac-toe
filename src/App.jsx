import "./App.css";
import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import { useState } from "react";
import ShowLog from "./Components/showLog";
import GameOver from "./Components/GameOver";
import { WINNING_COMBINATIONS as winSituation } from "./winning-combinations";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function getWinner(b, p) {
  let winner;

  for (const c of winSituation) {
    const first = b[c[0].row][c[0].column];
    const second = b[c[1].row][c[1].column];
    const third = b[c[2].row][c[2].column];

    if (first && first === second && second === third) {
      winner = p[first];
    }
  }

  return winner;
}

function App() {
  const [gameLogs, setGameLogs] = useState([]);

  const [gameBoard, setGameBoard] = useState(INITIAL_GAME_BOARD);

  const [currentPlayer, setCurrentPlayer] = useState("X");

  function handleButtonClick(row, col) {
    if (gameBoard[row][col]) return; // square already filled
    const next = gameBoard.map((row) => [...row]); // don't mutate state directly
    next[row][col] = currentPlayer;
    setGameBoard(next);

    setGameLogs([
      {
        squareInfo: { row, col },
        player: currentPlayer,
      },
      ...gameLogs,
    ]);

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  function handleRestart() {
    setGameLogs([]);
    setGameBoard(INITIAL_GAME_BOARD.map((row) => [...row]));
    setCurrentPlayer("X");
  }

  const winner = getWinner(gameBoard, PLAYERS);
  const isDraw = gameLogs.length === 9 && !winner;
  return (
    <>
      {(winner || isDraw) && <GameOver status={winner} restart={handleRestart} />}
      <Player name="Player 1" symbol={"X"} />
      <Player name="Player 2" symbol={"O"} />
      <GameBoard board={gameBoard} handleClick={handleButtonClick} />
      <ShowLog Logs={gameLogs} />
    </>
  );
}

export default App;

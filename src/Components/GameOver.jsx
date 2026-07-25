export default function GameOver({ status, restart }) {
  return (
    <div>
      <h2>Game Over!</h2>
      {status && <p>{status} won!</p>}
      {!status && <p>It&apos;s a draw!</p>}
      <p>
        <button onClick={restart}>Rematch!</button>
      </p>
    </div>
  );
}

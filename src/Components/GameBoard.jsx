export default function GameBoard({ board, handleClick }) {
  return (
    <>
      {board.map((r, rindex) => (
        <div key={rindex}>
          {r.map((c, cindex) => (
            <button
              key={`${rindex}${cindex}`}
              onClick={() => {
                handleClick(rindex, cindex);
              }}
            >
              {c}
            </button>
          ))}
        </div>
      ))}
    </>
  );
}

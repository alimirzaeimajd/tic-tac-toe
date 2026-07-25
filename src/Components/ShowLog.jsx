export default function ShowLog({ Logs }) {
  return (
    <ol>
      {Logs.map((log) => {
        return (
          <li key={`${log.squareInfo.row}${log.squareInfo.col}`}>
            {log.player} selected {log.squareInfo.row},{log.squareInfo.col}
          </li>
        );
      })}
    </ol>
  );
}

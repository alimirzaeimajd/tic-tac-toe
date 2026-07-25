import { useState } from "react";

export default function Player({ name, symbol }) {
  const [player, setPlayer] = useState(name);
  const [editingStatus, setEditingStatus] = useState(false);

  function handleEditButton() {
    setEditingStatus((editing) => !editing);
  }

  function handleChange(e) {
    setPlayer(e.target.value);
  }

  return (
    <div>
      {/* <input type="text" value={name} required /> */}
      <span>
        {editingStatus ? (
          <input type="text" value={player} required onChange={handleChange} />
        ) : (
          <span>{player}</span>
        )}
        <span>{symbol}</span>
      </span>
      <button onClick={handleEditButton}>{editingStatus ? "Save" : "Edit"}</button>
    </div>
  );
}

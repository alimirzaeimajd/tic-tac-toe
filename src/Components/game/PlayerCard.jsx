import { useEffect, useRef, useState } from "react";
import { Check, Circle, Pencil, X as XIcon } from "lucide-react";
import { cx } from "../../lib/utils";

const SYMBOL_STYLES = {
  X: {
    Icon: XIcon,
    text: "text-x",
    ring: "ring-x/40",
    softBg: "bg-x-soft",
  },
  O: {
    Icon: Circle,
    text: "text-o",
    ring: "ring-o/40",
    softBg: "bg-o-soft",
  },
};

export default function PlayerCard({ symbol, name, score, isActive, isWinner, onNameChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const { Icon, text, ring, softBg } = SYMBOL_STYLES[symbol];

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  function commitEdit() {
    setIsEditing(false);
    onNameChange(symbol, inputRef.current?.value ?? name);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      commitEdit();
    } else if (event.key === "Escape") {
      setIsEditing(false);
    }
  }

  return (
    <div
      className={cx(
        "flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-all duration-200",
        isActive && cx("ring-2 ring-offset-2 ring-offset-background", ring)
      )}
    >
      <span
        className={cx(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
          softBg,
          text
        )}
        aria-hidden="true"
      >
        <Icon className="h-5 w-5" strokeWidth={2.5} />
      </span>

      <div className="min-w-0 flex-1">
        {isEditing ? (
          <input
            key={name}
            ref={inputRef}
            type="text"
            defaultValue={name}
            maxLength={20}
            onBlur={commitEdit}
            onKeyDown={handleKeyDown}
            aria-label={`Name for player ${symbol}`}
            className="w-full rounded-md border border-border bg-background px-2 py-1 font-sans text-sm font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        ) : (
          <p className="truncate font-sans text-sm font-medium text-foreground">{name}</p>
        )}
        <p className="font-mono text-xs text-muted-foreground">
          {score} {score === 1 ? "win" : "wins"}
        </p>
      </div>

      {isWinner && (
        <span
          className={cx(
            "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
            softBg,
            text
          )}
        >
          <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
          Won
        </span>
      )}

      {!isEditing && (
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          aria-label={`Edit name for player ${symbol}`}
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Pencil className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

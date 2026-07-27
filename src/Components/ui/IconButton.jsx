import { cx } from "../../lib/utils";

export default function IconButton({ label, className, children, ...props }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cx(
        "inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border",
        "bg-card text-muted-foreground transition-all duration-150 ease-out",
        "hover:bg-accent hover:text-foreground active:scale-[0.94]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "focus-visible:ring-offset-background",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

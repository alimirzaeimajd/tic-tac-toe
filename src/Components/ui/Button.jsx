import { cx } from "../../lib/utils";

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium " +
  "font-sans transition-all duration-150 ease-out " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 " +
  "active:scale-[0.97]";

const VARIANT_CLASSES = {
  primary:
    "bg-primary text-primary-foreground shadow-soft hover:opacity-90",
  secondary:
    "bg-secondary text-secondary-foreground border border-border hover:bg-accent",
  ghost: "text-foreground hover:bg-accent",
  destructive:
    "bg-error/10 text-error border border-error/20 hover:bg-error/15",
};

const SIZE_CLASSES = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4",
  lg: "h-12 px-6 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) {
  return (
    <button
      className={cx(
        BASE_CLASSES,
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/** Joins truthy class names together, filtering out falsy values. */
export function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

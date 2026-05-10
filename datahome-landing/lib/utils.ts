/**
 * Joins class names together, filtering out falsy values.
 * Lightweight alternative to the `clsx` package — no extra dependency needed
 * for this project since we only need basic conditional class merging.
 */
export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ")
}

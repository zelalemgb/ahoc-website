/**
 * Minimal className joiner. Filters falsy values and joins with spaces.
 * (Kept dependency-free; swap for `clsx` + `tailwind-merge` if class
 * conflicts become a concern.)
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

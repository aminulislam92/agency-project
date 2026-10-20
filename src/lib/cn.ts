type ClassValue = string | false | null | undefined

/** Joins truthy class names. Components keep their classes additive so no merge step is needed. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ')
}

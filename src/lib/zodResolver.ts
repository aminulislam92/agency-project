import type { FieldErrors, FieldValues, Resolver } from 'react-hook-form'
import type { z } from 'zod'

/**
 * Minimal react-hook-form resolver for Zod 4 schemas.
 * (Used instead of @hookform/resolvers, whose current release has an
 * unresolvable optional-peer conflict under npm 11.)
 */
export function zodResolver<TSchema extends z.ZodType<FieldValues, FieldValues>>(
  schema: TSchema,
): Resolver<z.input<TSchema>, unknown, z.output<TSchema>> {
  return async (values) => {
    const result = await schema.safeParseAsync(values)

    if (result.success) {
      return { values: result.data, errors: {} }
    }

    const errors: Record<string, { type: string; message: string }> = {}
    for (const issue of result.error.issues) {
      const path = issue.path.join('.')
      if (path && !(path in errors)) {
        errors[path] = { type: issue.code, message: issue.message }
      }
    }

    return { values: {}, errors: toNestedErrors<z.input<TSchema>>(errors) }
  }
}

function toNestedErrors<T extends FieldValues>(
  flat: Record<string, { type: string; message: string }>,
): FieldErrors<T> {
  const nested: Record<string, unknown> = {}
  for (const [path, error] of Object.entries(flat)) {
    const keys = path.split('.')
    let node = nested
    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        node[key] = error
      } else {
        node[key] ??= {}
        node = node[key] as Record<string, unknown>
      }
    })
  }
  return nested as FieldErrors<T>
}

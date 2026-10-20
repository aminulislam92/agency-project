import type { SerializedError } from '@reduxjs/toolkit'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

function hasMessage(value: unknown): value is { message: string } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'message' in value &&
    typeof value.message === 'string'
  )
}

/** Human-readable message from an RTK Query error. */
export function getErrorMessage(
  error: FetchBaseQueryError | SerializedError | undefined,
  fallback = 'Something went wrong. Please try again.',
): string {
  if (!error) return fallback
  if ('status' in error) {
    if (hasMessage(error.data)) return error.data.message
    if (error.status === 'FETCH_ERROR') return 'Network error — check your connection and retry.'
    return fallback
  }
  return error.message ?? fallback
}

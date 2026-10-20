import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '@/lib/config'

/**
 * Single RTK Query API slice. Feature endpoints are added with `api.injectEndpoints`
 * in the sibling *Api.ts files so each domain stays in its own module.
 */
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Project', 'Post', 'Comment', 'Service', 'Team', 'Testimonial', 'Client', 'Award'],
  endpoints: () => ({}),
})

/** Builds a query string, skipping empty values. */
export function toQueryString(params: Record<string, string | number | undefined>): string {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '' && value !== 'all') search.set(key, String(value))
  }
  const query = search.toString()
  return query ? `?${query}` : ''
}

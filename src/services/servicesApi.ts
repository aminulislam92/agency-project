import type { Service } from '@/types'
import { api } from './api'

export const servicesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getServices: build.query<Service[], void>({
      query: () => '/services',
      providesTags: (result) => [
        ...(result?.map(({ slug }) => ({ type: 'Service' as const, id: slug })) ?? []),
        { type: 'Service', id: 'LIST' },
      ],
    }),

    getServiceBySlug: build.query<Service, string>({
      query: (slug) => `/services/${encodeURIComponent(slug)}`,
      providesTags: (_result, _error, slug) => [{ type: 'Service', id: slug }],
    }),
  }),
})

export const { useGetServicesQuery, useGetServiceBySlugQuery } = servicesApi

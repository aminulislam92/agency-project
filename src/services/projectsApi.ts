import type { Paginated, Project, ProjectsQuery } from '@/types'
import { api, toQueryString } from './api'

export const projectsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProjects: build.query<Paginated<Project>, ProjectsQuery | undefined>({
      query: ({ category, page, pageSize, featured } = {}) =>
        `/projects${toQueryString({ category, page, pageSize, featured: featured ? 'true' : undefined })}`,
      providesTags: (result) => [
        ...(result?.items.map(({ id }) => ({ type: 'Project' as const, id })) ?? []),
        { type: 'Project', id: 'LIST' },
      ],
    }),
  }),
})

export const { useGetProjectsQuery } = projectsApi

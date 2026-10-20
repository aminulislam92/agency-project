import type {
  Award,
  Client,
  ContactMessage,
  MutationResult,
  TeamMember,
  Testimonial,
} from '@/types'
import { api } from './api'

/** Team, social proof and contact endpoints. */
export const companyApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTeam: build.query<TeamMember[], void>({
      query: () => '/team',
      providesTags: [{ type: 'Team', id: 'LIST' }],
    }),

    getTestimonials: build.query<Testimonial[], void>({
      query: () => '/testimonials',
      providesTags: [{ type: 'Testimonial', id: 'LIST' }],
    }),

    getClients: build.query<Client[], void>({
      query: () => '/clients',
      providesTags: [{ type: 'Client', id: 'LIST' }],
    }),

    getAwards: build.query<Award[], void>({
      query: () => '/awards',
      providesTags: [{ type: 'Award', id: 'LIST' }],
    }),

    sendContactMessage: build.mutation<MutationResult, ContactMessage>({
      query: (body) => ({ url: '/contact', method: 'POST', body }),
    }),
  }),
})

export const {
  useGetTeamQuery,
  useGetTestimonialsQuery,
  useGetClientsQuery,
  useGetAwardsQuery,
  useSendContactMessageMutation,
} = companyApi

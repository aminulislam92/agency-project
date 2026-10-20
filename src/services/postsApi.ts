import type {
  Comment,
  MutationResult,
  NewComment,
  NewsletterSubscription,
  Paginated,
  Post,
  PostsQuery,
  PostSummary,
} from '@/types'
import { api, toQueryString } from './api'

export const postsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<Paginated<PostSummary>, PostsQuery | undefined>({
      query: ({ category, page, pageSize, search, featured } = {}) =>
        `/posts${toQueryString({ category, page, pageSize, search, featured: featured ? 'true' : undefined })}`,
      providesTags: (result) => [
        ...(result?.items.map(({ slug }) => ({ type: 'Post' as const, id: slug })) ?? []),
        { type: 'Post', id: 'LIST' },
      ],
    }),

    getPostBySlug: build.query<Post, string>({
      query: (slug) => `/posts/${encodeURIComponent(slug)}`,
      providesTags: (_result, _error, slug) => [{ type: 'Post', id: slug }],
    }),

    getRelatedPosts: build.query<PostSummary[], string>({
      query: (slug) => `/posts/${encodeURIComponent(slug)}/related`,
      providesTags: [{ type: 'Post', id: 'LIST' }],
    }),

    getComments: build.query<Comment[], string>({
      query: (postSlug) => `/posts/${encodeURIComponent(postSlug)}/comments`,
      providesTags: (_result, _error, postSlug) => [{ type: 'Comment', id: postSlug }],
    }),

    addComment: build.mutation<Comment, NewComment>({
      query: ({ postSlug, ...body }) => ({
        url: `/posts/${encodeURIComponent(postSlug)}/comments`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (_result, _error, { postSlug }) => [
        { type: 'Comment', id: postSlug },
        { type: 'Post', id: postSlug },
      ],
    }),

    subscribeNewsletter: build.mutation<MutationResult, NewsletterSubscription>({
      query: (body) => ({ url: '/newsletter', method: 'POST', body }),
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostBySlugQuery,
  useGetRelatedPostsQuery,
  useGetCommentsQuery,
  useAddCommentMutation,
  useSubscribeNewsletterMutation,
} = postsApi

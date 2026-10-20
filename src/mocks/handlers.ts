import { delay, http, HttpResponse } from 'msw'
import { API_URL } from '@/lib/config'
import type {
  Comment,
  ContactMessage,
  MutationResult,
  NewComment,
  NewsletterSubscription,
  Paginated,
  Post,
  PostSummary,
} from '@/types'
import { comments as seedComments } from './data/comments'
import { awards, clients, team, testimonials } from './data/company'
import { posts } from './data/posts'
import { featuredProjects, projects } from './data/projects'
import { services } from './data/services'

/** Simulated network latency so loading states are visible in development. */
const LATENCY = 350

/* In-memory store for data that mutations change (resets on reload). */
const db = {
  comments: [...seedComments],
}

const api = (path: string) => `${API_URL}${path}`

function paginate<T>(items: T[], page: number, pageSize: number): Paginated<T> {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const current = Math.min(Math.max(1, page), totalPages)
  return {
    items: items.slice((current - 1) * pageSize, current * pageSize),
    page: current,
    pageSize,
    total: items.length,
    totalPages,
  }
}

function intParam(url: URL, key: string, fallback: number): number {
  const value = Number(url.searchParams.get(key))
  return Number.isInteger(value) && value > 0 ? value : fallback
}

function toSummary({ content: _content, ...summary }: Post): PostSummary {
  return summary
}

const notFound = (message: string) => HttpResponse.json({ message }, { status: 404 })
const badRequest = (message: string) => HttpResponse.json({ message }, { status: 400 })
const isEmail = (value: unknown): value is string =>
  typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

export const handlers = [
  /* ---- Projects ---------------------------------------------------------- */
  http.get(api('/projects'), async ({ request }) => {
    await delay(LATENCY)
    const url = new URL(request.url)
    if (url.searchParams.get('featured') === 'true') {
      return HttpResponse.json(paginate(featuredProjects, 1, featuredProjects.length))
    }
    const category = url.searchParams.get('category')
    const filtered = category
      ? projects.filter((project) => project.categories.some((c) => c === category))
      : projects
    return HttpResponse.json(
      paginate(filtered, intParam(url, 'page', 1), intParam(url, 'pageSize', 6)),
    )
  }),

  /* ---- Posts ------------------------------------------------------------- */
  http.get(api('/posts'), async ({ request }) => {
    await delay(LATENCY)
    const url = new URL(request.url)
    const category = url.searchParams.get('category')
    const search = url.searchParams.get('search')?.trim().toLowerCase()
    const featured = url.searchParams.get('featured') === 'true'

    const filtered = posts
      .filter((post) => !featured || post.featured)
      .filter((post) => !category || post.category === category)
      .filter(
        (post) =>
          !search ||
          post.title.toLowerCase().includes(search) ||
          post.category.toLowerCase().includes(search) ||
          post.author.name.toLowerCase().includes(search),
      )
      .map(toSummary)

    return HttpResponse.json(
      paginate(filtered, intParam(url, 'page', 1), intParam(url, 'pageSize', 9)),
    )
  }),

  http.get(api('/posts/:slug'), async ({ params }) => {
    await delay(LATENCY)
    const post = posts.find((p) => p.slug === params.slug)
    return post ? HttpResponse.json(post) : notFound('Post not found')
  }),

  http.get(api('/posts/:slug/related'), async ({ params }) => {
    await delay(LATENCY)
    const current = posts.find((p) => p.slug === params.slug)
    if (!current) return notFound('Post not found')
    const others = posts.filter((p) => p.slug !== current.slug && !p.featured)
    const sameCategory = others.filter((p) => p.category === current.category)
    const related = [...sameCategory, ...others.filter((p) => p.category !== current.category)]
    return HttpResponse.json(related.slice(0, 6).map(toSummary))
  }),

  http.get(api('/posts/:slug/comments'), async ({ params }) => {
    await delay(LATENCY)
    return HttpResponse.json(db.comments.filter((c) => c.postSlug === params.slug))
  }),

  http.post(api('/posts/:slug/comments'), async ({ params, request }) => {
    await delay(LATENCY)
    const slug = String(params.slug)
    if (!posts.some((p) => p.slug === slug)) return notFound('Post not found')

    const body = (await request.json()) as Partial<Omit<NewComment, 'postSlug'>>
    if (!body.name?.trim() || !body.text?.trim() || !isEmail(body.email)) {
      return badRequest('Name, a valid email and a comment are required.')
    }

    const parent = body.parentId ? db.comments.find((c) => c.id === body.parentId) : undefined
    const comment: Comment = {
      id: crypto.randomUUID(),
      postSlug: slug,
      parentId: parent?.id ?? null,
      replyTo: parent?.author.name,
      author: { name: body.name.trim(), avatar: '' },
      createdAt: new Date().toISOString(),
      text: body.text.trim(),
    }
    db.comments.push(comment)
    return HttpResponse.json(comment, { status: 201 })
  }),

  /* ---- Services ---------------------------------------------------------- */
  http.get(api('/services'), async () => {
    await delay(LATENCY)
    return HttpResponse.json(services)
  }),

  http.get(api('/services/:slug'), async ({ params }) => {
    await delay(LATENCY)
    const service = services.find((s) => s.slug === params.slug)
    return service ? HttpResponse.json(service) : notFound('Service not found')
  }),

  /* ---- Company ----------------------------------------------------------- */
  http.get(api('/team'), async () => {
    await delay(LATENCY)
    return HttpResponse.json(team)
  }),

  http.get(api('/testimonials'), async () => {
    await delay(LATENCY)
    return HttpResponse.json(testimonials)
  }),

  http.get(api('/clients'), async () => {
    await delay(LATENCY)
    return HttpResponse.json(clients)
  }),

  http.get(api('/awards'), async () => {
    await delay(LATENCY)
    return HttpResponse.json(awards)
  }),

  /* ---- Mutations --------------------------------------------------------- */
  http.post(api('/contact'), async ({ request }) => {
    await delay(LATENCY * 2)
    const body = (await request.json()) as Partial<ContactMessage>
    if (!body.name?.trim() || !body.message?.trim() || !isEmail(body.email)) {
      return badRequest('Name, a valid email and a message are required.')
    }
    return HttpResponse.json<MutationResult>(
      { success: true, message: "Thanks! We'll get back to you within one business day." },
      { status: 201 },
    )
  }),

  http.post(api('/newsletter'), async ({ request }) => {
    await delay(LATENCY * 2)
    const body = (await request.json()) as Partial<NewsletterSubscription>
    if (!isEmail(body.email)) return badRequest('Please enter a valid email address.')
    return HttpResponse.json<MutationResult>(
      { success: true, message: 'You are subscribed. Welcome aboard!' },
      { status: 201 },
    )
  }),
]

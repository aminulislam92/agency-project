/* Shared domain types — the contract between the UI and the API (MSW mocks or a real backend). */

export interface Author {
  name: string
  role?: string
  avatar: string
}

export interface Paginated<T> {
  items: T[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}

/* ---- Projects ----------------------------------------------------------- */
export const PROJECT_CATEGORIES = [
  'Web Design',
  'Graphic Design',
  'Branding',
  'UI / UX',
  'Motion Design',
] as const
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]

export interface Project {
  id: string
  slug: string
  title: string
  image: string
  categories: ProjectCategory[]
  /** Free-form labels shown under the title, e.g. "NFT / Graphic Design / Art" */
  tags: string[]
  featured: boolean
}

export interface ProjectsQuery {
  category?: ProjectCategory | 'all'
  page?: number
  pageSize?: number
  /** Only the Home "Featured Projects" selection */
  featured?: boolean
}

/* ---- Blog ----------------------------------------------------------------- */
export const POST_CATEGORIES = [
  'Business',
  'Digital',
  'Design',
  'Marketing',
  'Processes & Tools',
  'Startups',
  'Strategy',
  'Technology',
  'Tips & Advice',
] as const
export type PostCategory = (typeof POST_CATEGORIES)[number]

export type PostBlock =
  | { type: 'lead'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'video'; image: string; alt: string; videoUrl?: string }
  | { type: 'quote'; text: string; author: Author }
  | { type: 'list'; variant: 'pros' | 'cons'; title: string; items: string[] }

export interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  category: PostCategory
  /** ISO 8601 */
  publishedAt: string
  /** Card thumbnail */
  image: string
  /** Full-width header image on the details page (falls back to `image`) */
  cover?: string
  featured: boolean
  author: Author
  readTime: number
  likes: number
  commentsCount: number
  shares: number
  tags: string[]
  content: PostBlock[]
}

export type PostSummary = Omit<Post, 'content'>

export interface PostsQuery {
  category?: PostCategory | 'all'
  page?: number
  pageSize?: number
  search?: string
  /** Only editor-picked posts (Home "Latest From Our Blog") */
  featured?: boolean
}

export interface Comment {
  id: string
  postSlug: string
  parentId: string | null
  author: Author
  /** ISO 8601 */
  createdAt: string
  text: string
  /** Name of the person being replied to, shown as an @mention */
  replyTo?: string
}

export interface NewComment {
  postSlug: string
  /** Thread root the reply is attached to (one level of nesting) */
  parentId?: string | null
  /** Name shown as the @mention (the comment actually replied to) */
  replyTo?: string
  name: string
  email: string
  text: string
}

/* ---- Services -------------------------------------------------------------- */
export type ServiceIcon =
  'software' | 'integration' | 'mobile' | 'analytics' | 'testing' | 'management'

export interface Service {
  id: string
  slug: string
  title: string
  excerpt: string
  icon: ServiceIcon
  /** Intro paragraph on the details page */
  description: string
}

/* ---- People / social proof ---------------------------------------------- */
export interface SocialLinks {
  facebook?: string
  instagram?: string
  twitter?: string
  linkedin?: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  photo: string
  socials: SocialLinks
}

export type ClientLogoId = 'logo' | 'cubes' | 'logoipsum-outline' | 'd-mark' | 'slash' | 'arrow'

export interface Client {
  id: string
  name: string
  logo: ClientLogoId
  url?: string
}

export interface Testimonial {
  id: string
  quote: string
  author: Author
  /** Large photo shown next to the quote (Home / Services) */
  photo: string
  company: ClientLogoId
  rating: number
  socials?: SocialLinks
}

export type AwardLogoId = 'webby' | 'cssda' | 'awwwards' | 'fwa'

export interface Award {
  id: string
  name: string
  caption: string
  logo: AwardLogoId
}

/* ---- Mutations ------------------------------------------------------------ */
export interface ContactMessage {
  name: string
  email: string
  message: string
  service?: string
  phone?: string
}

export interface NewsletterSubscription {
  email: string
  topics?: string[]
}

export interface MutationResult {
  success: boolean
  message: string
}

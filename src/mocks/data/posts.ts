import astronautCover from '@/assets/images/blog/astronaut-cover.webp'
import astronautRing from '@/assets/images/blog/astronaut-ring.webp'
import businessSkyscraper from '@/assets/images/blog/business-skyscraper.webp'
import developerCode from '@/assets/images/blog/developer-code.webp'
import girlHeadphones from '@/assets/images/blog/girl-headphones.webp'
import handMouse from '@/assets/images/blog/hand-mouse.webp'
import laptopGradient from '@/assets/images/blog/laptop-gradient.webp'
import laptopTyping from '@/assets/images/blog/laptop-typing.webp'
import phoneCharger from '@/assets/images/blog/phone-charger.webp'
import smartwatch from '@/assets/images/blog/smartwatch.webp'
import smartwatchBox from '@/assets/images/blog/smartwatch-box.webp'
import tabletDrawing from '@/assets/images/blog/tablet-drawing.webp'
import whiteKeyboard from '@/assets/images/blog/white-keyboard.webp'
import womanLaptop from '@/assets/images/blog/woman-laptop.webp'
import type { Author, Post, PostBlock, PostCategory } from '@/types'
import { people } from './people'

const HOUR = 60 * 60 * 1000
const hoursAgo = (hours: number) => new Date(Date.now() - hours * HOUR).toISOString()

/** Shared article body (the design has one post layout). */
const articleBody: PostBlock[] = [
  {
    type: 'lead',
    text: 'Est quis sit phasellus proin proin fringilla eu quis. Placerat praesent blandit urna eu pellentesque dictum. Aliquam duis quam interdum quis. Urna, rutrum aenean lacus phasellus. Ipsum, ac porttitor lacus orci, cras lacus, quis leo.',
  },
  { type: 'heading', text: 'Paragraph Title' },
  {
    type: 'paragraph',
    text: 'Purus ornare nisl est nec. Nunc, enim tellus pretium viverra quisque id in metus volutpat. Urna eget velit venenatis, commodo eget massa. Magna donec dictum cras nullam platea. Diam rhoncus massa lectus pellentesque tristique. Amet commodo, egestas vitae bibendum. Volutpat elit condimentum integer tortor porttitor justo vel lobortis risus. Lacinia pellentesque fermentum tellus orci mauris, velit duis eget. Commodo justo, hac ligula molestie felis, iaculis. Vitae dui at ante orci, dictum fusce. Urna, sed urna fringilla faucibus euismod aliquet nec. Quis libero, fermentum amet eu, condimentum auctor. Sit vel ipsum sem tempus gravida et. Scelerisque blandit orci, est quis. Nisi, tellus amet est nascetur habitant faucibus ornare et vivamus.',
  },
  {
    type: 'video',
    image: tabletDrawing,
    alt: 'Designer sketching on a tablet',
    videoUrl: 'https://www.youtube-nocookie.com/embed/ScMzIvxBSi4',
  },
  {
    type: 'paragraph',
    text: 'Tempor donec aliquam est, a. Sit arcu tellus pharetra, bibendum hendrerit arcu, sed. Scelerisque dui enim libero sit ac sed lacus lectus. Quam in iaculis scelerisque feugiat nibh mi. Maecenas posuere lobortis praesent iaculis sagittis. Egestas vel at praesent ipsum pretium faucibus adipiscing gravida feugiat. Lacus, rhoncus velit at non nunc, quam urna, phasellus facilisis. Cursus elit posuere amet tortor at. Mi tristique congue vulputate eget in pellentesque tincidunt. In viverra est id nibh. Nunc tellus ultrices magna turpis. Viverra est morbi posuere dapibus nisi habitasse. Id tristique cursus vel metus.',
  },
  {
    type: 'quote',
    text: 'Sollicitudin eget massa, elementum, purus nec fermentum vitae, elementum. Tincidunt vulputate lorem cursus id. Dictum tincidunt mi ornare tristique. Id sit elit pulvinar eu. Tempus vel, mauris sed proin aliquet vulputate cras est. Ut ornare eget a viverra.',
    author: people.janeCooper,
  },
  {
    type: 'paragraph',
    text: 'Pellentesque laoreet neque ut dictumst fames scelerisque. In malesuada orci dapibus risus tellus, amet, ultrices sagittis a. Turpis vel tincidunt tristique maecenas cursus tortor, suscipit ut. Ullamcorper at faucibus dolor tortor suspendisse suscipit senectus convallis aliquam. At orci amet facilisi nunc mi vitae iaculis diam a. Mauris venenatis sed purus cursus torte.',
  },
  { type: 'heading', text: 'Paragraph Title 2' },
  {
    type: 'paragraph',
    text: 'Praesent sed pulvinar posuere nisl tincidunt. Iaculis sit quam magna congue. Amet vel non aliquet habitasse. Egestas erat odio et, eleifend turpis etiam blandit interdum. Nec augue ut senectus quisque diam quis. At augue accumsan, in bibendum. A eget et, eget quisque egestas netus vel. Velit, aliquet turpis convallis ullamcorper. Scelerisque sagittis condimentum pretium in vitae etiam lacinia quis amet. Porttitor consequat, sollicitudin vivamus pharetra nibh faucibus neque, viverra. Praesent sed lacus vitae.',
  },
  {
    type: 'list',
    variant: 'pros',
    title: 'Pros',
    items: [
      'A eu, ac nunc, volutpat. Augue enim ac justo, at elementum, arcu.',
      'At sodales quam felis ullamcorper iaculis tristique. Felis, etiam felis pellentesque sit neque.',
      'Porta ipsum quis lacus eu ipsum mattis sit quis. Massa, massa lectus porttitor laoreet ultricies odio fermentum arcu quam.',
      'Accumsan arcu neque, nisl, pellentesque fames justo consequat blandit lacus. Eget odio vel nulla vel.',
      'Diam ac phasellus est, eu urna purus blandit aliquam. Vitae accumsan et pellentesque diam in.',
      'Tellus arcu, lectus tincidunt neque nunc. Bibendum lacus, molestie ultrices sed arcu.',
    ],
  },
  {
    type: 'list',
    variant: 'cons',
    title: 'Cons',
    items: [
      'Donec maecenas justo, et tortor quam elementum pharetra velit. Auctor dictum purus sollicitudin et quam vehicula amet lacus, integer.',
      'Mi elit nibh erat facilisis. Volutpat eget malesuada mi in.',
      'Tincidunt iaculis eleifend arcu egestas. Sit gravida vestibulum quam scelerisque.',
      'Ornare elit, vel, ullamcorper nunc nulla pellentesque ut varius. Vitae tortor nulla a turpis erat fermentum, rhoncus.',
      'Gravida cursus nunc habitant aliquet lacus. Tempus, interdum nullam non quam ipsum ultricies ac.',
    ],
  },
  { type: 'heading', text: 'Conclusion' },
  {
    type: 'paragraph',
    text: 'Venenatis faucibus platea gravida amet sed sed urna volutpat. Aliquam neque, mi, justo odio semper. Egestas potentiquis neque nunc, rhoncus hendrerit. Viverra gravida pretium dolor eget placerat morbi proin eget. Vestibulum vitae ultrices vel sed sit quis. Ac quis diam at nulla libero. Turpis duis magna tellus condimentum.',
  },
  {
    type: 'paragraph',
    text: 'Velit parturient tellus tellus, congue pulvinar tellus viverra. In cum massa mattis ac. Amet vitae massa ut mi etiam. Auctor aliquam tristique felis donec eu sit nisi. Accumsan mauris eget convallis mattis sed etiam scelerisque.',
  },
]

interface Seed {
  title: string
  category: PostCategory
  publishedAt: string
  image: string
  author: Author
  cover?: string
  featured?: boolean
  likes?: number
  commentsCount?: number
  shares?: number
}

const seeds: Seed[] = [
  // Home "Latest From Our Blog" (featured)
  {
    title: "A study on smartwatch design qualities and people's preferences",
    category: 'Digital',
    publishedAt: hoursAgo(12),
    image: smartwatch,
    author: people.jeromeBell,
    featured: true,
  },
  {
    title: 'Brand analysis: second step to the brand identity',
    category: 'Design',
    publishedAt: hoursAgo(26),
    image: astronautRing,
    author: people.annetteBlack,
    featured: true,
  },
  {
    title: 'How to check the website before releasing it?',
    category: 'Tips & Advice',
    publishedAt: '2021-05-24T10:00:00.000Z',
    image: laptopGradient,
    author: people.marvinMcKinney,
    featured: true,
  },
  // Blog grid (design)
  {
    title: 'This Long-Awaited Technology May Finally Change the World',
    category: 'Technology',
    publishedAt: hoursAgo(12),
    image: laptopGradient,
    cover: astronautCover,
    author: people.albertFlores,
    likes: 8,
    commentsCount: 4,
    shares: 2,
  },
  {
    title: '5 Bad Landing Page Examples & How We Would Fix Them',
    category: 'Business',
    publishedAt: '2021-05-19T09:00:00.000Z',
    image: girlHeadphones,
    author: people.jeromeBellAlt,
  },
  {
    title: 'Why UX Design Matters and How it Affects Ranking',
    category: 'Digital',
    publishedAt: '2021-09-28T09:00:00.000Z',
    image: laptopTyping,
    author: people.jeromeBellAlt,
  },
  {
    title: 'This Week in Search: New Limits and Exciting Features',
    category: 'Business',
    publishedAt: '2021-09-16T09:00:00.000Z',
    image: developerCode,
    author: people.ralphEdwards,
  },
  {
    title: 'Five Effective Lead Generation Techniques For Your Business',
    category: 'Processes & Tools',
    publishedAt: hoursAgo(12),
    image: handMouse,
    author: people.estherHoward,
  },
  {
    title: 'Inclusive Marketing: Why and How Does it Work?',
    category: 'Digital',
    publishedAt: '2021-10-09T09:00:00.000Z',
    image: womanLaptop,
    author: people.janeCooper,
  },
  {
    title: 'How Agile is Your Forecasting Process?',
    category: 'Marketing',
    publishedAt: '2021-04-02T09:00:00.000Z',
    image: phoneCharger,
    author: people.albertFlores,
  },
  {
    title: 'Your Guide to Optimising A JavaScript-enabled Website',
    category: 'Processes & Tools',
    publishedAt: '2021-09-03T09:00:00.000Z',
    image: whiteKeyboard,
    author: people.ralphEdwards,
  },
  {
    title: "A Study on Smartwatch Design Qualities and People's Preferences",
    category: 'Startups',
    publishedAt: '2021-09-10T09:00:00.000Z',
    image: smartwatchBox,
    author: people.estherHoward,
  },
  {
    title: 'Building a Business Strategy That Scales',
    category: 'Strategy',
    publishedAt: '2021-08-21T09:00:00.000Z',
    image: businessSkyscraper,
    author: people.ralphEdwards,
  },
]

/* Additional archive posts so the blog has four pages. */
const archive: [string, PostCategory][] = [
  ['The Ultimate Guide to Remote Design Sprints', 'Processes & Tools'],
  ['Why Brand Consistency Matters More Than Ever', 'Marketing'],
  ['Designing Accessible Color Systems', 'Design'],
  ['From MVP to Market: Lessons From 50 Launches', 'Startups'],
  ['How We Estimate Software Projects', 'Business'],
  ['Micro-interactions That Delight Users', 'Design'],
  ['The State of Mobile Commerce', 'Digital'],
  ['Writing Better Product Requirements', 'Processes & Tools'],
  ['Choosing the Right Tech Stack in 2021', 'Technology'],
  ['A Practical Guide to SEO for Startups', 'Marketing'],
  ['Running Effective Stakeholder Workshops', 'Strategy'],
  ['Design Tokens: A Primer', 'Design'],
  ['What Investors Look for in a Pitch Deck', 'Startups'],
  ['Measuring the ROI of UX', 'Business'],
  ['Building a Culture of Experimentation', 'Strategy'],
  ['Ten Tips for Faster Websites', 'Tips & Advice'],
  ['Content Strategy for B2B Brands', 'Marketing'],
  ['The Future of Low-Code Platforms', 'Technology'],
  ['Onboarding Flows That Convert', 'Digital'],
  ['How to Run a Usability Test on a Budget', 'Tips & Advice'],
  ['Scaling Design Systems Across Teams', 'Design'],
  ['Data-Driven Product Roadmaps', 'Business'],
  ['Why Your Startup Needs a Brand Story', 'Startups'],
]

const archiveImages = [
  girlHeadphones,
  laptopTyping,
  developerCode,
  handMouse,
  womanLaptop,
  phoneCharger,
  whiteKeyboard,
  smartwatchBox,
  businessSkyscraper,
]
const archiveAuthors = [
  people.jeromeBellAlt,
  people.ralphEdwards,
  people.estherHoward,
  people.janeCooper,
  people.albertFlores,
]

const archiveSeeds: Seed[] = archive.map(([title, category], index) => ({
  title,
  category,
  publishedAt: new Date(
    Date.UTC(2021, 7 - Math.floor(index / 3), 28 - ((index * 3) % 27)),
  ).toISOString(),
  image: archiveImages[index % archiveImages.length] ?? girlHeadphones,
  author: archiveAuthors[index % archiveAuthors.length] ?? people.ralphEdwards,
}))

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const posts: Post[] = [...seeds, ...archiveSeeds].map((seed, index) => ({
  id: `post-${index + 1}`,
  slug: slugify(seed.title),
  title: seed.title,
  excerpt: articleBody[0]?.type === 'lead' ? articleBody[0].text : '',
  category: seed.category,
  publishedAt: seed.publishedAt,
  image: seed.image,
  cover: seed.cover ?? astronautCover,
  featured: seed.featured ?? false,
  author: seed.author,
  readTime: 5,
  likes: seed.likes ?? 3 + (index % 9),
  commentsCount: seed.commentsCount ?? 4,
  shares: seed.shares ?? index % 4,
  tags: ['lifestyle', 'tech', 'business'],
  content: articleBody,
}))

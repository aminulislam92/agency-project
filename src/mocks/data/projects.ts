import threeDShape from '@/assets/images/projects/3d-shape.webp'
import astronautNeon from '@/assets/images/projects/astronaut-neon.webp'
import blueWhale from '@/assets/images/projects/blue-whale.webp'
import explosion from '@/assets/images/projects/explosion.webp'
import mannequinHands from '@/assets/images/projects/mannequin-hands.webp'
import neonBody from '@/assets/images/projects/neon-body.webp'
import plasterSculpture from '@/assets/images/projects/plaster-sculpture.webp'
import popArtHeads from '@/assets/images/projects/pop-art-heads.webp'
import sunglassesHead from '@/assets/images/projects/sunglasses-head.webp'
import type { Project, ProjectCategory } from '@/types'

interface Seed {
  title: string
  image: string
  categories: ProjectCategory[]
  tags: string[]
}

/* The first six match the Portfolio design; the rest fill pages 2–4. */
const seeds: Seed[] = [
  {
    title: 'Astronaut & Flashing Neon Lights',
    image: astronautNeon,
    categories: ['Motion Design', 'Graphic Design'],
    tags: ['3D', 'Motion Design', 'Illustration'],
  },
  {
    title: 'Scene of Sunglasses & Headphone on Human Head',
    image: sunglassesHead,
    categories: ['Graphic Design', 'Branding', 'Motion Design'],
    tags: ['NFT', 'Graphic Design', 'Art', 'Identity', 'Motion Design'],
  },
  {
    title: 'Plaster Antique Sculpture in a Pop Art Style',
    image: plasterSculpture,
    categories: ['Graphic Design', 'Branding'],
    tags: ['Pop Art', 'Graphic Design', 'Branding'],
  },
  {
    title: 'Big Blue Whale Shape',
    image: blueWhale,
    categories: ['UI / UX', 'Graphic Design'],
    tags: ['Low Poly', '3D', 'UI / UX'],
  },
  {
    title: '3D Shape Illustration',
    image: threeDShape,
    categories: ['Motion Design', 'Web Design'],
    tags: ['3D', 'Illustration', 'Web Design'],
  },
  {
    title: 'Mannequin Hands Holding Phone',
    image: mannequinHands,
    categories: ['Web Design', 'UI / UX'],
    tags: ['Mobile', 'UI / UX', 'Web Design'],
  },
  {
    title: 'Particle Body in Deep Space',
    image: neonBody,
    categories: ['Motion Design', 'Branding'],
    tags: ['Particles', 'Motion Design'],
  },
  {
    title: 'Exploding Data Sphere',
    image: explosion,
    categories: ['Web Design', 'Motion Design'],
    tags: ['Data Viz', 'Web Design'],
  },
  {
    title: 'Pop Art Portrait Series',
    image: popArtHeads,
    categories: ['Branding', 'Graphic Design'],
    tags: ['Identity', 'Branding'],
  },
]

const extraTitles = [
  'Neon Synthwave Landing Page',
  'Brand Identity for a Music Label',
  'Low-Poly Mascot System',
  'Glassmorphism Dashboard Kit',
  'Fintech Mobile Onboarding',
  'Animated Product Launch Reel',
  'Retro Futurism Poster Set',
  'Ecommerce Checkout Redesign',
  'Generative Pattern Library',
  'Museum Wayfinding Identity',
  'Smart Home App UI',
  'Kinetic Typography Teaser',
  'Fashion Lookbook Website',
  'SaaS Marketing Site',
  'Isometric Icon Family',
]

/** Shown in the Home masonry grid in this order: tall, square, square, wide. */
const FEATURED_ORDER = [
  'Particle Body in Deep Space',
  'Pop Art Portrait Series',
  'Big Blue Whale Shape',
  'Exploding Data Sphere',
]

export const projects: Project[] = [
  ...seeds,
  ...extraTitles.map((title, index) => {
    const base = seeds[index % seeds.length]
    if (!base) throw new Error('seed missing')
    return { ...base, title }
  }),
].map((seed, index) => ({
  id: `p${index + 1}`,
  slug: seed.title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, ''),
  ...seed,
  featured: FEATURED_ORDER.includes(seed.title),
}))

export const featuredProjects: Project[] = FEATURED_ORDER.flatMap(
  (title) => projects.find((project) => project.title === title) ?? [],
)

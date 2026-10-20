export interface NavItem {
  label: string
  to: string
}

/** Main navigation (after the "Services" dropdown). */
export const MAIN_NAV: NavItem[] = [
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export const FOOTER_NAV: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Blog', to: '/blog' },
]

export const LEGAL_NAV: NavItem[] = [
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'Privacy Policy', to: '/privacy' },
]

export const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://www.facebook.com' },
  { label: 'Linkedin', href: 'https://www.linkedin.com' },
  { label: 'Twitter', href: 'https://twitter.com' },
  { label: 'Instagram', href: 'https://www.instagram.com' },
] as const

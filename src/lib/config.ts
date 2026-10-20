/** Base URL of the REST API (no trailing slash). */
export const API_URL = (import.meta.env.VITE_API_URL ?? '/api').replace(/\/$/, '')

/**
 * MSW is on by default in development (opt out with VITE_ENABLE_MSW=false)
 * and off in production builds (opt in with VITE_ENABLE_MSW=true for a static demo).
 */
export const MOCKS_ENABLED = import.meta.env.DEV
  ? import.meta.env.VITE_ENABLE_MSW !== 'false'
  : import.meta.env.VITE_ENABLE_MSW === 'true'

export const SITE_NAME = 'Silicon'
export const CONTACT_EMAIL = 'coderamin92@gmail.com'
export const CONTACT_PHONE = '(406) 555-0120'
export const CONTACT_PHONE_INTL = '+880 1740 855-599'
export const CONTACT_ADDRESS = '11 Polashgor Rd, West Polashgor, Jamalpur 2000'

/** Agency promo video (Home hero, About video section) */
export const PROMO_VIDEO_URL = 'https://www.youtube.com/embed/WiQhl9hfki0?si=Df0VAEUWgiYdCRn5'

/** Site credit shown in the copyright line */
export const AUTHOR_NAME = 'Md. Aminul Islam'
export const AUTHOR_URL = 'https://www.facebook.com/aminulislam.developer'

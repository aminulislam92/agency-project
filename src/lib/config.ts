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
export const CONTACT_EMAIL = 'example@gmail.com'
export const CONTACT_PHONE = '(406) 555-0120'
export const CONTACT_ADDRESS = '2464 Royal Ln. Mesa, New Jersey 45463'

import { AUTHOR_NAME, AUTHOR_URL } from '@/lib/config'

/** "© 2026. All rights reserved by Md. Aminul Islam" with a link to the author. */
export function Copyright() {
  return (
    <>
      © {new Date().getFullYear()}. All rights reserved by{' '}
      <a
        href={AUTHOR_URL}
        target="_blank"
        rel="noopener"
        className="rounded-sm font-semibold text-primary transition-colors hover:text-primary-hover hover:underline"
      >
        {AUTHOR_NAME}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </>
  )
}

const relative = new Intl.RelativeTimeFormat('en', { numeric: 'always' })
const absolute = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

const MINUTE = 60_000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

const commentDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' })
const commentTime = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  hourCycle: 'h23',
})

/** "4 min ago" / "16 hours ago" within a day, otherwise "September 9 at 12:48" (comment style). */
export function formatCommentDate(iso: string, now = Date.now()): string {
  const date = new Date(iso)
  const diff = now - date.getTime()
  if (diff >= 0 && diff < MINUTE) return 'just now'
  if (diff >= 0 && diff < HOUR) return `${Math.round(diff / MINUTE)} min ago`
  if (diff >= 0 && diff < DAY) return relative.format(-Math.round(diff / HOUR), 'hour')
  return `${commentDate.format(date)} at ${commentTime.format(date)}`
}

/** "12 hours ago" / "1 day ago" for the last week, otherwise "May 24, 2021". */
export function formatPostDate(iso: string, now = Date.now()): string {
  const date = new Date(iso)
  const diff = now - date.getTime()
  if (diff >= 0 && diff < 7 * DAY) {
    if (diff < HOUR) return relative.format(-Math.max(1, Math.round(diff / MINUTE)), 'minute')
    if (diff < DAY) return relative.format(-Math.round(diff / HOUR), 'hour')
    return relative.format(-Math.round(diff / DAY), 'day')
  }
  return absolute.format(date)
}

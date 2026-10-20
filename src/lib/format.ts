const relative = new Intl.RelativeTimeFormat('en', { numeric: 'always' })
const absolute = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

const MINUTE = 60_000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

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

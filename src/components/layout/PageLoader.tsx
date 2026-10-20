import { LogoMark } from '@/components/ui/Logo'

/** Full-screen fallback while the first route chunk loads. */
export function PageLoader() {
  return (
    <div className="grid min-h-screen place-items-center bg-surface" role="status">
      <LogoMark className="size-14 animate-pulse" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectThemeMode, systemThemeChanged } from './themeSlice'

/** Mirrors the Redux theme onto <html class="dark"> and follows OS changes until the user chooses. */
export function useThemeSync() {
  const mode = useAppSelector(selectThemeMode)
  const dispatch = useAppDispatch()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark')
  }, [mode])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event: MediaQueryListEvent) => {
      dispatch(systemThemeChanged(event.matches ? 'dark' : 'light'))
    }
    media.addEventListener('change', onChange)
    return () => {
      media.removeEventListener('change', onChange)
    }
  }, [dispatch])
}

import { useThemeSync } from './useThemeSync'

/** Renderless component that keeps <html class="dark"> in sync with the store. */
export function ThemeSync() {
  useThemeSync()
  return null
}

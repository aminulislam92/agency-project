import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { Toggle } from '@/components/ui/Toggle'
import { selectThemeMode, setTheme } from '@/features/theme/themeSlice'

export function ThemeToggle({ className }: { className?: string }) {
  const mode = useAppSelector(selectThemeMode)
  const dispatch = useAppDispatch()

  return (
    <Toggle
      label="Dark mode"
      offLabel="Light"
      onLabel="Dark"
      checked={mode === 'dark'}
      onChange={(dark) => dispatch(setTheme(dark ? 'dark' : 'light'))}
      className={className}
    />
  )
}

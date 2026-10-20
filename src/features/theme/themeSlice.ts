import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type ThemeMode = 'light' | 'dark'

interface ThemeState {
  mode: ThemeMode
  /** "user" once the visitor picked a theme; until then we follow the OS setting. */
  source: 'system' | 'user'
}

export const THEME_STORAGE_KEY = 'silicon-theme'

function readStoredTheme(): ThemeMode | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

export function getSystemTheme(): ThemeMode {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function getInitialState(): ThemeState {
  const stored = readStoredTheme()
  return stored ? { mode: stored, source: 'user' } : { mode: getSystemTheme(), source: 'system' }
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: getInitialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload
      state.source = 'user'
    },
    toggleTheme(state) {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
      state.source = 'user'
    },
    systemThemeChanged(state, action: PayloadAction<ThemeMode>) {
      if (state.source === 'system') state.mode = action.payload
    },
  },
  selectors: {
    selectThemeMode: (state) => state.mode,
  },
})

export const { setTheme, toggleTheme, systemThemeChanged } = themeSlice.actions
export const { selectThemeMode } = themeSlice.selectors
export default themeSlice

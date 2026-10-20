import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import themeSlice, { setTheme, THEME_STORAGE_KEY, toggleTheme } from '@/features/theme/themeSlice'
import { api } from '@/services/api'

/* Persist explicit theme choices to localStorage */
const listener = createListenerMiddleware()
listener.startListening({
  matcher: isAnyOf(setTheme, toggleTheme),
  effect: (_action, listenerApi) => {
    const { mode } = (listenerApi.getState() as { theme: { mode: string } }).theme
    try {
      localStorage.setItem(THEME_STORAGE_KEY, mode)
    } catch {
      /* storage unavailable (private mode) — theme still works for this session */
    }
  },
})

export const store = configureStore({
  reducer: {
    [themeSlice.reducerPath]: themeSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().prepend(listener.middleware).concat(api.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

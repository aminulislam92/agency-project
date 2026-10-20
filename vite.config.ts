import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { msw } from 'msw/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // `worker-only` serves/emits mockServiceWorker.js; setup lives in src/mocks/browser.ts
  plugins: [react(), tailwindcss(), msw({ mode: 'worker-only' })],
  build: {
    rolldownOptions: {
      output: {
        // Long-term-cacheable vendor chunks
        codeSplitting: {
          groups: [
            {
              name: 'react',
              test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 30,
            },
            { name: 'router', test: /node_modules[\\/]react-router[\\/]/, priority: 20 },
            {
              name: 'redux',
              test: /node_modules[\\/](@reduxjs|react-redux|redux|immer|reselect)[\\/]/,
              priority: 20,
            },
            {
              name: 'motion',
              test: /node_modules[\\/](motion|framer-motion|motion-dom|motion-utils)[\\/]/,
              priority: 20,
            },
            { name: 'forms', test: /node_modules[\\/](zod|react-hook-form)[\\/]/, priority: 20 },
          ],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

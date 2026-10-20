/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL for the REST API, e.g. "/api" or "https://api.example.com/api" */
  readonly VITE_API_URL?: string
  /** "true" | "false" — see .env.example */
  readonly VITE_ENABLE_MSW?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

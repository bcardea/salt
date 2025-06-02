/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SALT_SERVER_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NEXT_PUBLIC_SANITY_API_VERSION: string;
  readonly NEXT_PUBLIC_SANITY_DATASET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

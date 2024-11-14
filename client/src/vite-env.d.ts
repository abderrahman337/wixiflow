/// <reference types="vite/client" />
  interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_BACKEND_URL: string = "http://localhost:8888";
  // Add other env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

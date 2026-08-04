import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// `base` is './' so the static build works on GitHub Pages / any subpath when deployed.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  // Read PORT off globalThis rather than `process` so this stays typed without @types/node.
  server: { port: Number((globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.PORT) || 5173 },
})

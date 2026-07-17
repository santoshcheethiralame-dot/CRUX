import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// `base` is './' so the static build works on GitHub Pages / any subpath when deployed.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})

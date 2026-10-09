import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base` controls the public path prefix:
//   '/'          → custom domain / user site (Cloudflare, frkazligeza.com)
//   '/KAZ-TEMP/' → GitHub Pages project site (The-Mars-Guy/KAZ-TEMP)
// The deploy workflow sets VITE_BASE; local dev/build defaults to '/'.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/',
  server: {
    host: true,
    port: 4173,
  },
})
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // For GitHub Pages, use '/AI-filtering/'. For Vercel, use '/' or remove this line
  base: process.env.VERCEL ? '/' : '/AI-filtering/',
  plugins: [react(), tailwindcss(),],
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: This MUST match your repo name for GitHub Pages!!!
export default defineConfig({
  plugins: [react()],
  base: '/spacex-dashboard/'
})

import { defineConfig } from 'vite' // Force restart React Router
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

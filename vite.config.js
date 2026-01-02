import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  // Expose dev and preview servers on local network for testing on devices
  server: {
    host: true, // 0.0.0.0
    port: 5173,
  },
  preview: {
    host: true, // 0.0.0.0
    port: 4173,
  },
})
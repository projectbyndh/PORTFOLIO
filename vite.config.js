import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://apit.ndhtechnologies.com',
        changeOrigin: true,
        secure: true,
      },
      '/uploads': {
        target: 'https://apit.ndhtechnologies.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  preview: {
    host: true,
    port: 4173,
  }
})
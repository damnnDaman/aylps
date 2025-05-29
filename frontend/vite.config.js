import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    proxy: {
      // Proxy any request that starts with /airports
      '/api/flights': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        secure: false,
        // Optional: if your backend route is exactly /flight/:code, no rewrite needed
        // rewrite: (path) => path.replace(/^\/flight/, '/flight')
      },
      '/airports': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        // Optional: if your backend route is exactly /airports/:code, no rewrite needed
        // rewrite: (path) => path.replace(/^\/airports/, '/airports')
      },
      '/auth/signup': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      
    },
  },
})

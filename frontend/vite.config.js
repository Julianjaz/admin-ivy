import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  preview: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    allowedHosts: [
      'admin-ivy-production-2f2e.up.railway.app',
      '.railway.app',
      'localhost'
    ]
  }
}
)

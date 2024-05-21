import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '192.168.0.104',
    
    proxy: {
      '/api/v1': 'http://localhost:3000'
    }
  },
  plugins: [react()]
})

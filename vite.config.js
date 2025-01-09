import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({
    jsxRuntime: 'classic'
  })],
  server: {
    port: 3001,
    strictPort: false,
    host: true,
    proxy: {
      '/api': {
        target: 'https://api.deepseek.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/v1')
      }
    },
    hmr: {
      protocol: 'wss',
      host: process.env.VITE_HOST
    }
  },
  build: {
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    }
  },
  preview: {
    port: 3000,
    strictPort: true,
    host: true
  }
})

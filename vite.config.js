import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  hmr: true,
  server: {
    proxy: {
      '/socket.io': {
        target: 'http://localhost:5000/',
        ws: true,
      },
      '/api': {
        target: 'http://localhost:5000/',
      },
    },
  },
})

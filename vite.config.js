import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  hmr: true,
  server: {
    proxy: {
      '/socket.io': {
        target: 'https://subidha-home-services-server3792.glitch.me/',
        ws: true,
      },
      '/api': {
        target: 'https://subidha-home-services-server3792.glitch.me/',
      },
    },
  },
})

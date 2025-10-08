import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      // 🔹 Redirige /api al backend para evitar CORS en desarrollo
      '/api': {
        target: 'https://localhost:42168',
        changeOrigin: true,
        secure: false, // permite HTTPS local
      },
    },
  },
});

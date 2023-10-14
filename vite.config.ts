import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  devServer: {
    allowedHosts: 'all',
  },
  server: {
    port: 5173,
    proxy: {
      '/': 'http://104.248.24.125:8000/api/'
    },
    hot: true,
  },
});

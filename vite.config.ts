import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  devServer: {
    allowedHosts: 'all',
  },
  server: {
    port: 5173,
    http: true,
    hot: true,
  },
});

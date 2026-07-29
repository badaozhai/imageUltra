import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Tauri 打包时 frontendDist 指向 dist；dev 走 5175 端口
export default defineConfig({
  plugins: [react()],
  clearScreen: false,
  server: {
    port: 5175,
    strictPort: true,
    host: '127.0.0.1',
    // 浏览器开发模式的接口代理（正式打包走 tauri-plugin-http，无 CORS 问题不需要它）：
    // 设置页把接口地址填 http://127.0.0.1:5175/dev-proxy 即可在浏览器里直连测试
    proxy: {
      '/dev-proxy': {
        target: process.env.IMAGEULTRA_DEV_PROXY_TARGET || 'https://claudegpt.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev-proxy/, '')
      }
    }
  },
  build: {
    target: 'es2021',
    chunkSizeWarningLimit: 1200
  }
});

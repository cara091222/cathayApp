import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'


// https://vite.dev/config/
export default defineConfig({
  base: '/cathayApp/',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 確保 SCSS 能夠解析 @ 別名
        // Vite 的 resolve.alias 已經會自動處理，這裡只是確保配置正確
        // 加上這一行可以隱藏警告
        quietDeps: true,
        silenceDeprecations: ['import'], 
      },
    },
  },
  server: {
    host: '0.0.0.0', // 允許外部設備連接
    port: 8080, // 預設端口，可根據需要修改
    strictPort: false, // 如果端口被占用，自動嘗試下一個可用端口
    open: false, // 不自動打開瀏覽器
  },
})

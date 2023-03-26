import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // server: {
  //   proxy: {
  //     '/api': 'http://localhost:3000'
  //   }
  // }
  devServer: {
    port: 5173, // порт клиента
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // порт сервера
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})


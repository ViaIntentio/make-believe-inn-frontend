import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  base: './',
  server: {
    port: 8500,
    //host: '0.0.0.0', // Use if  need to expose
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      ':': fileURLToPath(new URL('./src/modules/', import.meta.url))
    }
  }
})

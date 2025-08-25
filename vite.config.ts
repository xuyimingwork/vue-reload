import { fileURLToPath, URL } from 'node:url'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({ 
      rollupTypes: true,
      tsconfigPath: './tsconfig.app.json'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    lib: {
      entry: [
        fileURLToPath(new URL('./src/index.ts', import.meta.url)),
        fileURLToPath(new URL('./src/index.compat.ts', import.meta.url)),
      ],
      formats: ['es'],
      fileName: (format, entry) => entry === 'index' ? `vue-reload.js`
        : entry === 'index.compat' ? 'vue-reload.compat.js'
        : `${entry}.js`,
    },
    rollupOptions: {
      external: ['vue']
    },
  }
})

import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./src', import.meta.url)),
      coverage: {
        exclude: [fileURLToPath(new URL('./src/index.compat.ts', import.meta.url))]
      }
    },
  }),
)

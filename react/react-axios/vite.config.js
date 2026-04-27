import { dirname, resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const name = 'axios';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rolldownOptions: {
      input: {
        main: resolve(import.meta.dirname, `${name}.html`)
      },
      output: {
        entryFileNames: `src/${name}.js`,
        assetFileNames: `src/assets/css/${name}.css`
      }
    }
  }
})
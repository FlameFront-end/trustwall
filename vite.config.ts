import path from 'path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

import inlinePublicAssets from './vite-plugin-inline-public'

export default defineConfig({
  plugins: [react(), viteSingleFile(), inlinePublicAssets()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
    },
  },
})

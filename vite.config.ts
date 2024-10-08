import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import manifest from './manifest.config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest }), svgr()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: `${__dirname}/src`,
      },
    ],
  },
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
  },
})

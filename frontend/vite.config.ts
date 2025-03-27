import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from "node:path";
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: 'Pockets',
      short_name: 'Pockets',
      description: 'Savings app',
      theme_color: '#163a87',
    },
  })],
  server: {
    proxy: {
      "/api/v1": "http://localhost:8083",
      "/oidc-config": "http://localhost:8083"
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

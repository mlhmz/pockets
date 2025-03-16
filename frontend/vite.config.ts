import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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

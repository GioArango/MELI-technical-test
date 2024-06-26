import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../server/public'
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@constants": path.resolve(__dirname, "src/constants/"),
      "@helpers": path.resolve(__dirname, "src/helpers/"),
      "@hooks": path.resolve(__dirname, "src/hooks/"),
      "@layouts": path.resolve(__dirname, "src/layouts/"),
      "@models": path.resolve(__dirname, "src/models/"),
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@router": path.resolve(__dirname, "src/router/"),
      "@sass": path.resolve(__dirname, "src/sass/"),
    }
  }
})

import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    // Ottimizzazioni per SEO e performance
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          i18n: ['react-i18next', 'i18next'],
        },
      },
    },
    // Compressione per migliorare i Core Web Vitals
    chunkSizeWarningLimit: 1000,
  },
  // Preconnect per migliorare le performance
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000',
    },
  },
});
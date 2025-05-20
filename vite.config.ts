import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  envPrefix: ['VITE_'], // Changed to use standard Vite env prefix
  build: {
    outDir: 'dist',
    // Copy the _redirects file to the build output
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
    copyPublicDir: true,
  },
});
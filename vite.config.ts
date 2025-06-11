import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    strictPort: true // This will make Vite fail if it can't get port 5173
  },
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
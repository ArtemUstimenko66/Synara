import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    ViteImageOptimizer({
      jpg: {
        quality: 50
      },
      png: {
        quality: 50
      }
    })
  ]
});


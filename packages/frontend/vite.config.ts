import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
// Removed import for vite-plugin-checker
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Removed checker plugin usage
    visualizer() as PluginOption,
  ],
  build: {
    chunkSizeWarningLimit: 1500,
    cssCodeSplit: true,
  },
});

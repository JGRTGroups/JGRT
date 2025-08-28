import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, 'dist/server'),
    lib: {
      entry: path.resolve(__dirname, 'server/index.ts'),
      name: 'server',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [], // Add any external dependencies here
    },
  },
});

import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, 'dist/server'),
    ssr: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'server/index.ts'),
      output: {
        entryFileNames: 'node-build.mjs',
        format: 'es',
      },
      external: ['express', 'path', 'dotenv', 'url'], // Add external dependencies
    },
  },
});

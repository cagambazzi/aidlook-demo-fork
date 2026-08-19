import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// Served from GitHub Pages at https://<user>.github.io/tessiu-demo/,
// so assets must be requested under that sub-path. Override with BASE_PATH
// when hosting elsewhere (e.g. BASE_PATH=/ for a root domain).
const basePath = process.env.BASE_PATH ?? '/tessiu-demo/';

const port = Number(process.env.PORT ?? 5173);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${process.env.PORT}"`);
}

export default defineConfig({
  base: basePath,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    // GitHub Pages "deploy from a branch" can only serve the repo root or
    // /docs, so the build output is committed there.
    outDir: path.resolve(import.meta.dirname, 'docs'),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: '0.0.0.0',
  },
  preview: {
    port,
    host: '0.0.0.0',
  },
});

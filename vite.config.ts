import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// Relative asset paths, so the bundle works under any sub-path without being
// rebuilt: /tessiu-demo/ on GitHub Pages today, a different repo name or a
// root domain later. Safe because the app renders from local state and has no
// client-side router, so every request resolves against the same index.html.
// Override with BASE_PATH if a build ever needs paths pinned to one origin.
const basePath = process.env.BASE_PATH ?? './';

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

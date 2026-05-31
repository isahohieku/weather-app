import path from 'path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.tsx',
    coverage: {
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.config.*',
        '**/types/**',
        '**/*.d.ts',
        'src/index.tsx',
        'src/components/ui/**', // Optional: if we don't want Shadcn components included
      ],
    },
  },
});

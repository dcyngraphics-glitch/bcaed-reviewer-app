import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    // Was 'jsdom', which is NOT a dependency of this project — it only resolved
    // by leaking in from the parent directory's node_modules. happy-dom is
    // installed and declared, so use it.
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.ts'],
  },
});
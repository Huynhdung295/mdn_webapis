import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    include: ['webapis/**/*.test.js'],
    globals: true,
    testTimeout: 10000,
  },
});

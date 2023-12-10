/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    setupFiles: ["./vitest.setup.ts"],
    environment: "jsdom",
    deps: {
      inline: ["vitest-canvas-mock"],
    },
    include: ["**/*.test.tsx"],
    globals: true,
    // For this config, check https://github.com/vitest-dev/vitest/issues/740
  },
});

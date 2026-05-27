import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

const storybookConfigDir = new URL("./.storybook", import.meta.url).pathname;

export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      {
        test: {
          name: "unit",
          environment: "jsdom",
          setupFiles: ["./src/test/setup.ts"],
          globals: true,
          include: ["src/**/*.test.{ts,tsx}"]
        }
      },
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: storybookConfigDir,
            storybookScript: "npm run storybook -- --no-open"
          })
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            provider: playwright({}),
            headless: true,
            instances: [{ browser: "chromium" }]
          }
        }
      }
    ]
  }
});

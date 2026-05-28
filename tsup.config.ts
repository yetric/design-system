import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: "dist",
  // CSS is built separately via `build:css` and shipped as dist/index.css
  // Consumers import it with: import "@yetric/ui/styles"
  esbuildOptions(options) {
    options.loader = { ...options.loader, ".css": "empty" };
  }
});

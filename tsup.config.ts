import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/components/*/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: "dist",
  // Peer deps must be external so consumers' copies are used
  external: ["react", "react-dom", "react/jsx-runtime", "@tanstack/react-table"],
  // CSS is built separately via `build:css` and shipped as dist/index.css
  // Consumers import it with: import "@yetric/ui/styles"
  esbuildOptions(options) {
    options.loader = { ...options.loader, ".css": "empty" };
    options.treeShaking = true;
  }
});

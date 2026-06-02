import { defineConfig } from "tsup";

export default defineConfig([
  // ── Main barrel ────────────────────────────────────────────────────────────
  // Full bundle with types and sourcemaps for the primary entry point.
  {
    entry: ["src/index.ts"],
    format: ["esm"],
    dts: true,
    sourcemap: true,
    clean: true,
    outDir: "dist",
    external: ["react", "react-dom", "react/jsx-runtime", "@tanstack/react-table"],
    esbuildOptions(options) {
      options.loader = { ...options.loader, ".css": "empty" };
      options.treeShaking = true;
    },
  },
  // ── Per-component subpath entries ──────────────────────────────────────────
  // Lightweight JS-only builds for consumers who want to import individual
  // components (e.g. `import { Button } from "@yetric/ui/button"`) and avoid
  // loading SSR-unsafe components like MapView in a server bundle.
  // Types are inherited from the main barrel's dist/index.d.ts.
  {
    entry: ["src/components/*/index.ts"],
    format: ["esm"],
    dts: false,
    sourcemap: false,
    clean: false,
    outDir: "dist/components",
    external: ["react", "react-dom", "react/jsx-runtime", "@tanstack/react-table"],
    esbuildOptions(options) {
      options.loader = { ...options.loader, ".css": "empty" };
      options.treeShaking = true;
    },
  },
]);

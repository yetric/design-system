// @ts-check
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";

export default tseslint.config(
  // Base TS recommended rules
  ...tseslint.configs.recommended,

  // React hooks rules
  {
    plugins: { "react-hooks": reactHooks },
    rules: reactHooks.configs.recommended.rules,
  },

  // Project-specific overrides
  {
    rules: {
      // Allow explicit `any` in stories and test files
      "@typescript-eslint/no-explicit-any": "warn",
      // Unused vars: ignore underscore-prefixed
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // Allow empty interfaces (common in component prop types)
      "@typescript-eslint/no-empty-object-type": "off",
      // TanStack Table triggers react-hooks/incompatible-library (false positive)
      "react-hooks/incompatible-library": "warn",
      // MultiSelect reads containerRef.current in render for sizing (intentional)
      "react-hooks/refs": "warn",
    },
  },

  // Stories use hooks inside `render` functions — valid in Storybook but unknown to ESLint
  {
    files: ["**/*.stories.tsx", "**/*.stories.ts"],
    rules: {
      "react-hooks/rules-of-hooks": "off",
    },
  },

  // Ignore generated / third-party dirs
  {
    ignores: ["dist/**", "storybook-static/**", "node_modules/**", "*.config.*"],
  }
);

// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  integrations: [
    starlight({
      title: "@yetric/ui",
      description:
        "A practical React component library for modern and AI-native applications.",
      logo: {
        src: "./src/assets/logo.svg",
        alt: "@yetric/ui",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/yetric/design-system",
        },
      ],
      editLink: {
        baseUrl:
          "https://github.com/yetric/design-system/edit/main/docs/",
      },
      customCss: ["./src/styles/custom.css"],
      sidebar: [
        {
          label: "Getting started",
          items: [
            { label: "Introduction", slug: "getting-started/introduction" },
            { label: "Installation", slug: "getting-started/installation" },
            { label: "Next.js", slug: "getting-started/nextjs" },
            { label: "Vite", slug: "getting-started/vite" },
          ],
        },
        {
          label: "Theming",
          items: [
            { label: "Overview", slug: "theming/overview" },
            { label: "Dark mode", slug: "theming/dark-mode" },
            { label: "Custom theme", slug: "theming/custom-theme" },
          ],
        },
        {
          label: "AI components",
          items: [
            { label: "Overview", slug: "ai/overview" },
            { label: "useChat hook", slug: "ai/use-chat" },
            { label: "OpenAI", slug: "ai/openai" },
            { label: "Anthropic", slug: "ai/anthropic" },
            { label: "Vercel AI SDK", slug: "ai/vercel-ai-sdk" },
          ],
        },
        {
          label: "Components",
          items: [{ label: "Component reference", slug: "components/reference" }],
        },
        {
          label: "Contributing",
          items: [
            { label: "Contributing guide", slug: "contributing/guide" },
            { label: "Adding a component", slug: "contributing/adding-a-component" },
          ],
        },
      ],
    }),
  ],
});

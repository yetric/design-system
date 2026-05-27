import type { Preview, Decorator } from "@storybook/react-vite";
import React, { useEffect } from "react";
import { initialize, mswLoader } from "msw-storybook-addon";
import "../src/styles/globals.css";

import { mswHandlers } from "./msw-handlers";

initialize({ onUnhandledRequest: "bypass" });

const ThemeDecorator: Decorator = (Story, context) => {
  const theme = (context.globals?.theme as string) || "light";

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "dark") root.classList.add("dark");
  }, [theme]);

  return <Story />;
};

const preview: Preview = {
  tags: ["autodocs"],
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Component theme",
      defaultValue: "light",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" }
        ],
        showName: true,
        dynamicTitle: true
      }
    }
  },
  parameters: {
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    msw: { handlers: mswHandlers }
  },
  loaders: [mswLoader],
  decorators: [ThemeDecorator]
};

export default preview;

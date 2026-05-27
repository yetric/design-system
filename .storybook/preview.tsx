import type { Preview, Decorator } from "@storybook/react-vite";
import React, { useEffect } from "react";
import "../src/styles/globals.css";

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
    }
  },
  decorators: [ThemeDecorator]
};

export default preview;

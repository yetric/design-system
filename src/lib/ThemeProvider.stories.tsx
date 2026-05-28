import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { ThemeProvider, useTheme, type Theme } from "./theme";
import { Button } from "../components/button/Button";
import { Badge } from "../components/badge/Badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/card/Card";
import { Separator } from "../components/separator/Separator";

const meta: Meta = {
  title: "Foundation/ThemeProvider",
  parameters: { layout: "centered" }
};

export default meta;
type Story = StoryObj;

// ─── Demo consumer ────────────────────────────────────────────────────────────

function ThemeSwitcher() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const options: Theme[] = ["light", "dark", "system"];

  return (
    <Card className="w-[360px]">
      <CardHeader>
        <CardTitle>Theme switcher</CardTitle>
        <CardDescription>
          Current: <Badge variant="secondary">{theme}</Badge>{" "}
          Resolved: <Badge variant="outline">{resolvedTheme}</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          {options.map((t) => (
            <Button
              key={t}
              variant={theme === t ? "primary" : "outline"}
              size="sm"
              onClick={() => setTheme(t)}
              className="capitalize"
            >
              {t}
            </Button>
          ))}
        </div>
        <Separator />
        <p className="text-sm text-muted-foreground">
          The <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">system</code>{" "}
          option follows your OS preference and updates automatically if you change it.
        </p>
      </CardContent>
    </Card>
  );
}

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: "Interactive switcher",
  render: () => (
    <ThemeProvider defaultTheme="system">
      <ThemeSwitcher />
    </ThemeProvider>
  )
};

export const StartDark: Story = {
  name: "Start in dark mode",
  render: () => (
    <ThemeProvider defaultTheme="dark">
      <ThemeSwitcher />
    </ThemeProvider>
  )
};

export const StartLight: Story = {
  name: "Start in light mode",
  render: () => (
    <ThemeProvider defaultTheme="light">
      <ThemeSwitcher />
    </ThemeProvider>
  )
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import {
  ThemeProvider, useTheme,
  PRIMARY_COLORS, RADIUS_PRESETS,
  type Theme, type PrimaryColor, type RadiusPreset, type ThemeConfig,
} from "./theme";
import { Button } from "../components/button/Button";
import { Badge } from "../components/badge/Badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/card/Card";
import { Separator } from "../components/separator/Separator";
import { Label } from "../components/label/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/select/Select";
import { Input } from "../components/input/Input";

const meta: Meta = {
  title: "Foundation/ThemeProvider",
  parameters: { layout: "centered" }
};

export default meta;
type Story = StoryObj;

// ─── Full configurator demo ───────────────────────────────────────────────────

function Configurator() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [config, setConfig] = React.useState<ThemeConfig>({
    primaryColor: "violet",
    radius: "md",
  });

  function patch(partial: Partial<ThemeConfig>) {
    setConfig((prev) => ({ ...prev, ...partial }));
  }

  const themeOptions: Theme[] = ["light", "dark", "system"];

  return (
    <ThemeProvider config={config} defaultTheme={theme}>
      <div className="flex gap-6 items-start">

        {/* Controls */}
        <Card className="w-[280px] shrink-0">
          <CardHeader>
            <CardTitle>Theme configurator</CardTitle>
            <CardDescription>Adjust tokens live</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">

            {/* Light / dark */}
            <div className="space-y-1.5">
              <Label>Color scheme</Label>
              <div className="flex gap-1.5">
                {themeOptions.map((t) => (
                  <Button key={t} size="xs" variant={theme === t ? "primary" : "outline"}
                    onClick={() => setTheme(t)} className="capitalize flex-1">
                    {t}
                  </Button>
                ))}
              </div>
            </div>

            {/* Primary color */}
            <div className="space-y-1.5">
              <Label>Primary color</Label>
              <Select
                value={config.primaryColor ?? "violet"}
                onValueChange={(v) => patch({ primaryColor: v as PrimaryColor })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PRIMARY_COLORS.map((c) => (
                    <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Radius */}
            <div className="space-y-1.5">
              <Label>Border radius</Label>
              <Select
                value={config.radius ?? "md"}
                onValueChange={(v) => patch({ radius: v as RadiusPreset })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {RADIUS_PRESETS.map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Font — body */}
            <div className="space-y-1.5">
              <Label>Body font</Label>
              <Input
                placeholder='"Inter", sans-serif'
                defaultValue={config.fontSans ?? ""}
                onBlur={(e) => patch({ fontSans: e.target.value || undefined })}
              />
            </div>

            {/* Font — heading */}
            <div className="space-y-1.5">
              <Label>Heading font</Label>
              <Input
                placeholder='"Georgia", serif'
                defaultValue={config.fontHeading ?? ""}
                onBlur={(e) => patch({ fontHeading: e.target.value || undefined })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <div className="space-y-4 w-[320px]">
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              resolved: <Badge variant="outline">{resolvedTheme}</Badge>
            </p>
            <h2 className="text-2xl font-semibold">The quick brown fox</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Body text using the configured font and primary color.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <Separator />
          <Input placeholder="Input field" />
          <Card>
            <CardHeader>
              <CardTitle>Card title</CardTitle>
              <CardDescription>Card description text</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Card body using all the configured tokens.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
}

export const Default: Story = {
  name: "Interactive configurator",
  render: () => (
    <ThemeProvider defaultTheme="system">
      <Configurator />
    </ThemeProvider>
  )
};

// ─── Static variants ──────────────────────────────────────────────────────────

export const StartDark: Story = {
  name: "Start in dark mode",
  render: () => (
    <ThemeProvider defaultTheme="dark" config={{ primaryColor: "violet", radius: "md" }}>
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Dark mode</CardTitle>
          <CardDescription>Starting in dark with violet primary</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button variant="primary">Primary</Button>
          <Button variant="outline">Outline</Button>
        </CardContent>
      </Card>
    </ThemeProvider>
  )
};

export const RoundedFull: Story = {
  name: "Pill radius (full)",
  render: () => (
    <ThemeProvider defaultTheme="light" config={{ primaryColor: "pink", radius: "full" }}>
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Pill radius</CardTitle>
          <CardDescription>radius=full, primaryColor=pink</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button variant="primary">Primary</Button>
          <Button variant="outline">Outline</Button>
          <Input placeholder="Input" />
        </CardContent>
      </Card>
    </ThemeProvider>
  )
};

export const SquareGreen: Story = {
  name: "Square radius + green",
  render: () => (
    <ThemeProvider defaultTheme="light" config={{ primaryColor: "green", radius: "none" }}>
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Square radius</CardTitle>
          <CardDescription>radius=none, primaryColor=green</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button variant="primary">Primary</Button>
          <Button variant="outline">Outline</Button>
          <Input placeholder="Input" />
        </CardContent>
      </Card>
    </ThemeProvider>
  )
};

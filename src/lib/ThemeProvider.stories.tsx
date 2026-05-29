import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import {
  ThemeProvider,
  useTheme,
  PRIMARY_COLORS,
  RADIUS_PRESETS,
  type Theme,
  type PrimaryColor,
  type RadiusPreset,
  type ThemeConfig,
} from "./theme";
import { Button } from "../components/button/Button";
import { Badge } from "../components/badge/Badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/card/Card";
import { Separator } from "../components/separator/Separator";
import { Label } from "../components/label/Label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/select/Select";
import { Input } from "../components/input/Input";

const meta: Meta = {
  title: "Foundation/ThemeProvider",
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj;

// ─── Google Fonts catalogue ───────────────────────────────────────────────────

interface GoogleFont {
  name: string;
  css: string;
  category: "sans-serif" | "serif" | "monospace" | "display";
}

const GOOGLE_FONTS: GoogleFont[] = [
  // Sans-serif
  { name: "Inter", css: '"Inter", sans-serif', category: "sans-serif" },
  { name: "Roboto", css: '"Roboto", sans-serif', category: "sans-serif" },
  { name: "Open Sans", css: '"Open Sans", sans-serif', category: "sans-serif" },
  { name: "Lato", css: '"Lato", sans-serif', category: "sans-serif" },
  { name: "Poppins", css: '"Poppins", sans-serif', category: "sans-serif" },
  { name: "DM Sans", css: '"DM Sans", sans-serif', category: "sans-serif" },
  { name: "Plus Jakarta Sans", css: '"Plus Jakarta Sans", sans-serif', category: "sans-serif" },
  { name: "Outfit", css: '"Outfit", sans-serif', category: "sans-serif" },
  { name: "Figtree", css: '"Figtree", sans-serif', category: "sans-serif" },
  { name: "Nunito", css: '"Nunito", sans-serif', category: "sans-serif" },
  // Serif
  { name: "Merriweather", css: '"Merriweather", serif', category: "serif" },
  { name: "Playfair Display", css: '"Playfair Display", serif', category: "serif" },
  { name: "Lora", css: '"Lora", serif', category: "serif" },
  { name: "EB Garamond", css: '"EB Garamond", serif', category: "serif" },
  { name: "Libre Baskerville", css: '"Libre Baskerville", serif', category: "serif" },
  // Monospace
  { name: "Fira Code", css: '"Fira Code", monospace', category: "monospace" },
  { name: "JetBrains Mono", css: '"JetBrains Mono", monospace', category: "monospace" },
  { name: "Source Code Pro", css: '"Source Code Pro", monospace', category: "monospace" },
  // Display
  { name: "Montserrat", css: '"Montserrat", sans-serif', category: "display" },
  { name: "Raleway", css: '"Raleway", sans-serif', category: "display" },
  { name: "Space Grotesk", css: '"Space Grotesk", sans-serif', category: "display" },
  { name: "Oswald", css: '"Oswald", sans-serif', category: "display" },
];

const FONT_CATEGORIES = ["sans-serif", "serif", "monospace", "display"] as const;

/** Lazily injects a Google Fonts stylesheet. Safe to call multiple times. */
function loadGoogleFont(name: string) {
  const id = `gfont-${name.replace(/\s+/g, "-").toLowerCase()}`;
  if (document.getElementById(id)) return;
  const family = name.replace(/\s+/g, "+");
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${family}:wght@400;500;600;700&display=swap`;
  document.head.appendChild(link);
}

// ─── Font select control ──────────────────────────────────────────────────────

const NONE_VALUE = "__none__";

interface FontSelectProps {
  label: string;
  value: string | undefined;
  onChange: (css: string | undefined) => void;
}

function FontSelect({ label, value, onChange }: FontSelectProps) {
  const selected = value ? GOOGLE_FONTS.find((f) => f.css === value) : undefined;

  function handleChange(v: string) {
    if (v === NONE_VALUE) {
      onChange(undefined);
      return;
    }
    const font = GOOGLE_FONTS.find((f) => f.css === v);
    if (font) {
      loadGoogleFont(font.name);
      onChange(font.css);
    }
  }

  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Select value={selected?.css ?? NONE_VALUE} onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder="System default" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={NONE_VALUE}>System default</SelectItem>
          {FONT_CATEGORIES.map((cat) => (
            <SelectGroup key={cat}>
              <SelectLabel className="capitalize">{cat}</SelectLabel>
              {GOOGLE_FONTS.filter((f) => f.category === cat).map((f) => (
                <SelectItem key={f.css} value={f.css} style={{ fontFamily: f.css }}>
                  {f.name}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

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
      <div className="flex items-start gap-6">
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
                  <Button
                    key={t}
                    size="xs"
                    variant={theme === t ? "primary" : "outline"}
                    onClick={() => setTheme(t)}
                    className="flex-1 capitalize"
                  >
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
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRIMARY_COLORS.map((c) => (
                    <SelectItem key={c} value={c} className="capitalize">
                      {c}
                    </SelectItem>
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
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {RADIUS_PRESETS.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Font — body */}
            <FontSelect
              label="Body font"
              value={config.fontSans}
              onChange={(v) => patch({ fontSans: v })}
            />

            {/* Font — heading */}
            <FontSelect
              label="Heading font"
              value={config.fontHeading}
              onChange={(v) => patch({ fontHeading: v })}
            />
          </CardContent>
        </Card>

        {/* Preview */}
        <div className="w-[320px] space-y-4">
          <div>
            <p className="mb-1 text-xs text-muted-foreground">
              resolved: <Badge variant="outline">{resolvedTheme}</Badge>
            </p>
            <h2 className="text-2xl font-semibold">The quick brown fox</h2>
            <p className="mt-1 text-sm text-muted-foreground">
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
  ),
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
  ),
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
  ),
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
  ),
};

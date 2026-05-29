"use client";

import * as React from "react";
import { BreakpointsContext, DEFAULT_BREAKPOINTS, type Breakpoints } from "./breakpoints";

// ─── Light / dark mode ────────────────────────────────────────────────────────

export type Theme = "light" | "dark" | "system";

export function applyTheme(theme: "light" | "dark"): void {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  if (theme === "dark") {
    root.classList.add("dark");
  }
}

export function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// ─── Primary color palette ────────────────────────────────────────────────────

export const PRIMARY_COLORS = [
  "violet",
  "blue",
  "green",
  "red",
  "orange",
  "teal",
  "pink",
  "grape",
  "indigo",
  "cyan",
  "lime",
  "yellow",
] as const;

export type PrimaryColor = (typeof PRIMARY_COLORS)[number];

interface ColorStop {
  /** HSL channel values for --primary, e.g. "255 86% 63%" */
  primary: string;
  /** HSL channel values for --primary-foreground */
  foreground: string;
}

interface ColorPaletteEntry {
  light: ColorStop;
  dark: ColorStop;
}

const WHITE = "0 0% 100%";
const DARK = "210 11% 15%";

export const COLOR_PALETTES: Record<PrimaryColor, ColorPaletteEntry> = {
  violet: {
    light: { primary: "255 86% 63%", foreground: WHITE },
    dark: { primary: "255 94% 79%", foreground: DARK },
  },
  blue: {
    light: { primary: "208 80% 52%", foreground: WHITE },
    dark: { primary: "207 91% 64%", foreground: DARK },
  },
  green: {
    light: { primary: "129 52% 40%", foreground: WHITE },
    dark: { primary: "130 57% 57%", foreground: DARK },
  },
  red: {
    light: { primary: "0 86% 59%", foreground: WHITE },
    dark: { primary: "0 100% 71%", foreground: DARK },
  },
  orange: {
    light: { primary: "24 95% 50%", foreground: WHITE },
    dark: { primary: "27 100% 58%", foreground: DARK },
  },
  teal: {
    light: { primary: "162 73% 32%", foreground: WHITE },
    dark: { primary: "162 66% 54%", foreground: DARK },
  },
  pink: {
    light: { primary: "339 77% 58%", foreground: WHITE },
    dark: { primary: "337 88% 73%", foreground: DARK },
  },
  grape: {
    light: { primary: "290 59% 51%", foreground: WHITE },
    dark: { primary: "288 83% 71%", foreground: DARK },
  },
  indigo: {
    light: { primary: "231 79% 58%", foreground: WHITE },
    dark: { primary: "232 94% 72%", foreground: DARK },
  },
  cyan: {
    light: { primary: "188 83% 37%", foreground: WHITE },
    dark: { primary: "185 67% 55%", foreground: DARK },
  },
  lime: {
    light: { primary: "86 77% 33%", foreground: WHITE },
    dark: { primary: "89 72% 58%", foreground: DARK },
  },
  yellow: {
    light: { primary: "38 100% 45%", foreground: DARK },
    dark: { primary: "44 100% 61%", foreground: DARK },
  },
};

// ─── Radius presets ───────────────────────────────────────────────────────────

export const RADIUS_PRESETS = ["none", "xs", "sm", "md", "lg", "xl", "full"] as const;
export type RadiusPreset = (typeof RADIUS_PRESETS)[number];

export const RADIUS_VALUES: Record<RadiusPreset, string> = {
  none: "0rem",
  xs: "0.25rem",
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  full: "9999px",
};

// ─── ThemeConfig ──────────────────────────────────────────────────────────────

export interface ThemeConfig {
  /** Primary brand color. Defaults to the value in globals.css (violet). */
  primaryColor?: PrimaryColor;
  /** Base border radius that flows through --radius. Defaults to "md". */
  radius?: RadiusPreset;
  /** CSS font-family string for body text. E.g. `'"Inter", sans-serif'` */
  fontSans?: string;
  /** CSS font-family string for headings. E.g. `'"Cal Sans", sans-serif'` */
  fontHeading?: string;
  /**
   * Override the responsive breakpoints (min-width in px) used by layout
   * components such as Grid. Unspecified keys fall back to the defaults.
   *
   * @example
   * { sm: 480, md: 720, lg: 960 }
   */
  breakpoints?: Partial<Breakpoints>;
}

const CONFIG_STYLE_ID = "yetric-ui-theme-config";

export function applyConfig(config: ThemeConfig): void {
  const root = document.documentElement;

  // — Radius & fonts via inline custom props (no light/dark split needed)
  if (config.radius !== undefined) {
    root.style.setProperty("--radius", RADIUS_VALUES[config.radius]);
  }
  if (config.fontSans !== undefined) {
    root.style.setProperty("--font-sans", config.fontSans);
  }
  if (config.fontHeading !== undefined) {
    root.style.setProperty("--font-heading", config.fontHeading);
  }

  // — Primary color: must handle :root and .dark separately → inject <style>
  let el = document.getElementById(CONFIG_STYLE_ID) as HTMLStyleElement | null;

  if (!config.primaryColor) {
    el?.remove();
    return;
  }

  const p = COLOR_PALETTES[config.primaryColor];
  const css = `
:root {
  --primary: ${p.light.primary};
  --primary-foreground: ${p.light.foreground};
  --ring: ${p.light.primary};
}
.dark {
  --primary: ${p.dark.primary};
  --primary-foreground: ${p.dark.foreground};
  --ring: ${p.dark.primary};
}`.trim();

  if (!el) {
    el = document.createElement("style");
    el.id = CONFIG_STYLE_ID;
    document.head.appendChild(el);
  }
  el.textContent = css;
}

export function removeConfig(): void {
  document.getElementById(CONFIG_STYLE_ID)?.remove();
  const root = document.documentElement;
  root.style.removeProperty("--radius");
  root.style.removeProperty("--font-sans");
  root.style.removeProperty("--font-heading");
}

// ─── Context ──────────────────────────────────────────────────────────────────

const STORAGE_KEY = "yetric-ui-theme";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: React.ReactNode;
  /** Initial theme. Defaults to "system". */
  defaultTheme?: Theme;
  /** localStorage key. Defaults to "yetric-ui-theme". */
  storageKey?: string;
  /** Design token overrides applied as CSS custom properties. */
  config?: ThemeConfig;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = STORAGE_KEY,
  config,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    return (localStorage.getItem(storageKey) as Theme | null) ?? defaultTheme;
  });

  const resolvedTheme = React.useMemo<"light" | "dark">(() => {
    if (theme === "system") return getSystemTheme();
    return theme;
  }, [theme]);

  const breakpointsKey = JSON.stringify(config?.breakpoints);
  const breakpoints = React.useMemo<Breakpoints>(
    () => ({ ...DEFAULT_BREAKPOINTS, ...config?.breakpoints }),
    // breakpointsKey is a stable primitive derived from the config object
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [breakpointsKey]
  );

  React.useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  React.useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme(getSystemTheme());
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  React.useEffect(() => {
    if (config) applyConfig(config);
    return () => removeConfig();
  }, [config]);

  const setTheme = React.useCallback(
    (next: Theme) => {
      localStorage.setItem(storageKey, next);
      setThemeState(next);
    },
    [storageKey]
  );

  return (
    <BreakpointsContext.Provider value={breakpoints}>
      <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    </BreakpointsContext.Provider>
  );
}

/** Access and update the current theme. Must be used inside <ThemeProvider>. */
export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }
  return ctx;
}

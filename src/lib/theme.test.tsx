import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import * as React from "react";
import {
  ThemeProvider,
  useTheme,
  applyConfig,
  removeConfig,
  COLOR_PALETTES,
  RADIUS_VALUES,
  type ThemeConfig,
} from "./theme";

// Helper: render a component that reads/writes the theme
function ThemeConsumer() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button onClick={() => setTheme("dark")}>dark</button>
      <button onClick={() => setTheme("light")}>light</button>
      <button onClick={() => setTheme("system")}>system</button>
    </div>
  );
}

// Stub matchMedia
function stubMatchMedia(prefersDark: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn((query: string) => ({
      matches: query === "(prefers-color-scheme: dark)" ? prefersDark : false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove("light", "dark");
  document.getElementById("yetric-ui-theme-config")?.remove();
  document.documentElement.style.removeProperty("--radius");
  document.documentElement.style.removeProperty("--font-sans");
  document.documentElement.style.removeProperty("--font-heading");
  stubMatchMedia(false);
});

describe("ThemeProvider", () => {
  it("defaults to system theme", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme").textContent).toBe("system");
  });

  it("resolves system theme to light when OS is light", () => {
    stubMatchMedia(false);
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId("resolved").textContent).toBe("light");
  });

  it("resolves system theme to dark when OS is dark", () => {
    stubMatchMedia(true);
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId("resolved").textContent).toBe("dark");
  });

  it("applies dark class to documentElement when dark", () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeConsumer />
      </ThemeProvider>
    );
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("removes dark class when switching to light", async () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeConsumer />
      </ThemeProvider>
    );
    await act(async () => {
      screen.getByText("light").click();
    });
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("persists theme to localStorage", async () => {
    render(
      <ThemeProvider storageKey="test-theme">
        <ThemeConsumer />
      </ThemeProvider>
    );
    await act(async () => {
      screen.getByText("dark").click();
    });
    expect(localStorage.getItem("test-theme")).toBe("dark");
  });

  it("reads persisted theme from localStorage on mount", () => {
    localStorage.setItem("test-theme", "dark");
    render(
      <ThemeProvider storageKey="test-theme">
        <ThemeConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme").textContent).toBe("dark");
  });

  it("setTheme updates both the stored value and rendered output", async () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    await act(async () => {
      screen.getByText("dark").click();
    });
    expect(screen.getByTestId("theme").textContent).toBe("dark");
    expect(screen.getByTestId("resolved").textContent).toBe("dark");
  });
});

describe("useTheme", () => {
  it("throws when used outside ThemeProvider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<ThemeConsumer />)).toThrow(
      "useTheme must be used within a <ThemeProvider>"
    );
    spy.mockRestore();
  });
});

// ─── applyConfig ──────────────────────────────────────────────────────────────

describe("applyConfig — radius", () => {
  it("sets --radius for each preset", () => {
    (Object.entries(RADIUS_VALUES) as [string, string][]).forEach(([preset, value]) => {
      applyConfig({ radius: preset as any });
      expect(document.documentElement.style.getPropertyValue("--radius")).toBe(value);
    });
  });
});

describe("applyConfig — fonts", () => {
  it("sets --font-sans", () => {
    applyConfig({ fontSans: '"Inter", sans-serif' });
    expect(document.documentElement.style.getPropertyValue("--font-sans")).toBe(
      '"Inter", sans-serif'
    );
  });

  it("sets --font-heading", () => {
    applyConfig({ fontHeading: '"Cal Sans", serif' });
    expect(document.documentElement.style.getPropertyValue("--font-heading")).toBe(
      '"Cal Sans", serif'
    );
  });
});

describe("applyConfig — primaryColor", () => {
  it("injects a <style> tag with :root and .dark overrides for blue", () => {
    applyConfig({ primaryColor: "blue" });
    const el = document.getElementById("yetric-ui-theme-config");
    expect(el).not.toBeNull();
    expect(el?.textContent).toContain(COLOR_PALETTES.blue.light.primary);
    expect(el?.textContent).toContain(COLOR_PALETTES.blue.dark.primary);
    expect(el?.textContent).toContain(":root");
    expect(el?.textContent).toContain(".dark");
  });

  it("removes the style tag when primaryColor is not set", () => {
    applyConfig({ primaryColor: "blue" });
    applyConfig({}); // no primaryColor
    expect(document.getElementById("yetric-ui-theme-config")).toBeNull();
  });

  it("updates the style tag when color changes", () => {
    applyConfig({ primaryColor: "blue" });
    applyConfig({ primaryColor: "red" });
    const el = document.getElementById("yetric-ui-theme-config");
    expect(el?.textContent).toContain(COLOR_PALETTES.red.light.primary);
    expect(el?.textContent).not.toContain(COLOR_PALETTES.blue.light.primary);
  });
});

describe("removeConfig", () => {
  it("removes the style tag and inline custom props", () => {
    applyConfig({ primaryColor: "green", radius: "lg", fontSans: '"Inter", sans-serif' });
    removeConfig();
    expect(document.getElementById("yetric-ui-theme-config")).toBeNull();
    expect(document.documentElement.style.getPropertyValue("--radius")).toBe("");
    expect(document.documentElement.style.getPropertyValue("--font-sans")).toBe("");
  });
});

describe("ThemeProvider config prop", () => {
  it("applies config on mount", () => {
    const config: ThemeConfig = { radius: "lg", primaryColor: "green" };
    render(
      <ThemeProvider config={config}>
        <div />
      </ThemeProvider>
    );
    expect(document.documentElement.style.getPropertyValue("--radius")).toBe(RADIUS_VALUES.lg);
    expect(document.getElementById("yetric-ui-theme-config")).not.toBeNull();
  });
});

import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import * as React from "react";
import { ThemeProvider, useTheme } from "./theme";

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

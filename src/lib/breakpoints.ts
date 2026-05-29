"use client";

import * as React from "react";

// ─── Default breakpoints (matches Tailwind defaults) ─────────────────────────

export const DEFAULT_BREAKPOINTS = {
  sm:    640,
  md:    768,
  lg:    1024,
  xl:    1280,
  "2xl": 1536,
} as const;

export type BreakpointKey = keyof typeof DEFAULT_BREAKPOINTS;

/** Map of breakpoint name → min-width in pixels. */
export type Breakpoints = Record<BreakpointKey, number>;

// ─── Context ──────────────────────────────────────────────────────────────────

/**
 * Context that provides the active breakpoint values.
 * Defaults to DEFAULT_BREAKPOINTS so components work outside <ThemeProvider>.
 */
export const BreakpointsContext = React.createContext<Breakpoints>(DEFAULT_BREAKPOINTS);

/** Returns the active breakpoints. Falls back to DEFAULT_BREAKPOINTS when used outside ThemeProvider. */
export function useBreakpoints(): Breakpoints {
  return React.useContext(BreakpointsContext);
}

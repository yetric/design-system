"use client";

import * as React from "react";
import { cn } from "../../lib/cn";
import { useBreakpoints, type Breakpoints } from "../../lib/breakpoints";

type AlignItems = "start" | "center" | "end" | "stretch";
type JustifyItems = "start" | "center" | "end" | "stretch";

/**
 * Responsive columns — pass a number for a fixed layout, or an object
 * with breakpoint keys for a responsive layout.
 *
 * @example
 * // Fixed: always 4 columns
 * <Grid cols={4} />
 *
 * // Responsive: 1 → 2 → 4 as viewport grows
 * <Grid cols={{ base: 1, md: 2, lg: 4 }} />
 */
export type ResponsiveCols =
  | number
  | { base?: number; sm?: number; md?: number; lg?: number; xl?: number; "2xl"?: number };

function buildResponsiveCSS(selector: string, cols: ResponsiveCols, breakpoints: Breakpoints): string {
  if (typeof cols === "number") return "";
  const responsive = cols as Record<string, number | undefined>;
  let css = "";
  if (responsive.base !== undefined) {
    css += `${selector}{grid-template-columns:repeat(${responsive.base},minmax(0,1fr))}`;
  }
  for (const [bp, px] of Object.entries(breakpoints) as [string, number][]) {
    if (responsive[bp] !== undefined) {
      css += `@media(min-width:${px}px){${selector}{grid-template-columns:repeat(${responsive[bp]},minmax(0,1fr))}}`;
    }
  }
  return css;
}

export interface GridProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Number of equal-width columns, or a responsive breakpoint map.
   * Defaults to 1.
   */
  cols?: ResponsiveCols;
  /** Gap between grid items using the 4px spacing scale (e.g. 4 = 1rem). Defaults to 4. */
  gap?: number;
  /** Column gap override (uses the same 4px scale as gap). */
  gapX?: number;
  /** Row gap override (uses the same 4px scale as gap). */
  gapY?: number;
  /** CSS align-items for grid cells. */
  align?: AlignItems;
  /** CSS justify-items for grid cells. */
  justify?: JustifyItems;
  /** Render as a different HTML element. Defaults to "div". */
  as?: React.ElementType;
}

const Grid = React.forwardRef<HTMLElement, GridProps>(
  (
    {
      cols = 1,
      gap = 4,
      gapX,
      gapY,
      align,
      justify,
      as: Comp = "div",
      style,
      className,
      ...props
    },
    ref
  ) => {
    const uid = React.useId().replace(/:/g, "");
    const breakpoints = useBreakpoints();
    const isResponsive = typeof cols === "object";
    const css = isResponsive ? buildResponsiveCSS(`[data-grid="${uid}"]`, cols, breakpoints) : "";

    return (
      <>
        {css && <style>{css}</style>}
        <Comp
          ref={ref}
          data-grid={isResponsive ? uid : undefined}
          className={cn(className)}
          style={{
            display: "grid",
            gridTemplateColumns:
              typeof cols === "number"
                ? `repeat(${cols}, minmax(0, 1fr))`
                : undefined,
            columnGap: gapX !== undefined ? `${gapX * 0.25}rem` : undefined,
            rowGap: gapY !== undefined ? `${gapY * 0.25}rem` : undefined,
            gap:
              gapX === undefined && gapY === undefined
                ? `${gap * 0.25}rem`
                : undefined,
            alignItems: align,
            justifyItems: justify,
            ...style,
          }}
          {...props}
        />
      </>
    );
  }
);
Grid.displayName = "Grid";

export { Grid };


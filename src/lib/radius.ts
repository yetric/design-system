export const RADIUS = {
  NONE: "none",
  XS: "xs",
  SM: "sm",
  MD: "md",
  LG: "lg",
  XL: "xl",
  FULL: "full",
} as const;

export type Radius = (typeof RADIUS)[keyof typeof RADIUS];

export const radiusClass: Record<Radius, string> = {
  none: "rounded-none",
  xs: "rounded-sm",
  sm: "rounded",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

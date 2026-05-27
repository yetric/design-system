export type Radius = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "full";

export const radiusClass: Record<Radius, string> = {
  none: "rounded-none",
  xs:   "rounded-sm",
  sm:   "rounded",
  md:   "rounded-md",
  lg:   "rounded-lg",
  xl:   "rounded-xl",
  full: "rounded-full"
};

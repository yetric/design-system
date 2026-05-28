export const SHADOW = {
  NONE: "none",
  SM:   "sm",
  MD:   "md",
  LG:   "lg",
  XL:   "xl",
} as const;

export type ShadowSize = (typeof SHADOW)[keyof typeof SHADOW];

export const shadowClass: Record<ShadowSize, string> = {
  none: "shadow-none",
  sm:   "shadow-sm",
  md:   "shadow-md",
  lg:   "shadow-lg",
  xl:   "shadow-xl",
};

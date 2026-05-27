export const VARIANT = {
  DEFAULT:     "default",
  PRIMARY:     "primary",
  SECONDARY:   "secondary",
  GHOST:       "ghost",
  OUTLINE:     "outline",
  DESTRUCTIVE: "destructive",
  WARNING:     "warning",
  SUCCESS:     "success",
  INFO:        "info"
} as const;

export type Variant = (typeof VARIANT)[keyof typeof VARIANT];

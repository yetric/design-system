export const SIZE = {
  XS: "xs",
  SM: "sm",
  MD: "md",
  LG: "lg",
  XL: "xl",
} as const;

export type Size = (typeof SIZE)[keyof typeof SIZE];

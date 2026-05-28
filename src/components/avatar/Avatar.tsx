"use client";

import * as React from "react";

import { cn } from "../../lib/cn";
import { type Size } from "../../lib/size";

const avatarSizeClass: Record<Size, string> = {
  xs: "h-6 w-6 text-xs",
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Image source URL. Falls back to initials if not provided or fails to load. */
  src?: string;
  /** Alt text for the image. */
  alt?: string;
  /** Fallback text — typically 1–2 initials. Shown when src is absent or broken. */
  fallback?: string;
  size?: Size;
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, src, alt, fallback, size = "md", ...props }, ref) => {
    const [imgError, setImgError] = React.useState(false);
    const showImage = src && !imgError;
    const initials = fallback
      ? fallback.slice(0, 2).toUpperCase()
      : alt
        ? alt
            .split(" ")
            .map((w) => w[0])
            .slice(0, 2)
            .join("")
            .toUpperCase()
        : "?";

    return (
      <span
        ref={ref}
        role="img"
        aria-label={alt ?? fallback ?? "avatar"}
        className={cn(
          "inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-muted font-medium text-muted-foreground",
          avatarSizeClass[size],
          className
        )}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt ?? ""}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span aria-hidden="true">{initials}</span>
        )}
      </span>
    );
  }
);
Avatar.displayName = "Avatar";

export { Avatar };

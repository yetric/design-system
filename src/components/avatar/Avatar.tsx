"use client";

import * as React from "react";

import { cn } from "../../lib/cn";
import { radiusClass, type Radius } from "../../lib/radius";
import { type Size } from "../../lib/size";

const avatarSizeClass: Record<Size, string> = {
  xs: "h-6 w-6 text-xs",
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

const statusSizeClass: Record<Size, string> = {
  xs: "h-1.5 w-1.5 ring-1",
  sm: "h-2 w-2 ring-1",
  md: "h-2.5 w-2.5 ring-2",
  lg: "h-3 w-3 ring-2",
  xl: "h-3.5 w-3.5 ring-2",
};

const statusColor: Record<string, string> = {
  online: "bg-success",
  away: "bg-warning",
  offline: "bg-muted-foreground",
  busy: "bg-destructive",
};

export type AvatarStatus = "online" | "away" | "offline" | "busy";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Image source URL. Falls back to initials if not provided or fails to load. */
  src?: string;
  /** Alt text for the image. */
  alt?: string;
  /** Fallback text — typically 1–2 initials. Shown when src is absent or broken. */
  fallback?: string;
  size?: Size;
  radius?: Radius;
  /** Optional online/away/offline/busy indicator dot. */
  status?: AvatarStatus;
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, src, alt, fallback, size = "md", radius = "full", status, ...props }, ref) => {
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
      <span className="relative inline-flex shrink-0">
        <span
          ref={ref}
          role="img"
          aria-label={alt ?? fallback ?? "avatar"}
          className={cn(
            "bg-muted text-muted-foreground inline-flex items-center justify-center overflow-hidden font-medium select-none",
            avatarSizeClass[size],
            radiusClass[radius],
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
        {status && (
          <span
            aria-label={status}
            className={cn(
              "ring-background absolute right-0 bottom-0 rounded-full",
              statusSizeClass[size],
              statusColor[status]
            )}
          />
        )}
      </span>
    );
  }
);
Avatar.displayName = "Avatar";

export { Avatar };

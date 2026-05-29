"use client";

import * as React from "react";

import { cn } from "../../lib/cn";
import { radiusClass, type Radius } from "../../lib/radius";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  radius?: Radius;
  aspectRatio?: "square" | "video" | "auto";
  fit?: "cover" | "contain" | "fill";
  lazy?: boolean;
  blur?: boolean;
}

const aspectRatioClass = {
  square: "aspect-square",
  video: "aspect-video",
  auto: "",
} as const;

const fitClass = {
  cover: "object-cover",
  contain: "object-contain",
  fill: "object-fill",
} as const;

const isUrlLike = (value?: string) =>
  Boolean(value) &&
  (/^(https?:\/\/|data:|blob:|\/)/i.test(value ?? "") ||
    value?.includes("/") ||
    value?.includes("."));

const getInitials = (value: string) =>
  value
    .split(" ")
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      className,
      src,
      alt,
      fallback,
      radius = "md",
      aspectRatio = "auto",
      fit = "cover",
      lazy = true,
      blur = false,
      onLoad,
      onError,
      ...props
    },
    ref
  ) => {
    const [hasError, setHasError] = React.useState(false);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [hasFallbackError, setHasFallbackError] = React.useState(false);

    React.useEffect(() => {
      setHasError(false);
      setIsLoaded(false);
      setHasFallbackError(false);
    }, [src, fallback]);

    const fallbackIsImage = isUrlLike(fallback) && !hasFallbackError;
    const fallbackText =
      fallback && !isUrlLike(fallback)
        ? fallback
        : getInitials(alt) || alt.slice(0, 2).toUpperCase();
    const shouldShowFallback = hasError;
    const shouldShowBlur = blur && !shouldShowFallback && !isLoaded;
    const constrained = aspectRatio !== "auto";

    return (
      <figure
        className={cn(
          "relative overflow-hidden bg-muted",
          radiusClass[radius],
          aspectRatioClass[aspectRatio],
          className
        )}
      >
        {shouldShowBlur && (
          <div
            aria-hidden="true"
            className="absolute inset-0 scale-110 bg-cover bg-center blur-xl transition-opacity duration-300"
            style={{ backgroundImage: `url(${src})` }}
          />
        )}

        {shouldShowFallback ? (
          fallbackIsImage ? (
            <img
              src={fallback}
              alt={alt}
              className={cn("block w-full", constrained && "h-full", fitClass[fit])}
              onError={() => setHasFallbackError(true)}
            />
          ) : (
            <div
              className="flex h-full min-h-24 w-full items-center justify-center bg-muted px-4 text-center text-sm font-medium text-muted-foreground"
              aria-label={alt}
            >
              {fallbackText}
            </div>
          )
        ) : (
          <img
            ref={ref}
            src={src}
            alt={alt}
            loading={lazy ? "lazy" : "eager"}
            className={cn(
              "block transition duration-300",
              constrained ? "h-full w-full" : "w-full",
              fitClass[fit],
              shouldShowBlur ? "opacity-0" : "opacity-100"
            )}
            onLoad={(event) => {
              setIsLoaded(true);
              onLoad?.(event);
            }}
            onError={(event) => {
              setHasError(true);
              onError?.(event);
            }}
            {...props}
          />
        )}
      </figure>
    );
  }
);
Image.displayName = "Image";

export type { ImageProps };
export { Image };

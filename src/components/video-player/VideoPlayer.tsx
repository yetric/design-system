"use client";

import * as React from "react";

import { cn } from "../../lib/cn";

export interface VideoPlayerProps {
  src: string | { src: string; type?: string }[];
  poster?: string;
  title?: string;
  aspectRatio?: "16/9" | "4/3" | "1/1" | "9/16";
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  className?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

const aspectRatioMap: Record<NonNullable<VideoPlayerProps["aspectRatio"]>, string> = {
  "16/9": "16 / 9",
  "4/3": "4 / 3",
  "1/1": "1 / 1",
  "9/16": "9 / 16",
};

const VideoPlayer = React.forwardRef<HTMLVideoElement, VideoPlayerProps>(
  (
    {
      src,
      poster,
      title,
      aspectRatio = "16/9",
      autoPlay,
      muted,
      loop,
      controls = true,
      className,
      onPlay,
      onPause,
      onEnded,
    },
    ref
  ) => {
    return (
      <div
        className={cn("overflow-hidden rounded-lg bg-black", className)}
        style={{ aspectRatio: aspectRatioMap[aspectRatio] }}
      >
        <video
          ref={ref}
          src={typeof src === "string" ? src : undefined}
          poster={poster}
          aria-label={title}
          controls={controls}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline
          className="h-full w-full"
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onEnded}
        >
          {Array.isArray(src)
            ? src.map((source) => (
                <source
                  key={`${source.src}-${source.type ?? "default"}`}
                  src={source.src}
                  type={source.type}
                />
              ))
            : null}
        </video>
      </div>
    );
  }
);

VideoPlayer.displayName = "VideoPlayer";

export { VideoPlayer };

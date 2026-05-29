"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface SpoilerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum height in px before the content is clipped. Defaults to 80. */
  maxHeight?: number;
  /** Label for the "show more" button. */
  showLabel?: string;
  /** Label for the "show less" button. */
  hideLabel?: string;
}

function Spoiler({
  className,
  children,
  maxHeight = 80,
  showLabel = "Show more",
  hideLabel = "Show less",
  ...props
}: SpoilerProps) {
  const [expanded, setExpanded] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [overflows, setOverflows] = React.useState(false);
  const [fullHeight, setFullHeight] = React.useState(0);

  React.useEffect(() => {
    const el = contentRef.current;
    if (el) {
      const h = el.scrollHeight;
      setOverflows(h > maxHeight);
      setFullHeight(h);
    }
  }, [maxHeight, children]);

  return (
    <div className={cn("relative", className)} {...props}>
      <div
        ref={contentRef}
        style={{
          maxHeight: expanded ? fullHeight : maxHeight,
          overflow: "hidden",
          transition: "max-height 0.3s ease-out",
        }}
        className={cn(!expanded && overflows && "mask-b-from-50%")}
      >
        {children}
      </div>
      {overflows && (
        <button
          type="button"
          onClick={() => setExpanded((p) => !p)}
          className="mt-2 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {expanded ? hideLabel : showLabel}
        </button>
      )}
    </div>
  );
}

export { Spoiler };

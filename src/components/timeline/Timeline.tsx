"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface TimelineItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /** Icon or node to place in the bullet. */
  bullet?: React.ReactNode;
  title?: string;
  description?: string;
  time?: string;
  /** Hide the connector line after this item. */
  last?: boolean;
}

function TimelineItem({
  className,
  bullet,
  title,
  description,
  time,
  last = false,
  children,
  ...props
}: TimelineItemProps) {
  return (
    <li className={cn("relative flex gap-4", className)} {...props}>
      {/* Vertical connector */}
      {!last && (
        <div className="bg-border absolute top-8 bottom-0 left-3.5 w-px" aria-hidden="true" />
      )}
      {/* Bullet */}
      <div className="border-border bg-card text-muted-foreground relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border">
        {bullet ?? <span className="bg-primary h-2 w-2 rounded-full" />}
      </div>
      {/* Content */}
      <div className="flex-1 pb-8">
        <div className="flex items-start justify-between gap-2">
          {title && <p className="text-foreground text-sm leading-tight font-medium">{title}</p>}
          {time && <time className="text-muted-foreground shrink-0 text-xs">{time}</time>}
        </div>
        {description && <p className="text-muted-foreground mt-0.5 text-sm">{description}</p>}
        {children}
      </div>
    </li>
  );
}

export interface TimelineProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

function Timeline({ className, children, ...props }: TimelineProps) {
  return (
    <ul className={cn("space-y-0", className)} aria-label="Timeline" {...props}>
      {children}
    </ul>
  );
}

export { Timeline, TimelineItem };

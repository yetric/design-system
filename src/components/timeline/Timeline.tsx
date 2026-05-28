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
        <div className="absolute left-3.5 top-8 bottom-0 w-px bg-border" aria-hidden="true" />
      )}
      {/* Bullet */}
      <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-card border border-border text-muted-foreground">
        {bullet ?? <span className="h-2 w-2 rounded-full bg-primary" />}
      </div>
      {/* Content */}
      <div className="flex-1 pb-8">
        <div className="flex items-start justify-between gap-2">
          {title && (
            <p className="text-sm font-medium text-foreground leading-tight">{title}</p>
          )}
          {time && (
            <time className="text-xs text-muted-foreground shrink-0">{time}</time>
          )}
        </div>
        {description && (
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        )}
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

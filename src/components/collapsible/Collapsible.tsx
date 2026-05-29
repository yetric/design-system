"use client";

import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/cn";

const Collapsible = CollapsiblePrimitive.Root;

/** Styled trigger button with an animated chevron. */
const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger> & {
    /** Hide the built-in chevron (e.g. when using a custom icon). */
    hideChevron?: boolean;
  }
>(({ className, children, hideChevron = false, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleTrigger
    ref={ref}
    className={cn(
      "flex w-full items-center justify-between gap-2 rounded-md p-2",
      "text-sm font-medium transition-colors",
      "hover:bg-muted focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
      "disabled:pointer-events-none disabled:opacity-50",
      "[&[data-state=open]>svg]:rotate-180",
      className
    )}
    {...props}
  >
    {children}
    {!hideChevron && (
      <ChevronDown
        aria-hidden="true"
        className="text-muted-foreground h-4 w-4 shrink-0 transition-transform duration-200"
      />
    )}
  </CollapsiblePrimitive.CollapsibleTrigger>
));
CollapsibleTrigger.displayName = "CollapsibleTrigger";

/** Animated content panel — smoothly reveals/hides via data-state classes. */
const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleContent>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleContent
    ref={ref}
    className={cn(
      "overflow-hidden",
      "data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
      className
    )}
    {...props}
  />
));
CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
export type CollapsibleProps = React.ComponentPropsWithoutRef<typeof Collapsible>;
export type CollapsibleTriggerProps = React.ComponentPropsWithoutRef<typeof CollapsibleTrigger>;
export type CollapsibleContentProps = React.ComponentPropsWithoutRef<typeof CollapsibleContent>;

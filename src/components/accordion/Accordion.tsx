"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/cn";
import { radiusClass, type Radius } from "../../lib/radius";

// ─── Variant styles ───────────────────────────────────────────────────────────

type AccordionVariant = "default" | "contained" | "separated" | "filled";

const variantItemClass: Record<AccordionVariant, string> = {
  default: "border-b border-border",
  contained: "border-b border-border first:border-t",
  separated: "border border-border mb-2 last:mb-0",
  filled: "border-b border-border",
};

const variantContentClass: Record<AccordionVariant, string> = {
  default: "",
  contained: "",
  separated: "px-4",
  filled: "bg-muted/40",
};

const variantTriggerClass: Record<AccordionVariant, string> = {
  default: "",
  contained: "",
  separated: "px-4",
  filled: "px-4 data-[state=open]:bg-muted/40",
};

// ─── Context ──────────────────────────────────────────────────────────────────

interface AccordionContextValue {
  variant: AccordionVariant;
  radius: Radius;
  chevronPosition: "left" | "right";
}

const AccordionContext = React.createContext<AccordionContextValue>({
  variant: "default",
  radius: "none",
  chevronPosition: "right",
});

// ─── Root ─────────────────────────────────────────────────────────────────────

interface AccordionRootExtraProps {
  variant?: AccordionVariant;
  radius?: Radius;
  chevronPosition?: "left" | "right";
}

type AccordionRootProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> &
  AccordionRootExtraProps;

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionRootProps
>(
  (
    { className, variant = "default", radius = "none", chevronPosition = "right", ...props },
    ref
  ) => (
    <AccordionContext.Provider value={{ variant, radius, chevronPosition }}>
      <AccordionPrimitive.Root
        ref={ref}
        className={cn(
          variant === "contained" && ["border-border overflow-hidden border", radiusClass[radius]],
          className
        )}
        {...props}
      />
    </AccordionContext.Provider>
  )
);
Accordion.displayName = "Accordion";

// ─── Item ─────────────────────────────────────────────────────────────────────

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
  const { variant, radius } = React.useContext(AccordionContext);
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(
        variantItemClass[variant],
        variant === "separated" && radiusClass[radius],
        className
      )}
      {...props}
    />
  );
});
AccordionItem.displayName = "AccordionItem";

// ─── Trigger ──────────────────────────────────────────────────────────────────

interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
> {
  /** Hide the chevron entirely. */
  hideChevron?: boolean;
}

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, hideChevron = false, ...props }, ref) => {
  const { variant, chevronPosition } = React.useContext(AccordionContext);
  const chevron = !hideChevron && (
    <ChevronDown
      aria-hidden="true"
      className={cn(
        "text-muted-foreground h-4 w-4 shrink-0 transition-transform duration-200",
        chevronPosition === "left" && "mr-2",
        chevronPosition === "right" && "ml-auto"
      )}
    />
  );

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center py-4 text-left text-sm font-medium transition-all hover:underline",
          "[&[data-state=open]>svg]:rotate-180",
          variantTriggerClass[variant],
          className
        )}
        {...props}
      >
        {chevronPosition === "left" && chevron}
        {children}
        {chevronPosition === "right" && chevron}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

// ─── Content ──────────────────────────────────────────────────────────────────

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const { variant } = React.useContext(AccordionContext);
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",
        variantContentClass[variant]
      )}
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
export type { AccordionVariant };
export type AccordionProps = React.ComponentPropsWithoutRef<typeof Accordion>;
export type AccordionItemProps = React.ComponentPropsWithoutRef<typeof AccordionItem>;
export type { AccordionTriggerProps };
export type AccordionContentProps = React.ComponentPropsWithoutRef<typeof AccordionContent>;

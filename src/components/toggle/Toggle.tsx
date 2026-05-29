import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";
import { radiusClass, type Radius } from "../../lib/radius";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        sm: "h-8 px-2.5 text-xs [&_svg]:size-3.5",
        md: "h-9 px-3 [&_svg]:size-4",
        lg: "h-10 px-4 [&_svg]:size-4",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

export interface ToggleProps
  extends
    React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    VariantProps<typeof toggleVariants> {
  radius?: Radius;
}

const Toggle = React.forwardRef<React.ElementRef<typeof TogglePrimitive.Root>, ToggleProps>(
  ({ className, variant, size, radius = "md", ...props }, ref) => (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(toggleVariants({ variant, size }), radiusClass[radius], className)}
      {...props}
    />
  )
);
Toggle.displayName = "Toggle";

// ─── ToggleGroup ──────────────────────────────────────────────────────────────

type ToggleGroupContextValue = VariantProps<typeof toggleVariants> & { radius?: Radius };
const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  size: "md",
  variant: "default",
  radius: "md",
});

type ToggleGroupProps = React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants> & { radius?: Radius };

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupProps
>(({ className, variant, size, radius = "md", children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size, radius }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));
ToggleGroup.displayName = "ToggleGroup";

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants> & { radius?: Radius }
>(({ className, children, variant, size, radius, ...props }, ref) => {
  const ctx = React.useContext(ToggleGroupContext);
  const resolvedRadius = radius ?? ctx.radius ?? "md";
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({ variant: variant ?? ctx.variant, size: size ?? ctx.size }),
        radiusClass[resolvedRadius],
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});
ToggleGroupItem.displayName = "ToggleGroupItem";

export { Toggle, toggleVariants, ToggleGroup, ToggleGroupItem };

"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../../lib/cn";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../collapsible/Collapsible";
import { Badge } from "../badge/Badge";

// ─── NavItem ─────────────────────────────────────────────────────────────────

export interface NavItemProps extends Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "children"
> {
  /** Optional icon rendered before the label. */
  icon?: React.ReactNode;
  /** The visible navigation label. */
  label: string;
  /** Marks this item as the currently active route. */
  active?: boolean;
  /** Badge content — a short count or status string shown on the trailing edge. */
  badge?: string | number;
  /** Renders the item in a disabled state. */
  disabled?: boolean;
  /** Render as a button (no href) */
  asButton?: boolean;
  /** Sub-navigation items rendered in a collapsible group. */
  children?: React.ReactNode;
  /** Default open state for sub-items. Defaults to false. */
  defaultOpen?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const itemBase =
  "group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const itemVariants = {
  default: "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
  active: "bg-accent text-accent-foreground",
  disabled: "pointer-events-none opacity-40 text-muted-foreground",
};

export const NavItem = React.forwardRef<HTMLElement, NavItemProps>(
  (
    {
      icon,
      label,
      active = false,
      badge,
      disabled = false,
      asButton = false,
      children,
      defaultOpen = false,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const stateClass = disabled
      ? itemVariants.disabled
      : active
        ? itemVariants.active
        : itemVariants.default;

    const content = (
      <>
        {icon && (
          <span className="flex h-4 w-4 shrink-0 items-center justify-center" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="flex-1 truncate">{label}</span>
        {badge !== undefined && (
          <Badge size="sm" variant={active ? "secondary" : "outline"}>
            {badge}
          </Badge>
        )}
        {children && (
          <ChevronRight
            className="ml-auto h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-90"
            aria-hidden="true"
          />
        )}
      </>
    );

    if (children) {
      return (
        <Collapsible defaultOpen={defaultOpen} disabled={disabled}>
          <CollapsibleTrigger className={cn(itemBase, stateClass, className)} onClick={onClick}>
            {content}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="border-border mt-0.5 ml-4 flex flex-col gap-0.5 border-l pl-3">
              {children}
            </div>
          </CollapsibleContent>
        </Collapsible>
      );
    }

    if (asButton || !props.href) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          className={cn(itemBase, stateClass, className)}
          disabled={disabled}
          aria-current={active ? "page" : undefined}
          onClick={onClick}
          type="button"
        >
          {content}
        </button>
      );
    }

    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={cn(itemBase, stateClass, className)}
        aria-current={active ? "page" : undefined}
        aria-disabled={disabled || undefined}
        onClick={onClick}
        {...props}
      >
        {content}
      </a>
    );
  }
);
NavItem.displayName = "NavItem";

// ─── NavGroup ─────────────────────────────────────────────────────────────────

export interface NavGroupProps {
  /** Section heading shown above the items. */
  label?: string;
  children: React.ReactNode;
  className?: string;
}

export function NavGroup({ label, children, className }: NavGroupProps) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      {label && (
        <p className="text-muted-foreground mb-1 px-3 text-xs font-semibold tracking-wider uppercase select-none">
          {label}
        </p>
      )}
      {children}
    </div>
  );
}
NavGroup.displayName = "NavGroup";

"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "../../lib/cn";
import { buttonVariants } from "../button/Button";
import { type Size } from "../../lib/size";

const paginationItemSizeClass: Record<Size, string> = {
  xs: "h-6 w-6 text-xs",
  sm: "h-8 w-8 text-sm",
  md: "h-9 w-9 text-sm",
  lg: "h-10 w-10 text-base",
  xl: "h-11 w-11 text-base",
};

const PaginationRoot = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
PaginationRoot.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  size?: Size;
} & React.ComponentProps<"a">;

const PaginationLink = ({ className, isActive, size = "md", ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({ variant: isActive ? "outline" : "ghost" }),
      "p-0",
      paginationItemSizeClass[size],
      isActive && "border-primary text-primary",
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({ className, size, disabled, ...props }: React.ComponentProps<"a"> & { size?: Size; disabled?: boolean }) => (
  <PaginationLink
    aria-label="Go to previous page"
    aria-disabled={disabled || undefined}
    size={size}
    className={cn("gap-1 w-auto px-3", disabled && "pointer-events-none opacity-50", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({ className, size, disabled, ...props }: React.ComponentProps<"a"> & { size?: Size; disabled?: boolean }) => (
  <PaginationLink
    aria-label="Go to next page"
    aria-disabled={disabled || undefined}
    size={size}
    className={cn("gap-1 w-auto px-3", disabled && "pointer-events-none opacity-50", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({ className, size = "md", ...props }: React.ComponentProps<"span"> & { size?: Size }) => (
  <span
    aria-hidden
    className={cn("flex items-center justify-center", paginationItemSizeClass[size], className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  PaginationRoot as Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};

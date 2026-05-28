"use client";

import { Toaster as Sonner, toast } from "sonner";
import { cn } from "../../lib/cn";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ToasterPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToasterProps {
  position?: ToasterPosition;
  richColors?: boolean;
  closeButton?: boolean;
  expand?: boolean;
  duration?: number;
  className?: string;
}

// ─── Toaster ─────────────────────────────────────────────────────────────────

export function Toaster({
  position = "bottom-right",
  richColors = true,
  closeButton = false,
  expand = false,
  duration = 4000,
  className
}: ToasterProps) {
  return (
    <Sonner
      position={position}
      richColors={richColors}
      closeButton={closeButton}
      expand={expand}
      duration={duration}
      className={cn(className)}
      toastOptions={{
        classNames: {
          toast: "font-sans",
          title: "font-medium",
          description: "text-sm"
        }
      }}
    />
  );
}

// Re-export toast() and all its methods (success/error/warning/info/loading/promise/dismiss/custom)
export { toast };

"use client";

import { Toaster as Sonner, toast as sonnerToast } from "sonner";
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

// ─── toast() API ─────────────────────────────────────────────────────────────

export const toast = Object.assign(
  (message: string, options?: Parameters<typeof sonnerToast>[1]) =>
    sonnerToast(message, options),
  {
    success: (message: string, options?: Parameters<typeof sonnerToast.success>[1]) =>
      sonnerToast.success(message, options),
    error: (message: string, options?: Parameters<typeof sonnerToast.error>[1]) =>
      sonnerToast.error(message, options),
    warning: (message: string, options?: Parameters<typeof sonnerToast.warning>[1]) =>
      sonnerToast.warning(message, options),
    info: (message: string, options?: Parameters<typeof sonnerToast.info>[1]) =>
      sonnerToast.info(message, options),
    loading: (message: string, options?: Parameters<typeof sonnerToast.loading>[1]) =>
      sonnerToast.loading(message, options),
    promise: sonnerToast.promise,
    dismiss: sonnerToast.dismiss,
    custom: sonnerToast.custom
  }
);

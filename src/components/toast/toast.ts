"use client";

import { toast as sonnerToast } from "sonner";

type ToastOptions = Parameters<typeof sonnerToast>[1];

interface ToastApi {
  success: (message: string, options?: ToastOptions) => ReturnType<typeof sonnerToast.success>;
  error: (message: string, options?: ToastOptions) => ReturnType<typeof sonnerToast.error>;
  info: (message: string, options?: ToastOptions) => ReturnType<typeof sonnerToast.info>;
  warning: (message: string, options?: ToastOptions) => ReturnType<typeof sonnerToast.warning>;
  loading: (message: string, options?: ToastOptions) => ReturnType<typeof sonnerToast.loading>;
  dismiss: (id?: string | number) => ReturnType<typeof sonnerToast.dismiss>;
  promise: typeof sonnerToast.promise;
}

const withOptionalOptions = <TResult>(
  fn: (message: string, options?: ToastOptions) => TResult,
  message: string,
  options?: ToastOptions
) => (options === undefined ? fn(message) : fn(message, options));

export const toast: ToastApi = {
  success: (message: string, options?: ToastOptions) =>
    withOptionalOptions(sonnerToast.success, message, options),
  error: (message: string, options?: ToastOptions) =>
    withOptionalOptions(sonnerToast.error, message, options),
  info: (message: string, options?: ToastOptions) =>
    withOptionalOptions(sonnerToast.info, message, options),
  warning: (message: string, options?: ToastOptions) =>
    withOptionalOptions(sonnerToast.warning, message, options),
  loading: (message: string, options?: ToastOptions) =>
    withOptionalOptions(sonnerToast.loading, message, options),
  dismiss: (id?: string | number) => sonnerToast.dismiss(id),
  promise: sonnerToast.promise,
};

export type { ExternalToast } from "sonner";

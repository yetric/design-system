"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormProps } from "react-hook-form";
import { type z } from "zod";

/**
 * Convenience hook: `useForm` pre-wired with `zodResolver`.
 *
 * @example
 * const schema = z.object({ email: z.string().email() });
 * const form = useZodForm({ schema, defaultValues: { email: "" } });
 */
export function useZodForm<TSchema extends z.ZodType>({
  schema,
  ...formProps
}: UseFormProps<z.infer<TSchema>> & { schema: TSchema }) {
  return useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema),
    ...formProps
  });
}

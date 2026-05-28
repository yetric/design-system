"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormProps, type UseFormReturn, type FieldValues } from "react-hook-form";
import { type z } from "zod";

/**
 * Convenience hook: `useForm` pre-wired with `zodResolver`.
 * `TOut` is inferred from the schema's output type — `defaultValues` is typed as `DeepPartial<TOut>`.
 *
 * @example
 * const schema = z.object({ email: z.string().email() });
 * const form = useZodForm({ schema, defaultValues: { email: "" } });
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useZodForm<TSchema extends z.ZodType<FieldValues, any, any>>({
  schema,
  ...formProps
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: { schema: TSchema } & UseFormProps<z.infer<TSchema>>): UseFormReturn<z.infer<TSchema>> {
  return useForm<z.infer<TSchema>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any) as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(formProps as UseFormProps<z.infer<TSchema>>),
  });
}

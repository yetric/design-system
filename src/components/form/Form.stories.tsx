import type { Meta, StoryObj } from "@storybook/react-vite";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "./Form";
import { useZodForm } from "./useZodForm";
import { Input } from "../input/Input";
import { Button } from "../button/Button";
import { Toaster, toast } from "../toast/Toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card/Card";
import { Separator } from "../separator/Separator";

const meta: Meta = {
  title: "Patterns/Form",
  parameters: { layout: "centered" }
};

export default meta;
type Story = StoryObj;

// ─── Login form ───────────────────────────────────────────────────────────────

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

function LoginForm() {
  const form = useZodForm({
    schema: loginSchema,
    defaultValues: { email: "", password: "" }
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    toast.success(`Signed in as ${values.email}`);
  }

  return (
    <>
      <Toaster />
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Enter your credentials to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}

export const Login: Story = {
  name: "Login Form",
  render: () => <LoginForm />
};

// ─── Registration form ────────────────────────────────────────────────────────

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[0-9]/, "Must contain a number")
});

function RegistrationForm() {
  const form = useZodForm({
    schema: registerSchema,
    defaultValues: { name: "", email: "", password: "" }
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    toast.success(`Account created for ${values.email}`);
  }

  return (
    <>
      <Toaster />
      <Card className="w-[420px]">
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          <CardDescription>Fill in your details to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input placeholder="Alice Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="alice@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormDescription>
                      8+ characters, one uppercase, one number.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />
              <Button type="submit" className="w-full">
                Create account
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}

export const Registration: Story = {
  name: "Registration Form",
  render: () => <RegistrationForm />
};

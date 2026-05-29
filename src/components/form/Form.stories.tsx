import type { Meta, StoryObj } from "@storybook/react-vite";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./Form";
import { useZodForm } from "./useZodForm";
import { Input } from "../input/Input";
import { Button } from "../button/Button";
import { Toaster, toast } from "../toast/Toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card/Card";
import { Separator } from "../separator/Separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select/Select";
import { Checkbox } from "../checkbox/Checkbox";
import { RadioGroup, RadioGroupItem } from "../radio-group/RadioGroup";

const meta: Meta = {
  tags: ["autodocs"],
  title: "Patterns/Form",
  parameters: { layout: "centered" },
  argTypes: {},
};

export default meta;
type Story = StoryObj;

// ─── Login form ───────────────────────────────────────────────────────────────

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function LoginForm() {
  const form = useZodForm({
    schema: loginSchema,
    defaultValues: { email: "", password: "" },
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
  render: () => <LoginForm />,
};

// ─── Registration form ────────────────────────────────────────────────────────

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[0-9]/, "Must contain a number"),
});

function RegistrationForm() {
  const form = useZodForm({
    schema: registerSchema,
    defaultValues: { name: "", email: "", password: "" },
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
                    <FormDescription>8+ characters, one uppercase, one number.</FormDescription>
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
  render: () => <RegistrationForm />,
};

// ─── Select form ─────────────────────────────────────────────────────────────

const selectSchema = z.object({
  country: z.string().min(1, "Please select a country"),
  timezone: z.string().min(1, "Please select a timezone"),
});

function SelectForm() {
  const form = useZodForm({
    schema: selectSchema,
    defaultValues: { country: "", timezone: "" },
  });

  function onSubmit(values: z.infer<typeof selectSchema>) {
    toast.success(`Saved: ${values.country} / ${values.timezone}`);
  }

  return (
    <>
      <Toaster />
      <Card className="w-[420px]">
        <CardHeader>
          <CardTitle>Location settings</CardTitle>
          <CardDescription>Choose your country and timezone</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-4">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="se">Sweden</SelectItem>
                        <SelectItem value="no">Norway</SelectItem>
                        <SelectItem value="dk">Denmark</SelectItem>
                        <SelectItem value="fi">Finland</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                        <SelectItem value="gb">United Kingdom</SelectItem>
                        <SelectItem value="us">United States</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timezone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timezone</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a timezone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="europe/stockholm">Europe/Stockholm (UTC+1)</SelectItem>
                        <SelectItem value="europe/london">Europe/London (UTC+0)</SelectItem>
                        <SelectItem value="america/new_york">America/New_York (UTC−5)</SelectItem>
                        <SelectItem value="america/los_angeles">
                          America/Los_Angeles (UTC−8)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Save settings
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}

export const SelectExample: Story = {
  name: "Select Fields",
  render: () => <SelectForm />,
};

// ─── Checkbox form ────────────────────────────────────────────────────────────

const checkboxSchema = z.object({
  notifications: z.object({
    email: z.boolean().default(false),
    sms: z.boolean().default(false),
    push: z.boolean().default(false),
  }),
  terms: z.boolean().refine((v) => v === true, { message: "You must accept the terms" }),
});

function CheckboxForm() {
  const form = useZodForm({
    schema: checkboxSchema,
    defaultValues: {
      notifications: { email: false, sms: false, push: false },
      terms: false,
    },
  });

  function onSubmit(values: z.infer<typeof checkboxSchema>) {
    const enabled =
      Object.entries(values.notifications)
        .filter(([, v]) => v)
        .map(([k]) => k)
        .join(", ") || "none";
    toast.success(`Saved! Notifications: ${enabled}`);
  }

  return (
    <>
      <Toaster />
      <Card className="w-[420px]">
        <CardHeader>
          <CardTitle>Notification preferences</CardTitle>
          <CardDescription>Choose how you want to be notified</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Notify me via</p>
                {(["email", "sms", "push"] as const).map((channel) => (
                  <FormField
                    key={channel}
                    control={form.control}
                    name={`notifications.${channel}`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-y-0 space-x-3">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel className="font-normal capitalize">{channel}</FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <Separator />
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>I accept the terms and conditions</FormLabel>
                      <FormDescription>
                        You agree to our Terms of Service and Privacy Policy.
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Save preferences
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}

export const CheckboxExample: Story = {
  name: "Checkbox Fields",
  render: () => <CheckboxForm />,
};

// ─── RadioGroup form ──────────────────────────────────────────────────────────

const radioSchema = z.object({
  plan: z.enum(["free", "pro", "enterprise"] as const, {
    message: "Please select a plan",
  }),
  billing: z.enum(["monthly", "annual"] as const, {
    message: "Please select a billing cycle",
  }),
});

function RadioForm() {
  const form = useZodForm({
    schema: radioSchema,
    defaultValues: { billing: "monthly" as "monthly" | "annual" },
  });

  function onSubmit(values: z.infer<typeof radioSchema>) {
    toast.success(`Plan: ${values.plan} (${values.billing})`);
  }

  return (
    <>
      <Toaster />
      <Card className="w-[420px]">
        <CardHeader>
          <CardTitle>Choose a plan</CardTitle>
          <CardDescription>Select the plan that works best for you</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-6">
              <FormField
                control={form.control}
                name="plan"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Plan</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <RadioGroupItem value="free" label="Free — up to 3 projects" />
                        <RadioGroupItem value="pro" label="Pro — unlimited projects, $12/mo" />
                        <RadioGroupItem value="enterprise" label="Enterprise — custom pricing" />
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="billing"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Billing cycle</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row gap-6"
                      >
                        <RadioGroupItem value="monthly" label="Monthly" />
                        <RadioGroupItem value="annual" label="Annual (save 20%)" />
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Continue
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}

export const RadioExample: Story = {
  name: "Radio Group Fields",
  render: () => <RadioForm />,
};

// ─── Kitchen sink ─────────────────────────────────────────────────────────────

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  role: z.enum(["admin", "editor", "viewer"] as const, { message: "Select a role" }),
  country: z.string().min(1, "Select a country"),
  updates: z.boolean().default(false),
  terms: z.boolean().refine((v) => v === true, { message: "You must accept the terms" }),
});

function ProfileForm() {
  const form = useZodForm({
    schema: profileSchema,
    defaultValues: { name: "", email: "", country: "", updates: false, terms: false },
  });

  function onSubmit(values: z.infer<typeof profileSchema>) {
    toast.success(`Profile saved for ${values.email}`);
    console.log(values);
  }

  return (
    <>
      <Toaster />
      <Card className="w-[480px]">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>All field types in one form</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Alice" {...field} />
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
              </div>
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="se">Sweden</SelectItem>
                        <SelectItem value="no">Norway</SelectItem>
                        <SelectItem value="gb">United Kingdom</SelectItem>
                        <SelectItem value="us">United States</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-4"
                      >
                        <RadioGroupItem value="admin" label="Admin" />
                        <RadioGroupItem value="editor" label="Editor" />
                        <RadioGroupItem value="viewer" label="Viewer" />
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />
              <FormField
                control={form.control}
                name="updates"
                render={({ field }) => (
                  <FormItem className="flex items-center space-y-0 space-x-3">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="font-normal">Send me product updates</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex items-start space-y-0 space-x-3">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div>
                      <FormLabel>Accept terms and conditions</FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Save profile
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}

export const KitchenSink: Story = {
  name: "Kitchen Sink (all field types)",
  render: () => <ProfileForm />,
};

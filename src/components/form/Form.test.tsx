import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
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

const schema = z.object({
  email: z.string().email("Invalid email"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

function TestForm({ onSubmit = () => {} }: { onSubmit?: (data: z.infer<typeof schema>) => void }) {
  const form = useZodForm({ schema, defaultValues: { email: "", name: "" } });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormDescription>We'll never share your email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

describe("Form", () => {
  it("renders labels and inputs", () => {
    render(<TestForm />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("shows description text", () => {
    render(<TestForm />);
    expect(screen.getByText("We'll never share your email.")).toBeInTheDocument();
  });

  it("shows validation errors on invalid submit", async () => {
    const user = userEvent.setup();
    render(<TestForm />);
    await user.click(screen.getByRole("button", { name: "Submit" }));
    await waitFor(() => {
      expect(screen.getByText("Invalid email")).toBeInTheDocument();
    });
  });

  it("shows name validation error when too short", async () => {
    const user = userEvent.setup();
    render(<TestForm />);
    await user.type(screen.getByLabelText("Name"), "a");
    await user.click(screen.getByRole("button", { name: "Submit" }));
    await waitFor(() => {
      expect(screen.getByText("Name must be at least 2 characters")).toBeInTheDocument();
    });
  });

  it("calls onSubmit with valid data", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<TestForm onSubmit={handleSubmit} />);
    await user.type(screen.getByLabelText("Email"), "test@example.com");
    await user.type(screen.getByLabelText("Name"), "Alice");
    await user.click(screen.getByRole("button", { name: "Submit" }));
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith(
        { email: "test@example.com", name: "Alice" },
        expect.anything()
      );
    });
  });

  it("clears error after valid input", async () => {
    const user = userEvent.setup();
    render(<TestForm />);
    await user.click(screen.getByRole("button", { name: "Submit" }));
    await waitFor(() => expect(screen.getByText("Invalid email")).toBeInTheDocument());
    await user.type(screen.getByLabelText("Email"), "valid@example.com");
    await waitFor(() => expect(screen.queryByText("Invalid email")).not.toBeInTheDocument());
  });

  it("FormMessage renders role=alert", async () => {
    const user = userEvent.setup();
    render(<TestForm />);
    await user.click(screen.getByRole("button", { name: "Submit" }));
    await waitFor(() => {
      const alerts = screen.getAllByRole("alert");
      expect(alerts.length).toBeGreaterThan(0);
    });
  });
});

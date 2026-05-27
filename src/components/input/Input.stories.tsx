import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label } from "../label";
import { Input } from "./Input";

const meta = {
  component: Input,
  args: {
    placeholder: "Enter text"
  }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="default">Username</Label>
      <Input id="default" placeholder="mattias" />
    </div>
  )
};

export const Types: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Input type="text" placeholder="Text" />
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Input type="search" placeholder="Search…" />
      <Input type="number" placeholder="Number" />
    </div>
  )
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Not available"
  }
};

export const Error: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="error" required>Email</Label>
      <Input id="error" type="email" error placeholder="you@example.com" />
      <p className="text-xs text-destructive">Enter a valid email address.</p>
    </div>
  )
};

export const FullFormField: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="fname">First name</Label>
        <Input id="fname" placeholder="Mattias" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="femail" required>Email</Label>
        <Input id="femail" type="email" placeholder="you@example.com" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="fpass" required>Password</Label>
        <Input id="fpass" type="password" error placeholder="Min 8 characters" />
        <p className="text-xs text-destructive">Password must be at least 8 characters.</p>
      </div>
    </div>
  )
};

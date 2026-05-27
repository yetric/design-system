import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "../input";
import { Label } from "./Label";

const meta = {
  component: Label,
  args: {
    children: "Email address"
  }
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = {
  args: {
    required: true,
    children: "Password"
  }
};

export const WithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="email">Email address</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  )
};

export const RequiredWithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="name" required>Full name</Label>
      <Input id="name" placeholder="Mattias Hising" />
    </div>
  )
};

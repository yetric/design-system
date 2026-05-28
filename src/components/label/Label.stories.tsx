import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "./Label";
import { Input } from "../input/Input";
import { Checkbox } from "../checkbox/Checkbox";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  parameters: { layout: "centered" }
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render: () => <Label>Email address</Label>
};

export const Required: Story = {
  name: "Required",
  render: () => <Label required>Full name</Label>
};

export const WithInput: Story = {
  name: "Paired with Input",
  render: () => (
    <div className="flex flex-col gap-1.5 w-64">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  )
};

export const RequiredWithInput: Story = {
  name: "Required with Input",
  render: () => (
    <div className="flex flex-col gap-1.5 w-64">
      <Label htmlFor="username" required>Username</Label>
      <Input id="username" placeholder="johndoe" />
    </div>
  )
};

export const WithCheckbox: Story = {
  name: "Paired with Checkbox",
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">I agree to the terms and conditions</Label>
    </div>
  )
};

export const DisabledPeer: Story = {
  name: "Disabled peer state",
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="disabled-check" disabled />
      <Label htmlFor="disabled-check" className="peer">
        Cannot change this option
      </Label>
    </div>
  )
};

export const AllVariants: Story = {
  name: "All variants",
  render: () => (
    <div className="flex flex-col gap-4">
      <Label>Standard label</Label>
      <Label required>Required label</Label>
      <Label className="text-muted-foreground">Muted label</Label>
      <Label className="text-destructive">Error label</Label>
    </div>
  )
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Mail, Search, Eye, Lock } from "lucide-react";

import { Input } from "./Input";

const meta = {
  component: Input,
  tags: ["autodocs"],
  args: {
    placeholder: "Placeholder…"
  }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-sm">
      <Input size="xs" placeholder="Extra small" />
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
      <Input size="xl" placeholder="Extra large" />
    </div>
  )
};

export const WithError: Story = {
  args: {
    error: true,
    placeholder: "Invalid value",
    defaultValue: "wrong@"
  }
};

export const WithLeadingIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-sm">
      <Input leftIcon={<Search />} placeholder="Search…" />
      <Input leftIcon={<Mail />} placeholder="Email address" />
      <Input leftIcon={<Lock />} type="password" placeholder="Password" />
    </div>
  )
};

export const WithTrailingIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-sm">
      <Input rightIcon={<Eye />} type="password" placeholder="Password" />
    </div>
  )
};

export const WithBothIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-sm">
      <Input leftIcon={<Mail />} rightIcon={<Eye />} placeholder="Email" />
    </div>
  )
};

export const IconSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-sm">
      <Input size="xs" leftIcon={<Search />} placeholder="xs" />
      <Input size="sm" leftIcon={<Search />} placeholder="sm" />
      <Input size="md" leftIcon={<Search />} placeholder="md" />
      <Input size="lg" leftIcon={<Search />} placeholder="lg" />
      <Input size="xl" leftIcon={<Search />} placeholder="xl" />
    </div>
  )
};

export const Radius: Story = {
  name: "Radius variants",
  render: () => (
    <div className="flex flex-col gap-3 max-w-sm">
      <Input radius="none" placeholder="radius: none" />
      <Input radius="sm" placeholder="radius: sm" />
      <Input radius="md" placeholder="radius: md (default)" />
      <Input radius="lg" placeholder="radius: lg" />
      <Input radius="xl" placeholder="radius: xl" />
      <Input radius="full" placeholder="radius: full" />
    </div>
  )
};

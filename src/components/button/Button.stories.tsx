import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { ArrowRight, Mail, Plus, Trash2 } from "lucide-react";

import { Button } from "./Button";

const meta = {
  component: Button,
  tags: ["ai-generated"],
  args: {
    children: "Save"
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="success">Success</Button>
      <Button variant="info">Info</Button>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Button size="xs">XSmall</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">XLarge</Button>
    </div>
  )
};

export const Radius: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button radius="none">None</Button>
      <Button radius="xs">XSmall</Button>
      <Button radius="sm">Small</Button>
      <Button radius="md">Medium</Button>
      <Button radius="lg">Large</Button>
      <Button radius="xl">XLarge</Button>
      <Button radius="full">Full</Button>
    </div>
  )
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled"
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Disabled" })).toHaveAttribute(
      "aria-disabled",
      "true"
    );
  }
};

export const AsChildLink: Story = {
  render: () => (
    <Button asChild>
      <a href="/docs">Read docs</a>
    </Button>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Read docs" })).toHaveAttribute(
      "href",
      "/docs"
    );
  }
};

export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button isLoading>Saving…</Button>
      <Button isLoading variant="secondary">Processing…</Button>
      <Button isLoading variant="destructive">Deleting…</Button>
    </div>
  )
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button leftIcon={<Mail size={16} />}>Send email</Button>
      <Button rightIcon={<ArrowRight size={16} />} variant="outline">Continue</Button>
      <Button leftIcon={<Plus size={16} />} variant="secondary">New item</Button>
      <Button leftIcon={<Trash2 size={16} />} variant="destructive">Delete</Button>
    </div>
  )
};

export const IconsAllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="xs" leftIcon={<Mail size={12} />}>xs</Button>
      <Button size="sm" leftIcon={<Mail size={14} />}>sm</Button>
      <Button size="md" leftIcon={<Mail size={16} />}>md</Button>
      <Button size="lg" leftIcon={<Mail size={18} />}>lg</Button>
      <Button size="xl" leftIcon={<Mail size={20} />}>xl</Button>
    </div>
  )
};

export const LoadingReplacesIcon: Story = {
  name: "Loading replaces leftIcon",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button leftIcon={<Mail size={16} />} isLoading={false}>Send email</Button>
      <Button leftIcon={<Mail size={16} />} isLoading={true}>Send email</Button>
    </div>
  )
};

export const CssCheck: Story = {
  args: {
    children: "Styled button"
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Styled button" });
    await expect(getComputedStyle(button).borderRadius).toBe("6px");
  }
};

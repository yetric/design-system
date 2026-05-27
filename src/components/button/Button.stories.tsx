import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

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
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
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

export const CssCheck: Story = {
  args: {
    children: "Styled button"
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Styled button" });
    await expect(getComputedStyle(button).borderRadius).toBe("6px");
  }
};

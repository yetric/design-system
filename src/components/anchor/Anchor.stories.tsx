import type { Meta, StoryObj } from "@storybook/react-vite";
import { Anchor } from "./Anchor";

const meta: Meta<typeof Anchor> = {
  title: "Components/Anchor",
  component: Anchor,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "muted", "destructive", "subtle"] },
    underline: { control: "select", options: ["always", "hover", "never"] },
    external: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Anchor>;

export const Default: Story = {
  args: { href: "#", children: "Read the docs" },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Anchor href="#" variant="default">
        Default link
      </Anchor>
      <Anchor href="#" variant="muted">
        Muted link
      </Anchor>
      <Anchor href="#" variant="destructive">
        Destructive link
      </Anchor>
    </div>
  ),
};

export const Underline: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Anchor href="#" underline="always">
        Always underlined
      </Anchor>
      <Anchor href="#" underline="hover">
        Underline on hover (default)
      </Anchor>
      <Anchor href="#" underline="never">
        Never underlined
      </Anchor>
    </div>
  ),
};

export const External: Story = {
  render: () => (
    <Anchor href="https://github.com" external>
      GitHub
    </Anchor>
  ),
};

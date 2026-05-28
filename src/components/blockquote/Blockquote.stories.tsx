import type { Meta, StoryObj } from "@storybook/react-vite";
import { Blockquote } from "./Blockquote";

const meta: Meta<typeof Blockquote> = {
  title: "Components/Blockquote",
  component: Blockquote,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm","md","lg"] },
    cite: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof Blockquote>;

export const Default: Story = {
  args: {
    children: "Design is not just what it looks like. Design is how it works.",
    cite: "Steve Jobs",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Blockquote key={size} size={size} cite="Author">
          The quick brown fox jumps over the lazy dog.
        </Blockquote>
      ))}
    </div>
  ),
};

export const NoCite: Story = {
  args: {
    children: "A quote without attribution.",
  },
};

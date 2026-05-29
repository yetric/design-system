import type { Meta, StoryObj } from "@storybook/react-vite";
import { Rating } from "./Rating";

const meta: Meta<typeof Rating> = {
  title: "Components/Rating",
  component: Rating,
  tags: ["autodocs"],
  argTypes: {
    count: { control: { type: "range", min: 1, max: 10, step: 1 } },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    readOnly: { control: "boolean" },
    value: { control: { type: "range", min: 0, max: 10, step: 1 } },
  },
};
export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  args: { value: 3, count: 5 },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Rating key={size} value={3} size={size} />
      ))}
    </div>
  ),
};

export const ReadOnly: Story = {
  args: { value: 4, readOnly: true },
};

export const CustomCount: Story = {
  args: { value: 2, count: 10 },
};

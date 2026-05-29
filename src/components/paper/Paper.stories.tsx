import type { Meta, StoryObj } from "@storybook/react-vite";
import { Paper } from "./Paper";

const meta: Meta<typeof Paper> = {
  title: "Components/Paper",
  component: Paper,
  tags: ["autodocs"],
  argTypes: {
    shadow: { control: "select", options: ["none", "sm", "md", "lg", "xl"] },
    p: { control: "select", options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12] },
    radius: { control: "select", options: ["none", "xs", "sm", "md", "lg", "xl", "full"] },
  },
};
export default meta;
type Story = StoryObj<typeof Paper>;

export const Default: Story = {
  args: { children: "A simple paper surface." },
};

export const Shadows: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      {(["none", "sm", "md", "lg", "xl"] as const).map((s) => (
        <Paper key={s} shadow={s} className="w-40 text-center text-sm">
          shadow="{s}"
        </Paper>
      ))}
    </div>
  ),
};

export const Radii: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      {(["none", "sm", "md", "lg", "full"] as const).map((r) => (
        <Paper key={r} radius={r} className="w-40 text-center text-sm">
          radius="{r}"
        </Paper>
      ))}
    </div>
  ),
};

export const Padding: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      {([0, 2, 4, 8, 12] as const).map((p) => (
        <Paper key={p} p={p} className="w-40 text-center text-sm">
          p={p}
        </Paper>
      ))}
    </div>
  ),
};

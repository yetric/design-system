import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = { render: () => <Progress value={60} className="w-[300px]" /> };
export const Indeterminate: Story = { render: () => <Progress className="w-[300px]" /> };

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-[300px]">
      {(["default", "success", "warning", "destructive", "info"] as const).map((v) => (
        <div key={v} className="space-y-1">
          <p className="text-xs text-muted-foreground capitalize">{v}</p>
          <Progress value={65} variant={v} />
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-[300px]">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
        <div key={s} className="space-y-1">
          <p className="text-xs text-muted-foreground">{s}</p>
          <Progress value={70} size={s} />
        </div>
      ))}
    </div>
  ),
};

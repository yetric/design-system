import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = { args: { defaultChecked: false } };
export const Checked: Story = { args: { defaultChecked: true } };
export const WithLabel: Story = { args: { label: "Enable notifications", defaultChecked: false } };
export const WithLabelChecked: Story = { args: { label: "Dark mode", defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true, label: "Disabled (off)" } };
export const DisabledChecked: Story = { args: { disabled: true, defaultChecked: true, label: "Disabled (on)" } };

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Switch key={size} size={size} label={`Size: ${size}`} defaultChecked />
      ))}
    </div>
  ),
};

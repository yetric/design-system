import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label } from "../label/Label";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true }
};

export const Indeterminate: Story = {
  args: { checked: "indeterminate" }
};

export const Disabled: Story = {
  args: { disabled: true }
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true }
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
        <div key={s} className="flex items-center gap-2">
          <Checkbox id={`size-${s}`} size={s} defaultChecked />
          <Label htmlFor={`size-${s}`} className="text-sm">{s}</Label>
        </div>
      ))}
    </div>
  )
};

export const CheckboxList: Story = {
  render: () => (
    <fieldset className="flex flex-col gap-3 border-none p-0">
      <legend className="text-sm font-medium mb-1">Notifications</legend>
      {["Email", "Push", "SMS"].map((item) => (
        <div key={item} className="flex items-center gap-2">
          <Checkbox id={`notify-${item}`} />
          <Label htmlFor={`notify-${item}`}>{item}</Label>
        </div>
      ))}
    </fieldset>
  )
};

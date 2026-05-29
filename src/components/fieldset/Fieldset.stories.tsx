import type { Meta, StoryObj } from "@storybook/react-vite";
import { Fieldset } from "./Fieldset";
import { Input } from "../input/Input";
import { Checkbox } from "../checkbox/Checkbox";
import { Label } from "../label/Label";

const meta: Meta<typeof Fieldset> = {
  component: Fieldset,
  tags: ["autodocs"],
  title: "Components/Fieldset",
  argTypes: {
    legend: { control: "text" },
    disabled: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Fieldset legend="Personal information" className="max-w-sm">
      <div className="flex flex-col gap-3">
        <Input placeholder="First name" />
        <Input placeholder="Last name" />
        <Input placeholder="Email" type="email" />
      </div>
    </Fieldset>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Fieldset legend="Disabled section" disabled className="max-w-sm">
      <div className="flex flex-col gap-3">
        <Input placeholder="Cannot edit" />
        <div className="flex items-center gap-2">
          <Checkbox id="cb1" />
          <Label htmlFor="cb1">Agree to terms</Label>
        </div>
      </div>
    </Fieldset>
  ),
};

export const NoLegend: Story = {
  render: () => (
    <Fieldset className="max-w-sm">
      <Input placeholder="Input without legend" />
    </Fieldset>
  ),
};

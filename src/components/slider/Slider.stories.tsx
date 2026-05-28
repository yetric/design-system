import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size:     { control: "select", options: ["sm","md","lg"] },
    disabled: { control: "boolean" },
    min:      { control: "number" },
    max:      { control: "number" },
    step:     { control: "number" },
  },
};
export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: () => <Slider defaultValue={[50]} max={100} step={1} className="w-[300px]" />,
};

export const Range: Story = {
  render: () => <Slider defaultValue={[20, 80]} max={100} step={1} className="w-[300px]" />,
};

export const WithSteps: Story = {
  render: () => <Slider defaultValue={[3]} max={10} step={1} className="w-[300px]" />,
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState([40]);
    return (
      <div className="space-y-3 w-[300px]">
        <Slider value={value} onValueChange={setValue} max={100} />
        <p className="text-sm text-center text-muted-foreground">Value: {value[0]}</p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => <Slider defaultValue={[60]} disabled className="w-[300px]" />,
};

export const Sizes: Story = {
  name: "Size variants",
  render: () => (
    <div className="flex flex-col gap-6 w-[300px]">
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">sm</p>
        <Slider defaultValue={[40]} size="sm" />
      </div>
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">md (default)</p>
        <Slider defaultValue={[60]} size="md" />
      </div>
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">lg</p>
        <Slider defaultValue={[80]} size="lg" />
      </div>
    </div>
  ),
};

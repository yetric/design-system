import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <RadioGroupItem value="default"     label="Default"     />
      <RadioGroupItem value="comfortable" label="Comfortable" />
      <RadioGroupItem value="compact"     label="Compact"     />
    </RadioGroup>
  )
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="yes" className="flex flex-row gap-6">
      <RadioGroupItem value="yes" label="Yes" />
      <RadioGroupItem value="no"  label="No"  />
    </RadioGroup>
  )
};

export const WithDisabled: Story = {
  render: () => (
    <RadioGroup defaultValue="a">
      <RadioGroupItem value="a" label="Active"   />
      <RadioGroupItem value="b" label="Disabled" disabled />
      <RadioGroupItem value="c" label="Also active" />
    </RadioGroup>
  )
};

export const Sizes: Story = {
  name: "Size variants",
  render: () => (
    <div className="flex flex-col gap-4">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
        <div key={s} className="space-y-1">
          <p className="text-xs text-muted-foreground">size: {s}</p>
          <RadioGroup defaultValue="a" className="flex flex-row gap-4">
            <RadioGroupItem value="a" label="Option A" size={s} />
            <RadioGroupItem value="b" label="Option B" size={s} />
          </RadioGroup>
        </div>
      ))}
    </div>
  )
};

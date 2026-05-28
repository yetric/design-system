import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  parameters: { layout: "centered" }
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

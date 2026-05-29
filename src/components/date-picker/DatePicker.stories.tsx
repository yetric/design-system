import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { DatePicker } from "./DatePicker";

const meta = {
  component: DatePicker,
  title: "Components/DatePicker",
  tags: ["autodocs"],
  args: {
    placeholder: "Pick a date",
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

const today = new Date(2026, 4, 29);

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<Date | undefined>();

    return <DatePicker value={value} onChange={setValue} />;
  },
};

export const WithValue: Story = {
  args: {
    value: today,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: today,
  },
};

export const WithMinMax: Story = {
  render: () => {
    const [value, setValue] = useState<Date | undefined>(new Date(2026, 4, 15));

    return (
      <DatePicker
        value={value}
        onChange={setValue}
        minDate={new Date(2026, 4, 10)}
        maxDate={new Date(2026, 4, 20)}
      />
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<Date | undefined>(today);

    return (
      <div className="space-y-2">
        <DatePicker value={value} onChange={setValue} />
        <p className="text-sm text-muted-foreground">Selected: {value?.toDateString() ?? "None"}</p>
      </div>
    );
  },
};

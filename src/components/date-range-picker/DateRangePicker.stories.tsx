import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { DateRangePicker, type DateRange } from "./DateRangePicker";

const meta = {
  component: DateRangePicker,
  title: "Components/DateRangePicker",
  tags: ["autodocs"],
  args: {
    placeholder: "Pick a date range",
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DateRangePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

const initialRange: DateRange = {
  from: new Date(2026, 4, 29),
  to: new Date(2026, 5, 2),
};

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<DateRange | undefined>();

    return <DateRangePicker value={value} onChange={setValue} />;
  },
};

export const WithValue: Story = {
  args: {
    value: initialRange,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: initialRange,
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<DateRange | undefined>(initialRange);

    return (
      <div className="space-y-2">
        <DateRangePicker value={value} onChange={setValue} />
        <p className="text-sm text-muted-foreground">
          Selected: {value?.from?.toDateString() ?? "None"} → {value?.to?.toDateString() ?? "None"}
        </p>
      </div>
    );
  },
};

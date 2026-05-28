import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MultiSelect } from "./MultiSelect";

const techOptions = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" },
  { value: "nextjs", label: "Next.js" },
  { value: "nuxt", label: "Nuxt" },
];

const meta: Meta<typeof MultiSelect> = {
  component: MultiSelect,
  tags: ["autodocs"],
  title: "Components/MultiSelect",
  argTypes: {
    placeholder: { control: "text" },
    disabled:    { control: "boolean" },
    size:        { control: "select", options: ["xs","sm","md","lg","xl"] },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [v, setV] = useState<string[]>([]);
    return (
      <div className="w-80">
        <MultiSelect
          options={techOptions}
          value={v}
          onChange={setV}
          label="Frameworks"
          placeholder="Select frameworks…"
        />
      </div>
    );
  },
};

export const Preselected: Story = {
  render: () => {
    const [v, setV] = useState<string[]>(["react", "nextjs"]);
    return (
      <div className="w-80">
        <MultiSelect options={techOptions} value={v} onChange={setV} />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => (
    <div className="w-80">
      <MultiSelect
        options={techOptions}
        value={[]}
        onChange={() => {}}
        label="Required field"
        error="Please select at least one option."
      />
    </div>
  ),
};

export const MaxValues: Story = {
  render: () => {
    const [v, setV] = useState<string[]>([]);
    return (
      <div className="w-80">
        <MultiSelect
          options={techOptions}
          value={v}
          onChange={setV}
          maxValues={2}
          label="Pick up to 2"
          helpText="Maximum 2 selections allowed."
          placeholder="Select up to 2…"
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [v, setV] = useState<string[]>(["react"]);
    return (
      <div className="flex flex-col gap-4 w-80">
        {(["sm", "md", "lg"] as const).map((size) => (
          <MultiSelect key={size} options={techOptions} value={v} onChange={setV} size={size} placeholder={`Size: ${size}`} />
        ))}
      </div>
    );
  },
};

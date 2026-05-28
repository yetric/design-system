import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chip } from "./Chip";

const meta = { component: Chip } satisfies Meta<typeof Chip>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: "React" } };

export const ToggleGroup: Story = {
  render: () => {
    const tags = ["React", "Vue", "Angular", "Svelte", "Solid"];
    const [selected, setSelected] = useState<string[]>(["React"]);
    const toggle = (tag: string) =>
      setSelected((s) => s.includes(tag) ? s.filter((t) => t !== tag) : [...s, tag]);
    return (
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Chip key={tag} checked={selected.includes(tag)} onChange={() => toggle(tag)}>
            {tag}
          </Chip>
        ))}
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Chip size="xs">XSmall</Chip>
      <Chip size="sm">Small</Chip>
      <Chip size="md">Medium</Chip>
      <Chip size="lg">Large</Chip>
      <Chip size="xl">XLarge</Chip>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex gap-2">
      <Chip disabled>Disabled unchecked</Chip>
      <Chip disabled checked>Disabled checked</Chip>
    </div>
  ),
};

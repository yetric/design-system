import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { TagsInput } from "./TagsInput";

const meta: Meta<typeof TagsInput> = {
  title: "Components/TagsInput",
  component: TagsInput,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof TagsInput>;

function ControlledTagsInput({ initial = ["react", "typescript"], ...props }: any) {
  const [tags, setTags] = useState<string[]>(initial);
  return <TagsInput value={tags} onChange={setTags} {...props} />;
}

export const Default: Story = {
  render: () => <ControlledTagsInput />,
};

export const Controlled: Story = {
  render: () => {
    return (
      <div className="max-w-sm space-y-2">
        <ControlledTagsInput initial={["design-system", "ui"]} placeholder="Add a tag…" />
      </div>
    );
  },
};

export const WithMax: Story = {
  render: () => <ControlledTagsInput initial={["a", "b"]} max={3} placeholder="Max 3 tags" />,
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-sm">
      {(["sm", "md", "lg"] as const).map((size) => (
        <ControlledTagsInput key={size} initial={["hello"]} size={size} placeholder={`size="${size}"`} />
      ))}
    </div>
  ),
};


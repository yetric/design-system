import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spoiler } from "./Spoiler";

const meta: Meta<typeof Spoiler> = {
  title: "Components/Spoiler",
  component: Spoiler,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Spoiler>;

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

export const Default: Story = {
  render: () => (
    <div className="max-w-lg">
      <Spoiler maxHeight={80}>{lorem}</Spoiler>
    </div>
  ),
};

export const CustomLabels: Story = {
  render: () => (
    <div className="max-w-lg">
      <Spoiler maxHeight={60} showLabel="Read more" hideLabel="Collapse">
        {lorem}
      </Spoiler>
    </div>
  ),
};

export const ShortContent: Story = {
  render: () => (
    <div className="max-w-lg">
      <Spoiler maxHeight={200}>Short content that fits.</Spoiler>
    </div>
  ),
};

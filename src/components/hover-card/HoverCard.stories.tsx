import type { Meta, StoryObj } from "@storybook/react-vite";

import { Avatar } from "../avatar/Avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./HoverCard";

const meta = {
  title: "Components/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
  argTypes: {
    openDelay: { control: "number" },
    closeDelay: { control: "number" },
  },
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="text-primary text-sm font-medium underline-offset-4 hover:underline">
          @yetric
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar src="https://github.com/yetric.png" alt="Yetric" fallback="YT" />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Yetric</h4>
            <p className="text-muted-foreground text-sm">
              Building shared UI primitives for product teams.
            </p>
          </div>
        </div>
        <p className="text-muted-foreground text-sm">12 repositories · Joined January 2024</p>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const WithCustomDelay: Story = {
  render: () => (
    <HoverCard openDelay={100} closeDelay={400}>
      <HoverCardTrigger asChild>
        <button className="text-primary text-sm font-medium underline-offset-4 hover:underline">
          Hover with custom delay
        </button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-muted-foreground text-sm">
          This hover card opens faster and stays visible a little longer.
        </p>
      </HoverCardContent>
    </HoverCard>
  ),
};

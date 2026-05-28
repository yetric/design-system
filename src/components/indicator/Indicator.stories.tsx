import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bell } from "lucide-react";
import { Indicator } from "./Indicator";
import { Avatar } from "../avatar/Avatar";
import { Button } from "../button/Button";

const meta: Meta<typeof Indicator> = { component: Indicator };
export default meta;
type Story = StoryObj<typeof meta>;

export const WithCount: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Indicator count={3}>
        <Bell className="h-6 w-6" />
      </Indicator>
      <Indicator count={99}>
        <Bell className="h-6 w-6" />
      </Indicator>
      <Indicator count={150} overflowCount={99}>
        <Bell className="h-6 w-6" />
      </Indicator>
    </div>
  ),
};

export const Dot: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Indicator dot color="success">
        <Bell className="h-6 w-6" />
      </Indicator>
      <Indicator dot color="destructive">
        <Button size="sm" variant="outline">Messages</Button>
      </Indicator>
    </div>
  ),
};

export const OnAvatar: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Indicator count={2} color="destructive">
        <Avatar fallback="JD" />
      </Indicator>
      <Indicator dot color="success">
        <Avatar fallback="AB" />
      </Indicator>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(["default", "primary", "success", "warning", "destructive", "info"] as const).map((color) => (
        <Indicator key={color} count={5} color={color}>
          <Bell className="h-6 w-6" />
        </Indicator>
      ))}
    </div>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <Indicator count={3} position="top-right">
        <div className="h-10 w-10 rounded-md bg-muted" />
      </Indicator>
      <Indicator count={3} position="top-left">
        <div className="h-10 w-10 rounded-md bg-muted" />
      </Indicator>
      <Indicator count={3} position="bottom-right">
        <div className="h-10 w-10 rounded-md bg-muted" />
      </Indicator>
      <Indicator count={3} position="bottom-left">
        <div className="h-10 w-10 rounded-md bg-muted" />
      </Indicator>
    </div>
  ),
};

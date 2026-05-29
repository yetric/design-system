import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bell, BookOpen, Home, Settings, Users } from "lucide-react";
import { fn } from "storybook/test";

import { Button } from "../button/Button";
import { CommandPalette } from "./CommandPalette";

const items = [
  {
    id: "dashboard",
    label: "Dashboard",
    description: "Jump back to the main workspace.",
    icon: Home,
    onSelect: fn(),
    group: "Navigation",
  },
  {
    id: "team",
    label: "Team members",
    description: "Manage your collaborators and roles.",
    icon: Users,
    onSelect: fn(),
    group: "Navigation",
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Open recent alerts and updates.",
    icon: Bell,
    onSelect: fn(),
    group: "Actions",
  },
  {
    id: "settings",
    label: "Settings",
    description: "Update workspace preferences.",
    icon: Settings,
    onSelect: fn(),
    group: "Actions",
  },
  {
    id: "docs",
    label: "Documentation",
    description: "Browse the design system docs.",
    icon: BookOpen,
    onSelect: fn(),
  },
];

const meta = {
  title: "Components/CommandPalette",
  component: CommandPalette,
  tags: ["autodocs"],
  args: {
    items,
    placeholder: "Search pages, actions, and docs…",
  },
} satisfies Meta<typeof CommandPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: <Button>Open command palette</Button>,
  },
};

export const InitiallyOpen: Story = {
  args: {
    open: true,
    onOpenChange: fn(),
  },
};

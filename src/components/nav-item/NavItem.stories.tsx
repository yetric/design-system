import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  BarChart2,
  Bell,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Separator } from "../separator/Separator";
import { Stack } from "../stack/Stack";
import { NavGroup } from "./NavItem";
import { NavItem } from "./NavItem";

const meta = {
  title: "Navigation/NavItem",
  component: NavItem,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof NavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Single item variants ─────────────────────────────────────────────────────

export const Default: Story = {
  args: { label: "Dashboard", icon: <LayoutDashboard size={16} />, asButton: true },
};

export const Active: Story = {
  args: { label: "Dashboard", icon: <LayoutDashboard size={16} />, active: true, asButton: true },
};

export const WithBadge: Story = {
  args: { label: "Notifications", icon: <Bell size={16} />, badge: 12, asButton: true },
};

export const ActiveWithBadge: Story = {
  args: { label: "Notifications", icon: <Bell size={16} />, badge: 3, active: true, asButton: true },
};

export const Disabled: Story = {
  args: { label: "Reports", icon: <BarChart2 size={16} />, disabled: true, asButton: true },
};

export const AsLink: Story = {
  args: { label: "Documentation", icon: <FileText size={16} />, href: "#" },
};

export const NoIcon: Story = {
  args: { label: "Settings", asButton: true },
};

// ─── Collapsible sub-items ────────────────────────────────────────────────────

export const WithSubItems: Story = {
  args: { label: "" },
  render: () => (
    <Stack gap={1} style={{ width: 240 }}>
      <NavItem label="Products" icon={<ShoppingCart size={16} />} asButton defaultOpen>
        <NavItem label="All products" asButton />
        <NavItem label="Inventory" asButton active />
        <NavItem label="Collections" asButton badge="New" />
      </NavItem>
      <NavItem label="Customers" icon={<Users size={16} />} asButton>
        <NavItem label="All customers" asButton />
        <NavItem label="Segments" asButton />
      </NavItem>
    </Stack>
  ),
};

// ─── Full sidebar nav ─────────────────────────────────────────────────────────

export const SidebarExample: Story = {
  name: "Sidebar composition",
  args: { label: "" },
  render: () => (
    <Stack
      gap={0}
      style={{
        width: 240,
        padding: "1rem 0.75rem",
        background: "hsl(var(--background))",
        border: "1px solid hsl(var(--border))",
        borderRadius: "0.5rem",
      }}
    >
      <NavGroup label="Main">
        <NavItem label="Dashboard" icon={<LayoutDashboard size={16} />} active asButton />
        <NavItem label="Analytics" icon={<BarChart2 size={16} />} asButton />
        <NavItem label="Reports" icon={<FileText size={16} />} badge={2} asButton />
      </NavGroup>

      <Separator style={{ margin: "0.75rem 0" }} />

      <NavGroup label="Manage">
        <NavItem label="Users" icon={<Users size={16} />} asButton>
          <NavItem label="All users" asButton />
          <NavItem label="Roles" asButton />
          <NavItem label="Invites" asButton badge="3" />
        </NavItem>
        <NavItem label="Notifications" icon={<Bell size={16} />} badge={7} asButton />
        <NavItem label="Orders" icon={<ShoppingCart size={16} />} asButton />
      </NavGroup>

      <Separator style={{ margin: "0.75rem 0" }} />

      <NavGroup>
        <NavItem label="Settings" icon={<Settings size={16} />} asButton />
        <NavItem label="Help &amp; support" icon={<HelpCircle size={16} />} asButton />
      </NavGroup>
    </Stack>
  ),
};

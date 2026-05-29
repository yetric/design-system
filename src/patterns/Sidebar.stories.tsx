import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  BarChart2,
  Bell,
  ChevronRight,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Avatar } from "../components/avatar/Avatar";
import { Box } from "../components/box/Box";
import { Button } from "../components/button/Button";
import { NavGroup, NavItem } from "../components/nav-item/NavItem";
import { Separator } from "../components/separator/Separator";
import { Stack } from "../components/stack/Stack";
import { Text } from "../components/text/Text";

const meta = {
  title: "Patterns/Navigation/Sidebar",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function SidebarShell({ width = 240, children }: { width?: number; children: React.ReactNode }) {
  return (
    <Box
      style={{
        width,
        height: "100vh",
        borderRight: "1px solid hsl(var(--border))",
        background: "hsl(var(--background))",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </Box>
  );
}

function SidebarFooter() {
  return (
    <Box p="md">
      <Separator />
      <Stack direction="row" align="center" justify="between" style={{ marginTop: "1rem" }}>
        <Stack direction="row" align="center" gap={3}>
          <Avatar alt="Maya Chen" fallback="MC" size="sm" />
          <Box>
            <Text as="p" size="body-sm" weight="medium">
              Maya Chen
            </Text>
            <Text as="p" size="caption" color="muted">
              Operations Lead
            </Text>
          </Box>
        </Stack>
        <Button variant="ghost" size="icon" aria-label="Open settings">
          <Settings size={16} />
        </Button>
      </Stack>
    </Box>
  );
}

function DefaultSidebarContent() {
  return (
    <>
      <Box p="md">
        <Text as="p" weight="bold" style={{ fontSize: 18, letterSpacing: "-0.02em" }}>
          Yetric
        </Text>
      </Box>
      <Box grow p="sm" style={{ overflowY: "auto" }}>
        <Stack gap={6}>
          <NavGroup label="Main">
            <NavItem icon={<LayoutDashboard size={16} />} label="Dashboard" href="#" active />
            <NavItem icon={<Users size={16} />} label="Customers" href="#" />
            <NavItem icon={<ShoppingCart size={16} />} label="Orders" href="#" badge={12} />
            <NavItem icon={<BarChart2 size={16} />} label="Reports" href="#" />
          </NavGroup>
          <NavGroup label="Workspace">
            <NavItem icon={<FileText size={16} />} label="Documents" href="#" />
            <NavItem icon={<Bell size={16} />} label="Notifications" href="#" />
            <NavItem icon={<HelpCircle size={16} />} label="Support" href="#" />
          </NavGroup>
        </Stack>
      </Box>
      <SidebarFooter />
    </>
  );
}

export const Default: Story = {
  render: () => (
    <SidebarShell>
      <DefaultSidebarContent />
    </SidebarShell>
  ),
};

export const WithSubItems: Story = {
  render: () => (
    <SidebarShell>
      <Box p="md">
        <Text as="p" weight="bold" style={{ fontSize: 18, letterSpacing: "-0.02em" }}>
          Yetric
        </Text>
      </Box>
      <Box grow p="sm" style={{ overflowY: "auto" }}>
        <Stack gap={6}>
          <NavGroup label="Main">
            <NavItem icon={<LayoutDashboard size={16} />} label="Overview" href="#" />
            <NavItem icon={<Users size={16} />} label="Team" defaultOpen>
              <NavItem label="Members" href="#" active />
              <NavItem label="Permissions" href="#" />
              <NavItem label="Invites" href="#" />
            </NavItem>
            <NavItem icon={<FileText size={16} />} label="Projects" defaultOpen>
              <NavItem label="Q2 Launch" href="#" />
              <NavItem label="Design System" defaultOpen>
                <NavItem label="Navigation" href="#" />
                <NavItem label="Tokens" href="#" />
              </NavItem>
            </NavItem>
            <NavItem icon={<Settings size={16} />} label="Settings" href="#" />
          </NavGroup>
        </Stack>
      </Box>
      <SidebarFooter />
    </SidebarShell>
  ),
};

function CompactItem({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      style={{
        width: 40,
        height: 40,
        border: "none",
        borderRadius: 8,
        background: active ? "hsl(var(--accent))" : "transparent",
        color: active ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
    </button>
  );
}

export const Compact: Story = {
  render: function Render() {
    const items = [
      { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={16} /> },
      { key: "customers", label: "Customers", icon: <Users size={16} /> },
      { key: "reports", label: "Reports", icon: <BarChart2 size={16} /> },
      { key: "alerts", label: "Alerts", icon: <Bell size={16} /> },
      { key: "settings", label: "Settings", icon: <Settings size={16} /> },
    ];
    const [active, setActive] = useState("dashboard");

    return (
      <SidebarShell width={64}>
        <Stack align="center" gap={4} style={{ padding: "1rem 0" }}>
          <Box
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
            }}
          >
            Y
          </Box>
        </Stack>
        <Box grow>
          <Stack align="center" gap={2}>
            {items.map((item) => (
              <CompactItem
                key={item.key}
                label={item.label}
                icon={item.icon}
                active={active === item.key}
                onClick={() => setActive(item.key)}
              />
            ))}
          </Stack>
        </Box>
        <Stack align="center" gap={2} style={{ padding: "1rem 0" }}>
          <CompactItem label="Support" icon={<HelpCircle size={16} />} onClick={() => setActive("support")} />
          <CompactItem label="Sign out" icon={<LogOut size={16} />} onClick={() => setActive("logout")} />
          <Avatar alt="Maya Chen" fallback="MC" size="sm" />
        </Stack>
      </SidebarShell>
    );
  },
};

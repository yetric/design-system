import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bell, Home, LogOut, Menu, Search, ShoppingCart, User } from "lucide-react";

import { Avatar } from "../components/avatar/Avatar";
import { Box } from "../components/box/Box";
import { Button } from "../components/button/Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/drawer/Drawer";
import { NavGroup, NavItem } from "../components/nav-item/NavItem";
import { Separator } from "../components/separator/Separator";
import { Stack } from "../components/stack/Stack";
import { Text } from "../components/text/Text";

const meta = {
  title: "Patterns/Navigation/Mobile Nav",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <Box
      radius="xl"
      overflow="hidden"
      style={{
        width: 390,
        height: 780,
        margin: "2rem auto",
        border: "1px solid hsl(var(--border))",
        background: "hsl(var(--background))",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.12)",
        position: "relative",
      }}
    >
      {children}
    </Box>
  );
}

export const HamburgerDrawer: Story = {
  render: () => (
    <PhoneFrame>
      <Drawer>
        <Box
          style={{
            height: 56,
            borderBottom: "1px solid hsl(var(--border))",
            display: "grid",
            gridTemplateColumns: "56px 1fr 56px",
            alignItems: "center",
            padding: "0 0.5rem",
          }}
        >
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open navigation">
              <Menu size={18} />
            </Button>
          </DrawerTrigger>
          <Text as="p" weight="bold" style={{ textAlign: "center" }}>
            Yetric
          </Text>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell size={18} />
          </Button>
        </Box>
        <Box p="lg">
          <Stack gap={3}>
            <Text as="p" size="body-sm" color="muted">
              Mobile top bar with a left drawer for full navigation.
            </Text>
            <Box
              radius="lg"
              p="md"
              style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}
            >
              <Text as="p" size="body-sm">
                Tap the menu icon to open groups, routes, and account actions.
              </Text>
            </Box>
          </Stack>
        </Box>
        <DrawerContent side="left" size="md" showClose>
          <DrawerHeader>
            <DrawerTitle>Navigation</DrawerTitle>
          </DrawerHeader>
          <Box p="md" grow style={{ overflowY: "auto" }}>
            <Stack gap={6}>
              <NavGroup label="Main">
                <NavItem icon={<Home size={16} />} label="Home" href="#" active />
                <NavItem icon={<Search size={16} />} label="Discover" href="#" />
                <NavItem icon={<ShoppingCart size={16} />} label="Orders" href="#" badge={2} />
              </NavGroup>
              <NavGroup label="Account">
                <NavItem icon={<User size={16} />} label="Profile" href="#" />
                <NavItem icon={<Bell size={16} />} label="Alerts" href="#" />
              </NavGroup>
            </Stack>
          </Box>
          <DrawerFooter>
            <Separator />
            <Stack direction="row" align="center" justify="between" style={{ paddingTop: "0.75rem" }}>
              <Stack direction="row" align="center" gap={3}>
                <Avatar alt="Taylor Green" fallback="TG" size="sm" />
                <Box>
                  <Text as="p" size="body-sm" weight="medium">
                    Taylor Green
                  </Text>
                  <Text as="p" size="caption" color="muted">
                    Signed in
                  </Text>
                </Box>
              </Stack>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" aria-label="Log out">
                  <LogOut size={16} />
                </Button>
              </DrawerClose>
            </Stack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </PhoneFrame>
  ),
};

export const BottomNav: Story = {
  render: function Render() {
    const tabs = [
      { key: "home", label: "Home", icon: <Home size={18} /> },
      { key: "search", label: "Search", icon: <Search size={18} /> },
      { key: "orders", label: "Orders", icon: <ShoppingCart size={18} /> },
      { key: "alerts", label: "Alerts", icon: <Bell size={18} /> },
      { key: "account", label: "Account", icon: <User size={18} /> },
    ];
    const [activeTab, setActiveTab] = useState("home");
    const active = tabs.find((tab) => tab.key === activeTab);

    return (
      <PhoneFrame>
        <Box style={{ height: "100%", padding: "1.5rem 1rem 5.5rem" }}>
          <Stack gap={4}>
            <Text as="p" size="caption" color="muted" style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Mobile pattern
            </Text>
            <Text as="p" weight="bold" style={{ fontSize: 24, lineHeight: 1.2 }}>
              {active?.label}
            </Text>
            <Box radius="lg" p="md" style={{ background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}>
              <Text as="p" size="body-sm" color="muted">
                This screen keeps primary destinations pinned to the bottom edge for thumb-friendly access.
              </Text>
            </Box>
          </Stack>
        </Box>
        <Box
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 72,
            borderTop: "1px solid hsl(var(--border))",
            background: "hsl(var(--background))",
            display: "flex",
            alignItems: "stretch",
            padding: "0 0.25rem",
          }}
        >
          {tabs.map((tab) => {
            const isActive = tab.key === activeTab;

            return (
              <Button
                key={tab.key}
                variant={isActive ? "secondary" : "ghost"}
                onClick={() => setActiveTab(tab.key)}
                aria-pressed={isActive}
                style={{ flex: 1, height: "100%" }}
              >
                <Stack direction="column" gap={1} align="center" justify="center" style={{ width: "100%" }}>
                  {tab.icon}
                  <Text as="span" size="caption" weight={isActive ? "semibold" : "medium"}>
                    {tab.label}
                  </Text>
                </Stack>
              </Button>
            );
          })}
        </Box>
      </PhoneFrame>
    );
  },
};

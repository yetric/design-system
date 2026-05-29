import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bell, LogOut, Moon, Search, Settings, SunMedium, User } from "lucide-react";

import { Avatar } from "../components/avatar/Avatar";
import { Badge } from "../components/badge/Badge";
import { Box } from "../components/box/Box";
import { Button } from "../components/button/Button";
import { Anchor } from "../components/anchor/Anchor";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/dropdown-menu/DropdownMenu";
import { Input } from "../components/input/Input";
import { Stack } from "../components/stack/Stack";
import { Text } from "../components/text/Text";

const meta = {
  title: "Patterns/Navigation/Top Bar",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const links = ["Product", "Solutions", "Pricing", "Docs"];

function Logo() {
  return (
    <Text as="span" weight="bold" style={{ fontSize: 18, letterSpacing: "-0.02em" }}>
      Yetric
    </Text>
  );
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Open user menu"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          <Avatar alt="Ava Johnson" fallback="AJ" size="sm" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ava Johnson</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User size={16} />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings size={16} />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut size={16} />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function TopBarFrame({ children }: { children: React.ReactNode }) {
  return (
    <Box
      width="full"
      style={{
        height: 64,
        borderBottom: "1px solid hsl(var(--border))",
        background: "hsl(var(--background))",
      }}
    >
      <Stack
        direction="row"
        align="center"
        justify="between"
        width="full"
        style={{ height: "100%", padding: "0 1.5rem" }}
      >
        {children}
      </Stack>
    </Box>
  );
}

export const Default: Story = {
  render: () => (
    <TopBarFrame>
      <Stack direction="row" align="center" gap={8}>
        <Logo />
        <Stack direction="row" align="center" gap={5} as="nav">
          {links.map((link) => (
            <Anchor key={link} href="#" underline="never" variant="muted">
              {link}
            </Anchor>
          ))}
        </Stack>
      </Stack>
      <Button variant="outline">Sign in</Button>
    </TopBarFrame>
  ),
};

export const WithSearch: Story = {
  render: function Render() {
    const [search, setSearch] = useState("");

    return (
      <TopBarFrame>
        <Stack direction="row" align="center" gap={8} style={{ minWidth: 0, flex: 1 }}>
          <Stack direction="row" align="center" gap={4} style={{ flexShrink: 0 }}>
            <Logo />
            <Stack direction="row" align="center" gap={4} as="nav">
              {links.slice(0, 3).map((link) => (
                <Anchor key={link} href="#" underline="never" variant="muted">
                  {link}
                </Anchor>
              ))}
            </Stack>
          </Stack>
          <Box style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <Box style={{ width: "100%", maxWidth: 360 }}>
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search navigation, docs, or teams"
                leftIcon={<Search size={16} />}
              />
            </Box>
          </Box>
        </Stack>
        <UserMenu />
      </TopBarFrame>
    );
  },
};

export const WithActions: Story = {
  render: function Render() {
    const [darkMode, setDarkMode] = useState(false);

    return (
      <TopBarFrame>
        <Stack direction="row" align="center" gap={8}>
          <Logo />
          <Stack direction="row" align="center" gap={5} as="nav">
            {links.map((link) => (
              <Anchor key={link} href="#" underline="never" variant="muted">
                {link}
              </Anchor>
            ))}
          </Stack>
        </Stack>
        <Stack direction="row" align="center" gap={3}>
          <Button
            variant="ghost"
            size="icon"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setDarkMode((value) => !value)}
          >
            {darkMode ? <SunMedium size={16} /> : <Moon size={16} />}
          </Button>
          <Badge variant="outline" size="sm" icon={<Bell size={12} />}>
            3
          </Badge>
          <UserMenu />
        </Stack>
      </TopBarFrame>
    );
  },
};

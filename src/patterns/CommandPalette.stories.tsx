import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Calendar,
  CreditCard,
  FileText,
  FolderOpen,
  Home,
  LayoutDashboard,
  LogOut,
  Mail,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react";

import { Badge } from "../components/badge/Badge";
import { Box } from "../components/box/Box";
import { Button } from "../components/button/Button";
import { Kbd } from "../components/kbd/Kbd";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../components/command/Command";
import { Stack } from "../components/stack/Stack";
import { Text } from "../components/text/Text";

const meta = {
  title: "Patterns/Command Palette",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const recentItems = [
  { icon: FolderOpen, label: "design-system", type: "Project" },
  { icon: FileText, label: "Button component spec", type: "Document" },
  { icon: Users, label: "Engineering team", type: "Team" },
];

const navigationItems = [
  { icon: Home, label: "Home", shortcut: "⌘H" },
  { icon: LayoutDashboard, label: "Dashboard", shortcut: "⌘D" },
  { icon: Mail, label: "Inbox", shortcut: "⌘I", badge: 4 },
  { icon: Calendar, label: "Calendar", shortcut: "⌘K" },
];

const accountItems = [
  { icon: User, label: "Profile", shortcut: "⌘P" },
  { icon: Settings, label: "Preferences", shortcut: "⌘," },
  { icon: CreditCard, label: "Billing" },
  { icon: LogOut, label: "Sign out", destructive: true },
];

const mutedIconStyle = { width: 16, height: 16, color: "hsl(var(--muted-foreground))" };
const defaultIconStyle = { width: 16, height: 16 };

function RecentItem({ Icon, label, type }: { Icon: typeof Home; label: string; type: string }) {
  return (
    <CommandItem style={{ gap: "0.75rem" }}>
      <Icon style={mutedIconStyle} />
      <span style={{ flex: 1 }}>{label}</span>
      <Text as="span" size="caption" color="muted">{type}</Text>
    </CommandItem>
  );
}

function NavigationItem({ Icon, label, shortcut, badge, onSelect }: { Icon: typeof Home; label: string; shortcut?: string; badge?: number; onSelect?: () => void }) {
  return (
    <CommandItem style={{ gap: "0.75rem" }} onSelect={onSelect}>
      <Icon style={mutedIconStyle} />
      <span style={{ flex: 1 }}>{label}</span>
      {badge && <Badge size="xs" variant="info">{badge}</Badge>}
      {shortcut && <CommandShortcut>{shortcut}</CommandShortcut>}
    </CommandItem>
  );
}

function AccountItem({ Icon, label, shortcut, destructive, onSelect }: { Icon: typeof Home; label: string; shortcut?: string; destructive?: boolean; onSelect?: () => void }) {
  const color = destructive ? "hsl(var(--destructive))" : undefined;

  return (
    <CommandItem style={{ gap: "0.75rem", color }} onSelect={onSelect}>
      <Icon style={destructive ? { ...defaultIconStyle, color } : defaultIconStyle} />
      <span style={{ flex: 1 }}>{label}</span>
      {shortcut && <CommandShortcut>{shortcut}</CommandShortcut>}
    </CommandItem>
  );
}

function CommandContent({ close }: { close?: () => void }) {
  return (
    <>
      <CommandInput placeholder="Search or type a command…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Recent">
          {recentItems.map(({ icon: Icon, label, type }) => (
            <RecentItem key={label} Icon={Icon} label={label} type={type} />
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Navigate">
          {navigationItems.map(({ icon: Icon, label, shortcut, badge }) => (
            <NavigationItem key={label} Icon={Icon} label={label} shortcut={shortcut} badge={badge} onSelect={close} />
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Account">
          {accountItems.map(({ icon: Icon, label, shortcut, destructive }) => (
            <AccountItem key={label} Icon={Icon} label={label} shortcut={shortcut} destructive={destructive} onSelect={close} />
          ))}
        </CommandGroup>
      </CommandList>
    </>
  );
}

export const Inline: Story = {
  name: "Inline",
  render: () => (
    <Command
      style={{
        width: 480,
        borderRadius: "0.75rem",
        border: "1px solid hsl(var(--border))",
        boxShadow: "var(--shadow-lg)",
      }}
    >
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Recent">
          {recentItems.map(({ icon: Icon, label, type }) => (
            <RecentItem key={label} Icon={Icon} label={label} type={type} />
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Navigate">
          {navigationItems.map(({ icon: Icon, label, shortcut, badge }) => (
            <NavigationItem key={label} Icon={Icon} label={label} shortcut={shortcut} badge={badge} />
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Account">
          {accountItems.map(({ icon: Icon, label, shortcut, destructive }) => (
            <AccountItem key={label} Icon={Icon} label={label} shortcut={shortcut} destructive={destructive} />
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const Dialog: Story = {
  name: "As dialog (⌘K trigger)",
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <Stack align="center" gap={4}>
        <Stack direction="row" align="center" gap={2}>
          <Text as="span" size="body-sm" color="muted">Press</Text>
          <Stack direction="row" align="center" gap={1}><Kbd>⌘</Kbd><Kbd>K</Kbd></Stack>
          <Text as="span" size="body-sm" color="muted">or click the button to open</Text>
        </Stack>
        <Button variant="outline" onClick={() => setOpen(true)} leftIcon={<Search style={{ width: 14, height: 14 }} />}>
          Search…
          <Box
            as="span"
            style={{
              marginLeft: "auto",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25rem",
              fontSize: "0.75rem",
              color: "hsl(var(--muted-foreground))",
              paddingLeft: "1rem",
            }}
          >
            <Kbd size="xs">⌘</Kbd><Kbd size="xs">K</Kbd>
          </Box>
        </Button>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandContent close={() => setOpen(false)} />
        </CommandDialog>
      </Stack>
    );
  },
};

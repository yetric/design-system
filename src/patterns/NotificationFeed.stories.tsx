import type { Meta, StoryObj } from "@storybook/react-vite";
import { MoreHorizontal } from "lucide-react";

import { Avatar } from "../components/avatar/Avatar";
import { Badge } from "../components/badge/Badge";
import { Box } from "../components/box/Box";
import { Button } from "../components/button/Button";
import { ScrollArea } from "../components/scroll-area/ScrollArea";
import { Separator } from "../components/separator/Separator";
import { Stack } from "../components/stack/Stack";
import { Heading, Text } from "../components/text/Text";

const meta = {
  title: "Patterns/Notification Feed",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const notifications = [
  {
    id: 1,
    src: "https://i.pravatar.cc/150?img=1",
    name: "Alice Johnson",
    action: "commented on your post",
    target: '"Building a design system"',
    time: "2 min ago",
    unread: true,
    status: "online" as const,
  },
  {
    id: 2,
    src: "https://i.pravatar.cc/150?img=2",
    name: "Bob Smith",
    action: "starred your repository",
    target: "yetric/design-system",
    time: "14 min ago",
    unread: true,
    status: "away" as const,
  },
  {
    id: 3,
    src: "https://i.pravatar.cc/150?img=3",
    name: "Carol Williams",
    action: "mentioned you in",
    target: "Issue #42: Button variants",
    time: "1 hr ago",
    unread: false,
    status: "offline" as const,
  },
  {
    id: 4,
    src: "https://i.pravatar.cc/150?img=4",
    name: "David Brown",
    action: "opened a pull request",
    target: "feat: add Tooltip component",
    time: "3 hr ago",
    unread: false,
    status: "busy" as const,
  },
  {
    id: 5,
    src: "https://i.pravatar.cc/150?img=5",
    name: "Eva Martinez",
    action: "reacted 👍 to",
    target: "your comment",
    time: "Yesterday",
    unread: false,
    status: "offline" as const,
  },
  {
    id: 6,
    src: "https://i.pravatar.cc/150?img=6",
    name: "Frank Lee",
    action: "invited you to",
    target: "Acme Design Org",
    time: "2 days ago",
    unread: false,
    status: "online" as const,
  },
];

const iconStyle = { width: 16, height: 16 };

export const Default: Story = {
  render: () => (
    <Box
      radius="xl"
      shadow="md"
      overflow="hidden"
      style={{
        width: "100%",
        maxWidth: 380,
        border: "1px solid hsl(var(--border))",
        backgroundColor: "hsl(var(--background))",
      }}
    >
      <Box style={{ padding: "0.75rem 1rem", borderBottom: "1px solid hsl(var(--border))" }}>
        <Stack direction="row" align="center" justify="between">
          <Stack direction="row" align="center" gap={2}>
            <Heading as="h2" size="h6">
              Notifications
            </Heading>
            <Badge size="xs" variant="info">
              2
            </Badge>
          </Stack>
          <Button variant="ghost" size="icon" aria-label="More options">
            <MoreHorizontal style={iconStyle} />
          </Button>
        </Stack>
      </Box>

      <ScrollArea style={{ height: 360 }}>
        <Stack gap={0}>
          {notifications.map((n, i) => (
            <div key={n.id}>
              <Box
                style={{
                  padding: "0.75rem 1rem",
                  backgroundColor: n.unread ? "hsl(var(--accent) / 0.4)" : undefined,
                }}
              >
                <Stack direction="row" gap={3}>
                  <Box shrink={false} style={{ position: "relative", marginTop: "0.125rem" }}>
                    <Avatar
                      src={n.src}
                      alt={n.name}
                      size="sm"
                      status={n.status}
                      fallback={n.name[0]}
                    />
                    {n.unread && (
                      <Box
                        as="span"
                        radius="full"
                        style={{
                          position: "absolute",
                          top: -2,
                          right: -2,
                          width: 8,
                          height: 8,
                          backgroundColor: "hsl(var(--info))",
                          border: "2px solid hsl(var(--background))",
                        }}
                      />
                    )}
                  </Box>
                  <Box grow style={{ minWidth: 0 }}>
                    <Text as="p" size="body-sm" style={{ lineHeight: 1.35 }}>
                      <Text as="span" size="body-sm" weight="medium">
                        {n.name}
                      </Text>{" "}
                      <Text as="span" size="body-sm" color="muted">
                        {n.action}
                      </Text>{" "}
                      <Text as="span" size="body-sm" weight="medium">
                        {n.target}
                      </Text>
                    </Text>
                    <Text as="p" size="caption" color="muted" style={{ marginTop: "0.125rem" }}>
                      {n.time}
                    </Text>
                  </Box>
                </Stack>
              </Box>
              {i < notifications.length - 1 && <Separator />}
            </div>
          ))}
        </Stack>
      </ScrollArea>

      <Box style={{ borderTop: "1px solid hsl(var(--border))", padding: "0.5rem 1rem" }}>
        <Button variant="ghost" size="sm" fullWidth>
          View all notifications
        </Button>
      </Box>
    </Box>
  ),
};

export const Empty: Story = {
  render: () => (
    <Box
      radius="xl"
      shadow="md"
      overflow="hidden"
      style={{
        width: "100%",
        maxWidth: 380,
        border: "1px solid hsl(var(--border))",
        backgroundColor: "hsl(var(--background))",
      }}
    >
      <Box style={{ padding: "0.75rem 1rem", borderBottom: "1px solid hsl(var(--border))" }}>
        <Heading as="h2" size="h6">
          Notifications
        </Heading>
      </Box>
      <Stack align="center" gap={2} style={{ padding: "4rem 1rem", textAlign: "center" }}>
        <Text as="span" style={{ fontSize: "1.875rem", lineHeight: 1 }}>
          🎉
        </Text>
        <Text size="body-sm" weight="medium">
          You&apos;re all caught up!
        </Text>
        <Text size="caption" color="muted">
          No new notifications right now.
        </Text>
      </Stack>
    </Box>
  ),
};

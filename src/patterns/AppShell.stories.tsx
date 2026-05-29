import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  BarChart2,
  Bell,
  FileText,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Avatar } from "../components/avatar/Avatar";
import { Box } from "../components/box/Box";
import { Button } from "../components/button/Button";
import { Grid } from "../components/grid/Grid";
import { NavGroup, NavItem } from "../components/nav-item/NavItem";
import { Separator } from "../components/separator/Separator";
import { Stack } from "../components/stack/Stack";
import { Heading, Text } from "../components/text/Text";

const meta = {
  title: "Patterns/Navigation/App Shell",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function ShellSidebar() {
  return (
    <Box
      style={{
        width: 240,
        height: "100vh",
        borderRight: "1px solid hsl(var(--border))",
        background: "hsl(var(--background))",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
            <NavItem icon={<ShoppingCart size={16} />} label="Orders" href="#" badge={8} />
            <NavItem icon={<BarChart2 size={16} />} label="Reports" href="#" />
          </NavGroup>
          <NavGroup label="Workspace">
            <NavItem icon={<FileText size={16} />} label="Documents" href="#" />
            <NavItem icon={<Bell size={16} />} label="Notifications" href="#" />
            <NavItem icon={<Settings size={16} />} label="Settings" href="#" />
          </NavGroup>
        </Stack>
      </Box>
      <Box p="md">
        <Separator />
        <Stack direction="row" align="center" justify="between" style={{ marginTop: "1rem" }}>
          <Stack direction="row" align="center" gap={3}>
            <Avatar alt="Jordan Lee" fallback="JL" size="sm" />
            <Box>
              <Text as="p" size="body-sm" weight="medium">
                Jordan Lee
              </Text>
              <Text as="p" size="caption" color="muted">
                Product Ops
              </Text>
            </Box>
          </Stack>
          <Button variant="ghost" size="icon" aria-label="Open account settings">
            <Settings size={16} />
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

function ShellTopBar() {
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
        <Box>
          <Heading as="h1" size="h5">
            Workspace overview
          </Heading>
          <Text as="p" size="caption" color="muted">
            Keep teams, orders, and analytics aligned.
          </Text>
        </Box>
        <Stack direction="row" align="center" gap={3}>
          <Button variant="outline">Share report</Button>
          <Button>New project</Button>
        </Stack>
      </Stack>
    </Box>
  );
}

function ContentCard({ title, description }: { title: string; description: string }) {
  return (
    <Box
      p="md"
      radius="lg"
      style={{
        background: "hsl(var(--muted))",
        border: "1px solid hsl(var(--border))",
      }}
    >
      <Stack gap={2}>
        <Text as="p" weight="medium">
          {title}
        </Text>
        <Text as="p" size="body-sm" color="muted">
          {description}
        </Text>
      </Stack>
    </Box>
  );
}

function AppShellFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "hsl(var(--background))",
      }}
    >
      <ShellSidebar />
      <div style={{ display: "flex", flex: 1, minWidth: 0, flexDirection: "column" }}>
        <ShellTopBar />
        <div style={{ flex: 1, overflowY: "auto" }}>{children}</div>
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <AppShellFrame>
      <Box p="lg">
        <Stack gap={6}>
          <Grid cols={{ base: 1, md: 2 }} gap={4}>
            <ContentCard
              title="Active roadmap"
              description="Track product bets, delivery milestones, and owners across the quarter."
            />
            <ContentCard
              title="Customer highlights"
              description="Surface new enterprise wins, renewal risks, and strategic expansion work."
            />
            <ContentCard
              title="Launch checklist"
              description="Review design QA, stakeholder approvals, and release readiness in one place."
            />
            <ContentCard
              title="Team health"
              description="Monitor response times, workload balance, and support coverage by squad."
            />
          </Grid>
          <Box
            p="lg"
            radius="lg"
            style={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
            }}
          >
            <Stack gap={4}>
              <Heading as="h2" size="h5">
                Upcoming work
              </Heading>
              <Grid cols={{ base: 1, lg: 3 }} gap={4}>
                <ContentCard
                  title="Design review"
                  description="Approve navigation states for desktop and mobile shells."
                />
                <ContentCard
                  title="Billing sync"
                  description="Confirm payment retries, renewals, and cart alerts."
                />
                <ContentCard
                  title="Support rotation"
                  description="Assign on-call coverage for the next release window."
                />
              </Grid>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </AppShellFrame>
  ),
};

export const WithStats: Story = {
  render: () => {
    const stats = [
      { label: "Revenue", value: "$124K", detail: "+14% vs last month" },
      { label: "Orders", value: "1,248", detail: "82 pending fulfillment" },
      { label: "Tickets", value: "27", detail: "4 need escalation" },
      { label: "NPS", value: "62", detail: "Trending above target" },
    ];

    return (
      <AppShellFrame>
        <Box p="lg">
          <Stack gap={6}>
            <Grid cols={{ base: 1, md: 2, lg: 4 }} gap={4}>
              {stats.map((stat) => (
                <Box
                  key={stat.label}
                  p="md"
                  radius="lg"
                  style={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                >
                  <Stack gap={2}>
                    <Text as="p" size="body-sm" color="muted">
                      {stat.label}
                    </Text>
                    <Heading as="p" size="h3">
                      {stat.value}
                    </Heading>
                    <Text as="p" size="caption" color="muted">
                      {stat.detail}
                    </Text>
                  </Stack>
                </Box>
              ))}
            </Grid>
            <Box
              p="lg"
              radius="lg"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
              }}
            >
              <Stack gap={4}>
                <Heading as="h2" size="h5">
                  Pipeline snapshot
                </Heading>
                <Stack gap={0}>
                  {[
                    ["Enterprise renewal", "Legal review", "$48,000"],
                    ["Northwind expansion", "Proposal sent", "$22,400"],
                    ["Retail pilot", "Awaiting kickoff", "$9,600"],
                    ["Partner enablement", "Scheduled", "$6,300"],
                  ].map(([account, stage, amount], index, rows) => (
                    <Box key={account}>
                      <Grid cols={{ base: 1, md: 3 }} gap={4} style={{ padding: "0.875rem 0" }}>
                        <Text as="p" weight="medium">
                          {account}
                        </Text>
                        <Text as="p" size="body-sm" color="muted">
                          {stage}
                        </Text>
                        <Text as="p" size="body-sm" style={{ textAlign: "right" }}>
                          {amount}
                        </Text>
                      </Grid>
                      {index < rows.length - 1 && <Separator />}
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </AppShellFrame>
    );
  },
};

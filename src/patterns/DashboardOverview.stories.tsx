import type { Meta, StoryObj } from "@storybook/react-vite";
import { Activity, DollarSign, ShoppingCart, TrendingDown, TrendingUp, Users } from "lucide-react";

import { Avatar } from "../components/avatar/Avatar";
import { Badge } from "../components/badge/Badge";
import { Box } from "../components/box/Box";
import { Card, CardContent, CardDescription, CardHeader } from "../components/card/Card";
import { Grid } from "../components/grid/Grid";
import { Progress } from "../components/progress/Progress";
import { Separator } from "../components/separator/Separator";
import { Stack } from "../components/stack/Stack";
import { Heading, Text } from "../components/text/Text";
import { Timeline, TimelineItem } from "../components/timeline/Timeline";

const meta = {
  title: "Patterns/Dashboard Overview",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const stats = [
  { label: "Total Revenue", value: "$84,250", delta: "+12.5%", up: true, icon: DollarSign, variant: "success" as const },
  { label: "Active Users", value: "3,847", delta: "+8.2%", up: true, icon: Users, variant: "info" as const },
  { label: "New Orders", value: "1,204", delta: "-3.1%", up: false, icon: ShoppingCart, variant: "destructive" as const },
  { label: "Uptime", value: "99.97%", delta: "stable", up: true, icon: Activity, variant: "success" as const },
];

const goals = [
  { label: "Monthly revenue", current: 84250, target: 100000, variant: "default" as const },
  { label: "User signups", current: 3847, target: 5000, variant: "info" as const },
  { label: "Support tickets", current: 12, target: 50, variant: "warning" as const },
  { label: "Bug resolution", current: 38, target: 40, variant: "success" as const },
];

const teamActivity = [
  { id: 1, src: "https://i.pravatar.cc/150?img=1", name: "Alice", action: "deployed v2.4.1 to production", time: "5 min ago" },
  { id: 2, src: "https://i.pravatar.cc/150?img=2", name: "Bob", action: "merged PR #284 — Add dark mode", time: "42 min ago" },
  { id: 3, src: "https://i.pravatar.cc/150?img=3", name: "Carol", action: "closed 6 support tickets", time: "2 hr ago" },
  { id: 4, src: "https://i.pravatar.cc/150?img=4", name: "David", action: "created milestone Q3 goals", time: "Yesterday" },
];

const iconStyle = { width: 16, height: 16, color: "hsl(var(--muted-foreground))" };
const badgeIconStyle = { width: 12, height: 12, marginRight: 4 };

export const Default: Story = {
  render: () => (
    <Box width="full" maxWidth="3xl">
      <Stack gap={6}>
        <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap={4}>
          {stats.map(({ label, value, delta, up, icon: Icon, variant }) => (
            <Card key={label} variant="outlined">
              <CardHeader>
                <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <CardDescription>{label}</CardDescription>
                  <Icon style={iconStyle} />
                </Box>
                <Heading as="h4" size="h3" style={{ marginTop: "0.25rem" }}>{value}</Heading>
              </CardHeader>
              <CardContent>
                <Badge variant={variant} size="xs">
                  {up ? <TrendingUp style={badgeIconStyle} /> : <TrendingDown style={badgeIconStyle} />}
                  {delta}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </Grid>

        <Grid cols={{ base: 1, lg: 2 }} gap={6}>
          <Card variant="outlined">
            <CardHeader>
              <Heading as="h4" size="h5">Goals this month</Heading>
              <CardDescription>Progress towards key targets.</CardDescription>
            </CardHeader>
            <CardContent>
              <Stack gap={4}>
                {goals.map(({ label, current, target, variant }) => (
                  <Stack key={label} gap={2} style={{ gap: "0.375rem" }}>
                    <Stack direction="row" align="center" justify="between">
                      <Text as="span" size="body-sm">{label}</Text>
                      <Text as="span" size="caption" color="muted">{current.toLocaleString()} / {target.toLocaleString()}</Text>
                    </Stack>
                    <Progress value={Math.round((current / target) * 100)} variant={variant} size="sm" />
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardHeader>
              <Heading as="h4" size="h5">Recent activity</Heading>
              <CardDescription>Latest team actions.</CardDescription>
            </CardHeader>
            <CardContent>
              <Stack gap={0}>
                {teamActivity.map((item, i) => (
                  <div key={item.id}>
                    <Stack direction="row" gap={3} style={{ padding: "0.625rem 0" }}>
                      <Box shrink={false} style={{ marginTop: "0.125rem" }}>
                        <Avatar src={item.src} alt={item.name} size="xs" fallback={item.name[0]} />
                      </Box>
                      <Box grow style={{ minWidth: 0 }}>
                        <Text as="p" size="caption" style={{ lineHeight: 1.35 }}>
                          <Text as="span" size="caption" weight="medium">{item.name}</Text>{" "}
                          <Text as="span" size="caption" color="muted">{item.action}</Text>
                        </Text>
                        <Text as="p" size="caption" color="muted" style={{ fontSize: 11, marginTop: "0.125rem" }}>{item.time}</Text>
                      </Box>
                    </Stack>
                    {i < teamActivity.length - 1 && <Separator />}
                  </div>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Card variant="outlined">
          <CardHeader>
            <Heading as="h4" size="h5">Release history</Heading>
            <CardDescription>Milestones reached this quarter.</CardDescription>
          </CardHeader>
          <CardContent>
            <Timeline>
              <TimelineItem title="v2.4.1 — Hotfix" time="Today" description="Fixed crash on Safari mobile." />
              <TimelineItem title="v2.4.0 — Dark mode" time="3 days ago" description="Full dark mode support across all pages." />
              <TimelineItem title="v2.3.0 — Design system" time="2 weeks ago" description="Migrated to new component library." />
              <TimelineItem title="v2.0.0 — Relaunch" time="6 weeks ago" description="Major rewrite with new architecture." last />
            </Timeline>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  ),
};

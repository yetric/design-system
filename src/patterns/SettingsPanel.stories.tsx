import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "../components/badge/Badge";
import { Button } from "../components/button/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../components/card/Card";
import { Separator } from "../components/separator/Separator";
import { Stack } from "../components/stack/Stack";
import { Switch } from "../components/switch/Switch";
import { Heading, Text } from "../components/text/Text";

const meta = {
  title: "Patterns/Settings Panel",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const notificationSettings = [
  {
    id: "marketing",
    label: "Marketing emails",
    description: "Receive product updates and promotions.",
    defaultChecked: false,
  },
  {
    id: "security",
    label: "Security alerts",
    description: "Get notified of unusual login activity.",
    defaultChecked: true,
  },
  {
    id: "updates",
    label: "Product updates",
    description: "New features and improvements.",
    defaultChecked: true,
    isNew: true,
  },
  {
    id: "digest",
    label: "Weekly digest",
    description: "A summary of activity from the past week.",
    defaultChecked: false,
  },
];

export const Notifications: Story = {
  name: "Notification preferences",
  render: () => (
    <Card style={{ width: "100%", maxWidth: 480 }}>
      <CardHeader>
        <Heading as="h2" size="h5">
          Notifications
        </Heading>
        <CardDescription>Choose which emails you want to receive.</CardDescription>
      </CardHeader>
      <CardContent>
        <Stack gap={0}>
          {notificationSettings.map((setting, i) => (
            <div key={setting.id}>
              <Stack direction="row" align="center" justify="between" style={{ padding: "1rem 0" }}>
                <Stack gap={0} style={{ gap: "0.125rem" }}>
                  <Stack direction="row" align="center" gap={2}>
                    <Text size="body-sm" weight="medium">
                      {setting.label}
                    </Text>
                    {setting.isNew && (
                      <Badge size="xs" variant="info">
                        New
                      </Badge>
                    )}
                  </Stack>
                  <Text size="caption" color="muted">
                    {setting.description}
                  </Text>
                </Stack>
                <Switch defaultChecked={setting.defaultChecked} aria-label={setting.label} />
              </Stack>
              {i < notificationSettings.length - 1 && <Separator />}
            </div>
          ))}
        </Stack>
      </CardContent>
      <CardFooter justify="end">
        <Stack direction="row" gap={2}>
          <Button variant="outline">Reset to defaults</Button>
          <Button>Save changes</Button>
        </Stack>
      </CardFooter>
    </Card>
  ),
};

const privacySettings = [
  {
    id: "public-profile",
    label: "Public profile",
    description: "Allow anyone to view your profile page.",
    defaultChecked: true,
  },
  {
    id: "search-index",
    label: "Search engine indexing",
    description: "Let search engines index your profile.",
    defaultChecked: false,
  },
  {
    id: "show-activity",
    label: "Activity status",
    description: "Show when you were last active.",
    defaultChecked: true,
  },
];

export const Privacy: Story = {
  name: "Privacy settings",
  render: () => (
    <Card style={{ width: "100%", maxWidth: 480 }}>
      <CardHeader>
        <Heading as="h2" size="h5">
          Privacy
        </Heading>
        <CardDescription>Control who can see your information.</CardDescription>
      </CardHeader>
      <CardContent>
        <Stack gap={0}>
          {privacySettings.map((setting, i) => (
            <div key={setting.id}>
              <Stack direction="row" align="center" justify="between" style={{ padding: "1rem 0" }}>
                <Stack gap={0} style={{ gap: "0.125rem" }}>
                  <Text size="body-sm" weight="medium">
                    {setting.label}
                  </Text>
                  <Text size="caption" color="muted">
                    {setting.description}
                  </Text>
                </Stack>
                <Switch defaultChecked={setting.defaultChecked} aria-label={setting.label} />
              </Stack>
              {i < privacySettings.length - 1 && <Separator />}
            </div>
          ))}
        </Stack>
      </CardContent>
      <CardFooter justify="end">
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  ),
};

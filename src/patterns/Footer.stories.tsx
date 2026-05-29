import type { Meta, StoryObj } from "@storybook/react-vite";
import { Globe, MessageCircle, Rss, Mail } from "lucide-react";

import { Anchor } from "../components/anchor/Anchor";
import { Box } from "../components/box/Box";
import { Button } from "../components/button/Button";
import { Grid } from "../components/grid/Grid";
import { Separator } from "../components/separator/Separator";
import { Stack } from "../components/stack/Stack";
import { Text } from "../components/text/Text";

const meta = {
  title: "Patterns/Navigation/Footer",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const socialLinks = [
  { label: "Website", icon: <Globe size={16} /> },
  { label: "Community", icon: <MessageCircle size={16} /> },
  { label: "Updates", icon: <Rss size={16} /> },
  { label: "Email", icon: <Mail size={16} /> },
];

export const Simple: Story = {
  render: () => (
    <Box
      py="xl"
      px="lg"
      style={{ borderTop: "1px solid hsl(var(--border))", background: "hsl(var(--background))" }}
    >
      <Stack direction="row" align="center" justify="between" wrap="wrap" gap={4}>
        <Text as="p" size="body-sm" color="muted">
          © 2025 Yetric. All rights reserved.
        </Text>
        <Stack direction="row" align="center" gap={4} wrap="wrap">
          <Anchor href="#" variant="muted">
            Privacy
          </Anchor>
          <Anchor href="#" variant="muted">
            Terms
          </Anchor>
          <Anchor href="#" variant="muted">
            Contact
          </Anchor>
        </Stack>
        <Stack direction="row" align="center" gap={2}>
          {socialLinks.map((item) => (
            <Button key={item.label} variant="ghost" size="icon" aria-label={item.label}>
              {item.icon}
            </Button>
          ))}
        </Stack>
      </Stack>
    </Box>
  ),
};

export const Marketing: Story = {
  render: () => {
    const columns = [
      {
        title: "Product",
        links: ["Platform", "Analytics", "Security", "Integrations"],
      },
      {
        title: "Company",
        links: ["About", "Customers", "Careers", "Blog"],
      },
      {
        title: "Legal",
        links: ["Privacy", "Terms", "Cookies", "Licenses"],
      },
    ];

    return (
      <Box
        py="xl"
        px="lg"
        style={{ borderTop: "1px solid hsl(var(--border))", background: "hsl(var(--background))" }}
      >
        <Stack gap={8}>
          <Grid cols={{ base: 1, md: 2, lg: 4 }} gap={8}>
            <Stack gap={3}>
              <Text as="p" weight="bold" style={{ fontSize: 18, letterSpacing: "-0.02em" }}>
                Yetric
              </Text>
              <Text as="p" size="body-sm" color="muted">
                Modern workflows for product, support, and revenue teams that need one shared
                operating system.
              </Text>
            </Stack>
            {columns.map((column) => (
              <Stack key={column.title} gap={3}>
                <Text
                  as="p"
                  size="caption"
                  weight="semibold"
                  color="muted"
                  style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}
                >
                  {column.title}
                </Text>
                <Stack gap={2}>
                  {column.links.map((link) => (
                    <Anchor key={link} href="#" variant="muted">
                      {link}
                    </Anchor>
                  ))}
                </Stack>
              </Stack>
            ))}
          </Grid>
          <Separator />
          <Stack direction="row" align="center" justify="between" wrap="wrap" gap={4}>
            <Text as="p" size="body-sm" color="muted">
              © 2025 Yetric. Built for teams that ship every week.
            </Text>
            <Stack direction="row" align="center" gap={2}>
              {socialLinks.map((item) => (
                <Button key={item.label} variant="ghost" size="icon" aria-label={item.label}>
                  {item.icon}
                </Button>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    );
  },
};

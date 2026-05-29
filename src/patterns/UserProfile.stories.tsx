import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calendar, Grid as GridIcon, Heart, Link as LinkIcon, MapPin, MessageSquare, Settings } from "lucide-react";

import { Avatar } from "../components/avatar/Avatar";
import { Badge } from "../components/badge/Badge";
import { Box } from "../components/box/Box";
import { Button } from "../components/button/Button";
import { Card, CardContent } from "../components/card/Card";
import { Separator } from "../components/separator/Separator";
import { Stack } from "../components/stack/Stack";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs/Tabs";
import { Heading, Text } from "../components/text/Text";

const meta = {
  title: "Patterns/User Profile",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const posts = [
  { id: 1, title: "Building accessible design systems", likes: 142, comments: 28, time: "2 days ago" },
  { id: 2, title: "Why component-driven design matters", likes: 89, comments: 14, time: "5 days ago" },
  { id: 3, title: "Tailwind CSS tips for design engineers", likes: 201, comments: 43, time: "1 week ago" },
];

const metaIconStyle = { width: 14, height: 14, color: "hsl(var(--muted-foreground))" };

export const Default: Story = {
  render: () => (
    <Box style={{ width: 640 }}>
      <Stack gap={6}>
        <Box style={{ position: "relative" }}>
          <Box
            radius="xl"
            style={{ height: 128, background: "linear-gradient(90deg, rgb(139 92 246), rgb(99 102 241))" }}
          />
          <Box style={{ position: "absolute", bottom: -40, left: 24 }}>
            <Box radius="full" style={{ boxShadow: "0 0 0 4px hsl(var(--background))" }}>
              <Avatar
                src="https://i.pravatar.cc/150?img=9"
                alt="Sofia Hernandez"
                size="xl"
                status="online"
                fallback="SH"
              />
            </Box>
          </Box>
        </Box>

        <Stack direction="row" align="end" justify="end" gap={2} style={{ paddingTop: "0.5rem" }}>
          <Button variant="ghost" size="icon" aria-label="Settings"><Settings style={{ width: 16, height: 16 }} /></Button>
          <Button variant="outline" size="sm">Message</Button>
          <Button size="sm">Follow</Button>
        </Stack>

        <Box px="xs">
          <Stack gap={2}>
            <Stack direction="row" align="center" gap={2}>
              <Heading as="h2" size="h5">Sofia Hernandez</Heading>
              <Badge variant="info" size="sm">Pro</Badge>
            </Stack>
            <Text size="body-sm" color="muted">
              Product designer and design engineer. Building tools that help teams ship better software faster.
            </Text>
            <Stack direction="row" wrap="wrap" gap={4} style={{ marginTop: "0.25rem" }}>
              <Stack direction="row" align="center" gap={1}><MapPin style={metaIconStyle} /><Text as="span" size="body-sm" color="muted">Berlin, Germany</Text></Stack>
              <Stack direction="row" align="center" gap={1}><LinkIcon style={metaIconStyle} /><Text as="span" size="body-sm" color="muted">sofia.design</Text></Stack>
              <Stack direction="row" align="center" gap={1}><Calendar style={metaIconStyle} /><Text as="span" size="body-sm" color="muted">Joined Jan 2022</Text></Stack>
            </Stack>
            <Stack direction="row" gap={4} style={{ marginTop: "0.25rem" }}>
              <Text as="span" size="body-sm"><Text as="strong" size="body-sm" weight="bold">248</Text> <Text as="span" size="body-sm" color="muted">following</Text></Text>
              <Text as="span" size="body-sm"><Text as="strong" size="body-sm" weight="bold">1.4k</Text> <Text as="span" size="body-sm" color="muted">followers</Text></Text>
            </Stack>
          </Stack>
        </Box>

        <Separator />

        <Tabs defaultValue="posts">
          <TabsList variant="underline">
            <TabsTrigger value="posts" variant="underline">
              <Box as="span" style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem" }}>
                <GridIcon style={{ width: 16, height: 16 }} />Posts
              </Box>
            </TabsTrigger>
            <TabsTrigger value="about" variant="underline">About</TabsTrigger>
            <TabsTrigger value="repos" variant="underline">Repositories</TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <Stack gap={3} style={{ paddingTop: "1rem" }}>
              {posts.map((post) => (
                <Card key={post.id} interactive variant="outlined" tabIndex={0}>
                  <CardContent style={{ paddingTop: 16 }}>
                    <Stack gap={2}>
                      <Text size="body-sm" weight="medium">{post.title}</Text>
                      <Stack direction="row" align="center" gap={4}>
                        <Stack direction="row" align="center" gap={1}>
                          <Heart style={metaIconStyle} />
                          <Text as="span" size="caption" color="muted">{post.likes}</Text>
                        </Stack>
                        <Stack direction="row" align="center" gap={1}>
                          <MessageSquare style={metaIconStyle} />
                          <Text as="span" size="caption" color="muted">{post.comments}</Text>
                        </Stack>
                        <Text as="span" size="caption" color="muted" style={{ marginLeft: "auto" }}>{post.time}</Text>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </TabsContent>

          <TabsContent value="about">
            <Stack gap={2} style={{ paddingTop: "1rem" }}>
              <Text size="body-sm" color="muted">Sofia is a product designer focused on design systems and component libraries.</Text>
              <Text size="body-sm" color="muted">She regularly speaks at conferences about accessible UI and open-source collaboration.</Text>
            </Stack>
          </TabsContent>

          <TabsContent value="repos">
            <Text size="body-sm" color="muted" style={{ paddingTop: "1rem" }}>No public repositories to show.</Text>
          </TabsContent>
        </Tabs>
      </Stack>
    </Box>
  ),
};

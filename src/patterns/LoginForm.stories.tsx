import type { Meta, StoryObj } from "@storybook/react-vite";
import { Lock, Mail } from "lucide-react";

import { Box } from "../components/box/Box";
import { Anchor } from "../components/anchor/Anchor";
import { Button } from "../components/button/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../components/card/Card";
import { Checkbox } from "../components/checkbox/Checkbox";
import { Input } from "../components/input/Input";
import { Label } from "../components/label/Label";
import { Separator } from "../components/separator/Separator";
import { Stack } from "../components/stack/Stack";
import { Heading, Text } from "../components/text/Text";

const meta = {
  title: "Patterns/Login Form",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const fieldGapStyle = { gap: "0.375rem" };
const iconStyle = { width: 16, height: 16 };

export const Default: Story = {
  render: () => (
    <Card style={{ width: "100%", maxWidth: 380 }}>
      <CardHeader>
        <Heading as="h2" size="h5">
          Sign in
        </Heading>
        <CardDescription>Enter your credentials to access your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <Stack gap={4}>
          <Stack gap={2} style={fieldGapStyle}>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              leftIcon={<Mail style={iconStyle} />}
            />
          </Stack>
          <Stack gap={2} style={fieldGapStyle}>
            <Stack direction="row" align="center" justify="between">
              <Label htmlFor="password">Password</Label>
              <Anchor href="#" underline="hover">
                <Text as="span" size="caption">
                  Forgot password?
                </Text>
              </Anchor>
            </Stack>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock style={iconStyle} />}
            />
          </Stack>
          <Stack direction="row" align="center" gap={2}>
            <Checkbox id="remember" />
            <Label htmlFor="remember" style={{ fontWeight: 400 }}>
              Remember me
            </Label>
          </Stack>
        </Stack>
      </CardContent>
      <CardFooter>
        <Stack gap={3} width="full">
          <Button fullWidth>Sign in</Button>
          <Separator />
          <Box style={{ textAlign: "center" }}>
            <Text as="p" size="body-sm" color="muted">
              Don&apos;t have an account?{" "}
              <Anchor href="#" underline="hover">
                Create one
              </Anchor>
            </Text>
          </Box>
        </Stack>
      </CardFooter>
    </Card>
  ),
};

export const WithError: Story = {
  name: "With validation errors",
  render: () => (
    <Card style={{ width: "100%", maxWidth: 380 }}>
      <CardHeader>
        <Heading as="h2" size="h5">
          Sign in
        </Heading>
        <CardDescription>Enter your credentials to access your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <Stack gap={4}>
          <Stack gap={2} style={fieldGapStyle}>
            <Label htmlFor="email-err">Email</Label>
            <Input
              id="email-err"
              type="email"
              defaultValue="not-an-email"
              error
              leftIcon={<Mail style={iconStyle} />}
            />
            <Text as="p" size="caption" color="destructive">
              Enter a valid email address.
            </Text>
          </Stack>
          <Stack gap={2} style={fieldGapStyle}>
            <Label htmlFor="password-err">Password</Label>
            <Input
              id="password-err"
              type="password"
              defaultValue="short"
              error
              leftIcon={<Lock style={iconStyle} />}
            />
            <Text as="p" size="caption" color="destructive">
              Password must be at least 8 characters.
            </Text>
          </Stack>
        </Stack>
      </CardContent>
      <CardFooter>
        <Button fullWidth>Sign in</Button>
      </CardFooter>
    </Card>
  ),
};

export const Loading: Story = {
  name: "Submitting",
  render: () => (
    <Card style={{ width: "100%", maxWidth: 380 }}>
      <CardHeader>
        <Heading as="h2" size="h5">
          Sign in
        </Heading>
      </CardHeader>
      <CardContent>
        <Stack gap={4}>
          <Stack gap={2} style={fieldGapStyle}>
            <Label htmlFor="email-load">Email</Label>
            <Input
              id="email-load"
              type="email"
              defaultValue="user@example.com"
              leftIcon={<Mail style={iconStyle} />}
              disabled
            />
          </Stack>
          <Stack gap={2} style={fieldGapStyle}>
            <Label htmlFor="password-load">Password</Label>
            <Input
              id="password-load"
              type="password"
              defaultValue="••••••••"
              leftIcon={<Lock style={iconStyle} />}
              disabled
            />
          </Stack>
        </Stack>
      </CardContent>
      <CardFooter>
        <Button fullWidth isLoading disabled>
          Signing in…
        </Button>
      </CardFooter>
    </Card>
  ),
};

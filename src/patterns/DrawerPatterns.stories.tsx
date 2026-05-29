import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bell, CreditCard, Info, ShoppingCart, User } from "lucide-react";

import { Box } from "../components/box/Box";
import { Button } from "../components/button/Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/drawer/Drawer";
import { NavGroup, NavItem } from "../components/nav-item/NavItem";
import { Separator } from "../components/separator/Separator";
import { Stack } from "../components/stack/Stack";
import { Heading, Text } from "../components/text/Text";

const meta = {
  title: "Patterns/Navigation/Drawer",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const LeftDrawer: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open navigation drawer</Button>
      </DrawerTrigger>
      <DrawerContent side="left" size="md" showClose>
        <DrawerHeader>
          <DrawerTitle>Workspace navigation</DrawerTitle>
          <DrawerDescription>Jump between your main destinations.</DrawerDescription>
        </DrawerHeader>
        <Box p="md" style={{ overflowY: "auto" }}>
          <Stack gap={6}>
            <NavGroup label="Main">
              <NavItem icon={<User size={16} />} label="Profile" href="#" />
              <NavItem icon={<Bell size={16} />} label="Notifications" href="#" active />
              <NavItem icon={<CreditCard size={16} />} label="Billing" href="#" />
            </NavGroup>
            <NavGroup label="Resources">
              <NavItem label="Changelog" href="#" />
              <NavItem label="Support" href="#" />
              <NavItem label="Status" href="#" />
            </NavGroup>
          </Stack>
        </Box>
      </DrawerContent>
    </Drawer>
  ),
};

export const RightDrawer: Story = {
  render: () => {
    const items = [
      { name: "Starter plan", detail: "1 seat · Monthly", price: "$29" },
      { name: "Analytics add-on", detail: "Event summaries", price: "$12" },
      { name: "Priority support", detail: "Business hours", price: "$19" },
    ];

    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button leftIcon={<ShoppingCart size={16} />}>Open cart</Button>
        </DrawerTrigger>
        <DrawerContent side="right" size="lg" showClose>
          <DrawerHeader>
            <DrawerTitle>Cart</DrawerTitle>
            <DrawerDescription>Review the items ready for checkout.</DrawerDescription>
          </DrawerHeader>
          <Box p="md" grow style={{ overflowY: "auto" }}>
            <Stack gap={4}>
              {items.map((item) => (
                <Box
                  key={item.name}
                  p="md"
                  radius="lg"
                  style={{
                    border: "1px solid hsl(var(--border))",
                    background: "hsl(var(--card))",
                  }}
                >
                  <Stack direction="row" align="center" gap={4}>
                    <Box
                      radius="md"
                      style={{
                        width: 56,
                        height: 56,
                        background: "hsl(var(--muted))",
                        border: "1px solid hsl(var(--border))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ShoppingCart size={18} />
                    </Box>
                    <Box grow>
                      <Text as="p" weight="medium">
                        {item.name}
                      </Text>
                      <Text as="p" size="body-sm" color="muted">
                        {item.detail}
                      </Text>
                    </Box>
                    <Text as="p" weight="semibold">
                      {item.price}
                    </Text>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Box>
          <DrawerFooter>
            <Separator />
            <Stack
              direction="row"
              align="center"
              justify="between"
              style={{ paddingTop: "0.75rem" }}
            >
              <Heading as="p" size="h6">
                Total
              </Heading>
              <Heading as="p" size="h5">
                $60
              </Heading>
            </Stack>
            <Button fullWidth>Proceed to checkout</Button>
            <DrawerClose asChild>
              <Button variant="outline" fullWidth>
                Continue shopping
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
};

export const BottomSheet: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open action sheet</Button>
      </DrawerTrigger>
      <DrawerContent side="bottom" size="md" showClose>
        <DrawerHeader>
          <DrawerTitle>Quick actions</DrawerTitle>
          <DrawerDescription>Choose what you want to do next.</DrawerDescription>
        </DrawerHeader>
        <Box p="md">
          <Stack gap={3}>
            <Button variant="outline" fullWidth>
              Share report
            </Button>
            <Button variant="outline" fullWidth>
              Duplicate project
            </Button>
            <Button variant="outline" fullWidth>
              Export CSV
            </Button>
            <DrawerClose asChild>
              <Button variant="ghost" fullWidth>
                Cancel
              </Button>
            </DrawerClose>
          </Stack>
        </Box>
      </DrawerContent>
    </Drawer>
  ),
};

export const AlertDrawer: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Show system alert</Button>
      </DrawerTrigger>
      <DrawerContent side="top" size="sm" showClose>
        <Box p="md" style={{ background: "hsl(var(--accent))" }}>
          <Stack direction="row" align="center" gap={3}>
            <Info size={18} />
            <Box grow>
              <Text as="p" size="body-sm" weight="medium">
                Scheduled maintenance starts tonight at 11:00 PM UTC.
              </Text>
              <Text as="p" size="caption" color="muted">
                Save any in-progress work before the window begins.
              </Text>
            </Box>
          </Stack>
        </Box>
      </DrawerContent>
    </Drawer>
  ),
};

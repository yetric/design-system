import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check } from "lucide-react";

import { Badge } from "../components/badge/Badge";
import { Box } from "../components/box/Box";
import { Button } from "../components/button/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "../components/card/Card";
import { Grid } from "../components/grid/Grid";
import { Separator } from "../components/separator/Separator";
import { Stack } from "../components/stack/Stack";
import { Heading, Text } from "../components/text/Text";

const meta = {
  title: "Patterns/Pricing Cards",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "/ month",
    description: "Perfect for side projects and personal use.",
    badge: null,
    features: [
      "Up to 3 projects",
      "5 GB storage",
      "Basic analytics",
      "Email support",
    ],
    cta: "Get started",
    ctaVariant: "outline" as const,
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/ month",
    description: "Everything you need to grow your product.",
    badge: "Most popular",
    features: [
      "Unlimited projects",
      "50 GB storage",
      "Advanced analytics",
      "Priority support",
      "Custom domain",
      "Team collaboration",
    ],
    cta: "Start free trial",
    ctaVariant: "primary" as const,
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/ month",
    description: "For large teams with advanced needs.",
    badge: null,
    features: [
      "Everything in Pro",
      "500 GB storage",
      "SLA guarantee",
      "Dedicated account manager",
      "SSO / SAML",
      "Audit logs",
    ],
    cta: "Contact sales",
    ctaVariant: "outline" as const,
    highlighted: false,
  },
];

const checkStyle = { width: 16, height: 16, color: "hsl(var(--success))", flexShrink: 0 };

function PricingGrid({ annual = false }: { annual?: boolean }) {
  return (
    <Box maxWidth="4xl" width="full">
      <Grid cols={{ base: 1, md: 3 }} gap={6} align="start">
        {plans.map((plan) => {
          const price = annual && plan.price !== "$0"
            ? `$${Math.round(parseInt(plan.price.slice(1), 10) * 12 * 0.8)}`
            : plan.price;
          const period = annual ? "/ year" : plan.period;

          return (
            <Card
              key={plan.name}
              variant={plan.highlighted ? "default" : "outlined"}
              shadow={plan.highlighted ? "lg" : "none"}
              style={plan.highlighted ? { boxShadow: "0 0 0 2px hsl(var(--primary))" } : undefined}
            >
              {plan.badge && (
                <Box style={{ position: "absolute", top: "-0.75rem", left: "50%", transform: "translateX(-50%)" }}>
                  <Badge variant="info" size="sm">{plan.badge}</Badge>
                </Box>
              )}
              <CardHeader>
                <Heading as="h3" size="h6">{plan.name}</Heading>
                <Stack direction="row" align="end" gap={1} style={{ marginTop: "0.25rem" }}>
                  <Heading as="p" size="h2">{price}</Heading>
                  <Text as="span" size="body-sm" color="muted" style={{ marginBottom: "0.25rem" }}>{period}</Text>
                </Stack>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Stack gap={3}>
                  <Separator />
                  <Stack as="ul" gap={2} style={{ listStyle: "none", margin: 0, padding: 0 }}>
                    {plan.features.map((feat) => (
                      <Stack key={feat} as="li" direction="row" align="center" gap={2}>
                        <Check style={checkStyle} />
                        <Text as="span" size="body-sm">{feat}</Text>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </CardContent>
              <CardFooter>
                <Button variant={plan.ctaVariant} fullWidth>{plan.cta}</Button>
              </CardFooter>
            </Card>
          );
        })}
      </Grid>
    </Box>
  );
}

export const Default: Story = {
  render: () => <PricingGrid />,
};

export const Annual: Story = {
  name: "Annual billing (with savings)",
  render: () => (
    <Stack align="center" gap={6}>
      <Stack direction="row" align="center" gap={2}>
        <Text as="span" size="body-sm" color="muted">Monthly</Text>
        <Text as="span" size="body-sm" weight="medium">Annual</Text>
        <Badge variant="success" size="xs">Save 20%</Badge>
      </Stack>
      <PricingGrid annual />
    </Stack>
  ),
};

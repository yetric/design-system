import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Building2, CheckCircle2, CreditCard, User } from "lucide-react";

import { Box } from "../components/box/Box";
import { Button } from "../components/button/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../components/card/Card";
import { Checkbox } from "../components/checkbox/Checkbox";
import { Grid } from "../components/grid/Grid";
import { Input } from "../components/input/Input";
import { Label } from "../components/label/Label";
import { RadioGroup, RadioGroupItem } from "../components/radio-group/RadioGroup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/select/Select";
import { Separator } from "../components/separator/Separator";
import { Stack } from "../components/stack/Stack";
import { Stepper } from "../components/stepper/Stepper";
import { Heading, Text } from "../components/text/Text";

const meta = {
  title: "Patterns/Onboarding Wizard",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const steps = [
  { title: "Account", description: "Your login details" },
  { title: "Profile", description: "Tell us about you" },
  { title: "Plan", description: "Choose a subscription" },
  { title: "Done", description: "All set!" },
];

const fieldGapStyle = { gap: "0.375rem" };
const smallIconStyle = { width: 16, height: 16 };

function WizardTitle({ icon: Icon, children }: { icon: typeof User; children: string }) {
  return (
    <Stack direction="row" align="center" gap={2}>
      <Icon style={smallIconStyle} />
      <Heading as="h3" size="h5">
        {children}
      </Heading>
    </Stack>
  );
}

function OnboardingWizard() {
  const [active, setActive] = useState(0);
  const [plan, setPlan] = useState("pro");

  const prev = () => setActive((s) => Math.max(0, s - 1));
  const next = () => setActive((s) => Math.min(steps.length - 1, s + 1));

  return (
    <Box style={{ width: "100%", maxWidth: 480 }}>
      <Stack gap={6}>
        <Stepper steps={steps} activeStep={active} />

        {active === 0 && (
          <Card>
            <CardHeader>
              <WizardTitle icon={User}>Account details</WizardTitle>
              <CardDescription>Create your login credentials.</CardDescription>
            </CardHeader>
            <CardContent>
              <Stack gap={4}>
                <Stack gap={2} style={fieldGapStyle}>
                  <Label htmlFor="ob-email">Email address</Label>
                  <Input id="ob-email" type="email" placeholder="you@example.com" />
                </Stack>
                <Grid cols={{ base: 1, sm: 2 }} gap={3}>
                  <Stack gap={2} style={fieldGapStyle}>
                    <Label htmlFor="ob-pw">Password</Label>
                    <Input id="ob-pw" type="password" placeholder="Min 8 characters" />
                  </Stack>
                  <Stack gap={2} style={fieldGapStyle}>
                    <Label htmlFor="ob-pw2">Confirm</Label>
                    <Input id="ob-pw2" type="password" placeholder="Repeat password" />
                  </Stack>
                </Grid>
                <Stack direction="row" align="center" gap={2}>
                  <Checkbox id="ob-terms" />
                  <Label htmlFor="ob-terms" style={{ fontWeight: 400 }}>
                    I agree to the terms of service
                  </Label>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        )}

        {active === 1 && (
          <Card>
            <CardHeader>
              <WizardTitle icon={Building2}>Your profile</WizardTitle>
              <CardDescription>Help us personalise your experience.</CardDescription>
            </CardHeader>
            <CardContent>
              <Stack gap={4}>
                <Grid cols={{ base: 1, sm: 2 }} gap={3}>
                  <Stack gap={2} style={fieldGapStyle}>
                    <Label htmlFor="ob-fname">First name</Label>
                    <Input id="ob-fname" placeholder="Alice" />
                  </Stack>
                  <Stack gap={2} style={fieldGapStyle}>
                    <Label htmlFor="ob-lname">Last name</Label>
                    <Input id="ob-lname" placeholder="Smith" />
                  </Stack>
                </Grid>
                <Stack gap={2} style={fieldGapStyle}>
                  <Label htmlFor="ob-role">Role</Label>
                  <Select>
                    <SelectTrigger id="ob-role">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="designer">Designer</SelectItem>
                      <SelectItem value="engineer">Engineer</SelectItem>
                      <SelectItem value="manager">Product manager</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </Stack>
                <Stack gap={2} style={fieldGapStyle}>
                  <Label htmlFor="ob-company">Company (optional)</Label>
                  <Input id="ob-company" placeholder="Acme Inc." />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        )}

        {active === 2 && (
          <Card>
            <CardHeader>
              <WizardTitle icon={CreditCard}>Choose a plan</WizardTitle>
              <CardDescription>You can change this anytime.</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={plan} onValueChange={setPlan}>
                <Stack gap={3}>
                  {[
                    {
                      value: "free",
                      label: "Free",
                      price: "$0/mo",
                      desc: "Up to 3 projects, basic features.",
                    },
                    {
                      value: "pro",
                      label: "Pro",
                      price: "$29/mo",
                      desc: "Unlimited projects, priority support.",
                    },
                    {
                      value: "team",
                      label: "Team",
                      price: "$79/mo",
                      desc: "Everything in Pro, plus team seats.",
                    },
                  ].map((option) => (
                    <label
                      key={option.value}
                      htmlFor={`plan-${option.value}`}
                      style={{
                        display: "flex",
                        gap: "0.75rem",
                        borderRadius: "0.75rem",
                        padding: "0.75rem",
                        border: `1px solid ${plan === option.value ? "hsl(var(--primary))" : "hsl(var(--border))"}`,
                        backgroundColor:
                          plan === option.value ? "hsl(var(--primary) / 0.05)" : undefined,
                        cursor: "pointer",
                      }}
                    >
                      <Box shrink={false} style={{ marginTop: "0.125rem" }}>
                        <RadioGroupItem value={option.value} id={`plan-${option.value}`} />
                      </Box>
                      <Box grow>
                        <Stack direction="row" align="center" justify="between">
                          <Text as="span" size="body-sm" weight="medium">
                            {option.label}
                          </Text>
                          <Text as="span" size="body-sm" weight="semibold">
                            {option.price}
                          </Text>
                        </Stack>
                        <Text as="p" size="caption" color="muted" style={{ marginTop: "0.125rem" }}>
                          {option.desc}
                        </Text>
                      </Box>
                    </label>
                  ))}
                </Stack>
              </RadioGroup>
            </CardContent>
          </Card>
        )}

        {active === 3 && (
          <Card>
            <CardHeader>
              <Stack direction="row" align="center" gap={2}>
                <CheckCircle2 style={{ width: 20, height: 20, color: "hsl(var(--success))" }} />
                <Heading as="h3" size="h5">
                  You&apos;re all set!
                </Heading>
              </Stack>
              <CardDescription>Your account is ready. Welcome aboard 🎉</CardDescription>
            </CardHeader>
            <CardContent>
              <Text size="body-sm" color="muted">
                We&apos;ve sent a confirmation email. Check your inbox to verify your address before
                signing in.
              </Text>
            </CardContent>
          </Card>
        )}

        <Separator />

        <CardFooter justify="between" style={{ padding: 0 }}>
          <Button variant="outline" disabled={active === 0} onClick={prev}>
            Back
          </Button>
          {active < steps.length - 1 ? (
            <Button onClick={next}>Continue</Button>
          ) : (
            <Button variant="success">Go to dashboard</Button>
          )}
        </CardFooter>
      </Stack>
    </Box>
  );
}

export const Default: Story = {
  render: () => <OnboardingWizard />,
};

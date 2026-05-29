import { useMemo } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../button/Button";
import { Stack } from "../stack/Stack";
import { Text } from "../text/Text";
import { Tour, useTour, type TourStep } from "./Tour";

const demoSteps: TourStep[] = [
  {
    element: ".tour-step-one",
    title: "Navigation",
    description: "Use the navigation to jump between key views.",
    side: "bottom",
  },
  {
    element: ".tour-step-two",
    title: "Filters",
    description: "Narrow down the content with contextual filters.",
    side: "bottom",
  },
  {
    element: ".tour-step-three",
    title: "Actions",
    description: "Quickly trigger the most common actions from here.",
    side: "left",
  },
];

const meta = {
  title: "Components/Tour",
  component: Tour,
  tags: ["autodocs"],
  args: {
    steps: demoSteps,
  },
} satisfies Meta<typeof Tour>;

export default meta;
type Story = StoryObj<typeof meta>;

function TourDemo({ autoStart = false }: { autoStart?: boolean }) {
  const steps = useMemo(() => demoSteps, []);
  const { isActive, start, stop } = useTour(steps);

  return (
    <Stack gap={4} style={{ width: "100%", maxWidth: 560 }}>
      {autoStart ? <Tour autoStart steps={steps} /> : null}
      <div className="tour-step-one rounded-md border border-border bg-card px-4 py-3">
        <Text>Primary navigation area</Text>
      </div>
      <div className="tour-step-two rounded-md border border-border bg-card px-4 py-3">
        <Text>Filter controls</Text>
      </div>
      <div className="tour-step-three rounded-md border border-border bg-card px-4 py-3">
        <Text>Action shortcuts</Text>
      </div>
      <Stack direction="row" gap={3}>
        <Button onClick={start}>Start tour</Button>
        <Button variant="outline" onClick={stop} disabled={!isActive}>
          Stop tour
        </Button>
      </Stack>
    </Stack>
  );
}

export const Default: Story = {
  render: () => <TourDemo />,
};

export const AutoStart: Story = {
  render: () => <TourDemo autoStart />,
};

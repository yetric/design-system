import type { Meta, StoryObj } from "@storybook/react-vite";
import { CheckCircle, Clock, GitCommit, Rocket } from "lucide-react";
import { Timeline, TimelineItem } from "./Timeline";

const meta: Meta<typeof Timeline> = {
  title: "Components/Timeline",
  component: Timeline,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;
type Story = StoryObj<typeof Timeline>;

export const Default: Story = {
  render: () => (
    <Timeline className="max-w-sm">
      <TimelineItem
        title="Project created"
        time="3 days ago"
        description="Initial repo setup and CI pipeline."
        bullet={<GitCommit className="h-3.5 w-3.5" />}
      />
      <TimelineItem
        title="First PR merged"
        time="2 days ago"
        description="Added authentication module."
        bullet={<CheckCircle className="h-3.5 w-3.5 text-green-500" />}
      />
      <TimelineItem
        title="In review"
        time="1 day ago"
        description="Feature branch under review."
        bullet={<Clock className="h-3.5 w-3.5 text-yellow-500" />}
      />
      <TimelineItem
        title="Deployed to production"
        time="Just now"
        description="v1.0.0 is live."
        bullet={<Rocket className="text-primary h-3.5 w-3.5" />}
        last
      />
    </Timeline>
  ),
};

export const Simple: Story = {
  render: () => (
    <Timeline className="max-w-sm">
      <TimelineItem title="Step 1" description="Start here." />
      <TimelineItem title="Step 2" description="Do the thing." />
      <TimelineItem title="Step 3" description="Done!" last />
    </Timeline>
  ),
};
